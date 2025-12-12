from sqlalchemy import Column , Integer ,String ,DateTime , func
from app.database import Base
from datetime import datetime

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer , primay_key =True , index=True)
    name = Column(String , unique=True , nullable=False)
    img =  Column(String )