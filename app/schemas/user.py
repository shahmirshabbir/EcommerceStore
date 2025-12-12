from pydantic import BaseModel , EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email : EmailStr
    full_name : str
    password : str

class UserResponse(BaseModel):
    id: int
    email:EmailStr
    full_name : str
    created_at: datetime
    updated_at : datetime

    class Config:
        from_attributes= True