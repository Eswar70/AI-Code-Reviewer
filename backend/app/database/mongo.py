import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List, Optional
from app.models.review_model import ReviewModel

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    db = None

    @classmethod
    async def connect(cls):
        uri = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        cls.client = AsyncIOMotorClient(uri)
        cls.db = cls.client["ai_code_reviewer"]
        print(f"Connected to MongoDB at {uri}")

    @classmethod
    async def disconnect(cls):
        if cls.client:
            cls.client.close()
            print("Disconnected from MongoDB")

    @classmethod
    async def save_review(cls, review_data: dict):
        if "created_at" not in review_data:
            review_data["created_at"] = datetime.now()
        result = await cls.db.reviews.insert_one(review_data)
        return str(result.inserted_id)

    @classmethod
    async def delete_review(cls, review_id: str):
        from bson import ObjectId
        result = await cls.db.reviews.delete_one({"_id": ObjectId(review_id)})
        return result.deleted_count > 0

    @classmethod
    async def get_history(cls, limit: int = 20):
        # Filter for documents that have ALL required result fields to ensure valid schema
        required_fields = ["code", "language", "bugs", "security_issues", "performance_issues", "suggestions", "refactored_code", "created_at"]
        query = {field: {"$exists": True} for field in required_fields}
        
        cursor = cls.db.reviews.find(query).sort("created_at", -1).limit(limit)
        reviews = []
        async for document in cursor:
            document["id"] = str(document["_id"])
            reviews.append(document)
        return reviews

db = MongoDB
