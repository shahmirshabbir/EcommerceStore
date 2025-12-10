from fastapi import APIRouter , Depends , HTTPException , status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.model.user import User
from app.schemas.user import UserCreate , UserResponse
from app.database import get_db
from core.security import hash_password
from core.deps import get_current_user

router = APIRouter(prefix= "/users" , tags=["Users"])

@router.post("/" , response_model=UserResponse , status_code=status.HTTP_201_CREATED)
async def create_user(request:UserCreate , db: AsyncSession= Depends(get_db)):
    exist = await db.execute(select(User).where(User.email == request.email))
    if exist.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = "Email already exist"
        )
    
    pwd = hash_password(request.password)

    new_user = User(
        email = request.email,
        full_name = request.full_name,
        hash_password = pwd
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user

@router.get("/me" , response_model=UserResponse)
async def get_me(current_user : User = Depends(get_current_user)):
    return current_user