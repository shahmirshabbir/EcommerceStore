from sqlalchemy import Column , Integer ,String ,DateTime , func , Float
from app.database import Base
from datetime import datetime

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer , primay_key =True , index=True)
    name = Column(String , index=True , nullable=False)
    description = Column(String , nullable=False)
    cat_id =  Column(Integer , nullable = False)
    img =  Column(String )
    quantity =  Column(Integer)
    price =  Column(Integer)
    discount = Column(Float)