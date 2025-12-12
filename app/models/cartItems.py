from sqlalchemy import Column , Integer ,String ,DateTime , func
from app.database import Base
from datetime import datetime

class CartItem(Base):
    __tablename__ = 'cart_items'

    id = Column(Integer , primay_key =True , index=True)
    product_id =  Column(Integer , nullable = False)
    user_id = Column(Integer)
    quantity = Column(Integer)