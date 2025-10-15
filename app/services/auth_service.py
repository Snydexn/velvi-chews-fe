from datetime import timedelta
from fastapi import HTTPException, status,Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.utils.security import verify_password, hash_password, create_access_token, decode_access_token
from app.models.user import User  # Model SQLAlchemy kamu
from app.utils.config import settings
from app.database import get_db
from app.utils.email_verification import create_verification_token
from app.utils.mailer import send_verification_email
import asyncio
from fastapi import BackgroundTasks




oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class AuthService:
    @staticmethod
    def register_user(db: Session, email: str, password: str, name: str):
        """Register user baru"""
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email sudah terdaftar"
            )
        if len(password.encode('utf-8')) > 72:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password terlalu panjang (maks 72 karakter ASCII)."
            )

        hashed_pw = hash_password(password)
        new_user = User(email=email, password_hash=hashed_pw, name=name,total_points=0)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_verification_token(email)
        # Kirim email (async)
        send_verification_email(email, token)


        return {"message": "Registrasi berhasil. Cek email untuk verifikasi.",
                "user": new_user}

    @staticmethod
    def login_user(db: Session, email: str, password: str):
        """Autentikasi user dan buat JWT"""
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email atau password salah",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Akun belum diverifikasi. Silakan cek email kamu untuk verifikasi."
        )
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id),"name": user.name,"email": user.email,"role": user.role},  # sub = subject (user id)
            expires_delta=access_token_expires
        )

        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db)
    ):
        payload = decode_access_token(token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token tidak valid atau sudah kadaluarsa",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_id = payload.get("sub")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User tidak ditemukan",
            )

        return user
