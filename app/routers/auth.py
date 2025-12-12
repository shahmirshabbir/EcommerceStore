from datetime import timedelta

from fastapi import APIRouter , Depends , HTTPException , status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio  import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User
from app.schemas.auth import Token
from app.core.security import verify_password , create_token  , EXPIRE_TIME

router = APIRouter(prefix="/auth" , tags=['auth']) 

@router.post("/login" , response_model=Token)
async def login(
    form_data : OAuth2PasswordRequestForm = Depends(),
    db : AsyncSession = Depends(get_db)
):
    email = form_data.email
    password = form_data.password

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = 'Email not found'
        )
    
    if not verify_password(password , user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = 'Wrong password'
        )
    
    access_time = timedelta(minutes=EXPIRE_TIME)

    access_token = create_token(
        data = {
            'sub' : email ,
            "user_id" : user.id
        }

        , expire_delta=access_time
    )

    return Token(access_token=access_token)

