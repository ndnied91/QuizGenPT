# mongodb.py
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import Optional

# Fetch MongoDB URI from environment variable
MONGO_DETAILS = os.getenv("MONGO_URI")

# Global variable for the MongoDB client
db_client: Optional[AsyncIOMotorClient] = None

# Function to get the database client instance
async def get_db_client() -> AsyncIOMotorClient:
    """Return the database client instance."""
    if db_client is None:
        raise RuntimeError("Database client is not initialized")
    return db_client

# Function to create the database connection
async def connect_db():
    """Create the database connection."""
    global db_client
    db_client = AsyncIOMotorClient(MONGO_DETAILS, tlsAllowInvalidCertificates=True)

# Function to close the database connection
async def close_db():
    """Close the database connection."""
    if db_client is not None:
        db_client.close()