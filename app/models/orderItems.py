from sqlalchemy import Column , Integer ,String ,DateTime , func
from app.database import Base
from datetime import datetime

class CartItem(Base):
    __tablename__ = 'cart_items'

    id = Column(Integer , primay_key =True , index=True)
    order_id =  Column(Integer , nullable = False)
    product_id = Column(Integer)
    quantity = Column(Integer)
    price = Column(Integer)