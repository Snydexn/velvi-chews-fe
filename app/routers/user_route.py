from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.schemas.user_schema import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])

# ========== GET Profile (diri sendiri) ==========
@router.get("/me", response_model=UserResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(AuthService.get_current_user)
):
    return UserService.get_my_profile(db, current_user)


# ========== UPDATE Profile (nama / foto profil) ==========
@router.put("/me", response_model=UserResponse)
def update_my_profile(
    name: str = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(AuthService.get_current_user)
):
    return UserService.update_my_profile(db, current_user, name, file)
