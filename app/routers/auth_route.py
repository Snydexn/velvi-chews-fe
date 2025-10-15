from fastapi import APIRouter, Depends,HTTPException,BackgroundTasks
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.services.auth_service import AuthService
from app.schemas.auth_schemas import UserRegister, UserLogin, Token, UserResponse,RegisterResponse
from app.database import get_db
from app.utils.email_verification import verify_verification_token
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=RegisterResponse)
def register_user(data: UserRegister,db: Session = Depends(get_db)):
    return AuthService.register_user(db, data.email, data.password, data.name)

@router.post("/login", response_model=Token)
def login_user(data: UserLogin, db: Session = Depends(get_db)):
    return AuthService.login_user(db, data.email, data.password)

@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    email = verify_verification_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Token verifikasi tidak valid atau sudah kadaluarsa")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")

    user.is_verified = True
    db.commit()

    with open("app/templates/verify_success.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content, status_code=200)