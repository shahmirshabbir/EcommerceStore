from fastapi import FastAPI
from app.routers.user import router as user_router 
from app.routers.auth import router as auth_router
from contextlib import asynccontextmanager
from app.database import Base , engine
# from app.database import Base

# server = FastAPI()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Startup code (runs once) ---
    print("Creating tables (if not exist)...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield  # App starts here

    # --- Shutdown code (runs once) ---
    await engine.dispose()
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

app.include_router(user_router)
app.include_router(auth_router)

# 