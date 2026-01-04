from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import projects, users, orders, ai

from services import rag_service

# Create Tables
Base.metadata.create_all(bind=engine)

# Initialize Vector DB
try:
    rag_service.init_vector_db()
except Exception as e:
    print(f"Failed to initialize Vector DB: {e}")

app = FastAPI(
    title="Carbon Credit Marketplace API",
    description="API for dealing with Carbon Credits, Users, and AI-powered verifications.",
    version="1.0.0"
)

app.include_router(projects.router)
app.include_router(users.router)
app.include_router(orders.router)
app.include_router(ai.router)


# CORS Setup
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the AI-Powered Carbon Credit Marketplace API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
