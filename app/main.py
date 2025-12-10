from fastapi import FastAPI
from router.user import router as user_router 
from router.auth import auth_router
from contextlib import asynccontextmanager
from database import engine
from database import Base
app = FastAPI()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Startup code (runs once) ---
    print("Creating tables (if not exist)...")
    Base.metadata.create_all(bind=engine)

    yield  # App starts here

    # --- Shutdown code (runs once) ---
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

app.include_router(user_router)
app.include_router(auth_router)

# 