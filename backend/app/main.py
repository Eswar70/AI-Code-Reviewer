from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.routes import review_routes
from app.database.mongo import db
from app.config import settings
from app.limiter import limiter

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    await db.connect()
    yield
    # Shutdown: Disconnect from MongoDB
    await db.disconnect()

app = FastAPI(
    title="AI Code Reviewer API",
    description="Production-grade AI Code Reviewer Platform",
    lifespan=lifespan
)

# Add limiter to state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Middleware - Refined for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev to avoid origin mismatch
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(review_routes.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "service": "AI Code Reviewer API",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
