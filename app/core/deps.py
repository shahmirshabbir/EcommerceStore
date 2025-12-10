from fastapi import HTTPException , Depends , status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt , JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.security import SECRET_KEY , ALGORITHM
from app.schemas.auth import TokenData
from app.database import get_db
from app.models.user import User

oauth_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

async def get_current_user(
        token:str = Depends(oauth_scheme), 
        db:AsyncSession = Depends(get_db)
)-> User:
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Login expired"
    )

    try:
        payload = jwt.decode(token , SECRET_KEY , algorithms=[ALGORITHM])

        user_id : int | None = payload.get('user_id') 
        email : str | None = payload.get('email')

        if user_id is None or email is None:
            raise credential_exception
        user_data = TokenData(user_id , email)
    except:
        raise credential_exception
    
    result = await db.execute(select(User).where(User.id == user_data.id , User.email == user_data.email))

    user = result.scalar_one_or_none()

    if user is None :
        raise credential_exception
    
    return user