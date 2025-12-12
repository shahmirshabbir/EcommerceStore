from sqlalchemy import Column , Integer ,String ,DateTime , func
from app.database import Base
from datetime import datetime

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer , primay_key =True , index=True)
    user_id =  Column(Integer , nullable = False)
    total_price = Column(Integer)
    address = Column(String)
    status = Column(String)
    placed_at = Column(
        DateTime(timezone=True) ,
        server_default=func.now()
                       )