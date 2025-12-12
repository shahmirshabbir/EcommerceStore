from sqlalchemy.ext.asyncio import AsyncSession , create_async_engine 
from sqlalchemy.orm import sessionmaker , declarative_base

engine =  create_async_engine("postgresql+asyncpg://store_user:store123@localhost/Store" , echo = True)

localSession = sessionmaker(
    autoflush=False,
    autocommit = False,
    bind = engine,
    class_=AsyncSession
)

Base = declarative_base()

async def get_db():
    db = localSession()
    try:
        yield db
    finally:
        await db.close()