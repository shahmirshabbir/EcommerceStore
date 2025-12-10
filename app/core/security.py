from passlib.context import CryptContext
from datetime import datetime , timedelta , timezone
from typing import Optional
from jose import jwt

pwd = CryptContext(schemes=['bcrypt'] , deprecated = 'auto')
SECRET_KEY = "any-secretkey-it-should-be"
ALGORITHM = "HS256"
EXPIRE_TIME = 30

def hash_password(password : str):
    return pwd.hash(password)

def verify_password(plain :str , hash_pwd : str)-> bool:
    return pwd.verify(plain , hash_password)

def create_token(
        data:dict , 
        expire_delta : Optional[timedelta] = None
)->str:
    to_encode = data.copy()

    if expire_delta :
        expire = datetime.now(timezone.utc) + expire_delta
    else:
        expire = datetime.now(timezone.utc) + EXPIRE_TIME

    to_encode.update({'exp' : expire})

    encoded = jwt.encode(to_encode , SECRET_KEY , algorithm=ALGORITHM)
    return encoded
