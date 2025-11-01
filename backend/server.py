from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Auth Models
class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""
    age: int = 0
    gender: str = ""
    location: str = ""

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    age: int = 0
    location: str = ""

class AuthResponse(BaseModel):
    user: UserResponse
    token: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Auth Routes
@api_router.post("/auth/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    # Mock login - In production, verify credentials against database
    user = UserResponse(
        id=str(uuid.uuid4()),
        name="John Doe",
        email=credentials.email,
        age=28,
        location="Mumbai"
    )
    return AuthResponse(user=user, token="mock-jwt-token")

@api_router.post("/auth/signup", response_model=AuthResponse)
async def signup(user_data: SignupRequest):
    # Mock signup - In production, hash password and save to database
    user = UserResponse(
        id=str(uuid.uuid4()),
        name=user_data.name,
        email=user_data.email,
        age=user_data.age,
        location=user_data.location
    )
    return AuthResponse(user=user, token="mock-jwt-token")

@api_router.post("/auth/logout")
async def logout():
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user():
    # Mock current user - In production, verify JWT token
    return UserResponse(
        id="1",
        name="John Doe",
        email="john@example.com",
        age=28,
        location="Mumbai"
    )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()