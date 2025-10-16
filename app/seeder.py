from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.utils.security import hash_password, create_access_token
from app.utils.config import settings

# Create table jika belum ada
Base.metadata.create_all(bind=engine)

def seed_admin(db: Session):
    admin_email = settings.ADMIN_EMAIL
    existing_admin = db.query(User).filter(User.email == admin_email).first()
    if existing_admin:
        print("Admin sudah ada, skip seeding ✅")
        return

    # Buat admin baru
    admin = User(
        name="Admin",
        email=admin_email,
        password_hash=hash_password(settings.ADMIN_PASSWORD),
        role="admin",
        is_verified=True
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    # Generate JWT token dengan payload name, email, role
    token_payload = {
        "name": admin.name,
        "email": admin.email,
        "role": admin.role
    }
    token = create_access_token(token_payload)
    print(f"Admin berhasil dibuat ✅")

if __name__ == "__main__":
    db = SessionLocal()
    seed_admin(db)
    db.close()
