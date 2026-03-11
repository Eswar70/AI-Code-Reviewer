from pydantic import BaseModel, Field, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime

# Represents an ObjectId field in the database.
# It will be represented as a `str` in the API so that it can be easily serialized.
PyObjectId = Annotated[str, BeforeValidator(str)]

class ReviewModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    code: str
    language: str
    bugs: List[str] = []
    security_issues: List[str] = []
    performance_issues: List[str] = []
    suggestions: List[str] = []
    refactored_code: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "code": "def hello(): print('world')",
                "language": "python",
                "bugs": ["Missing docstring"],
                "security_issues": [],
                "performance_issues": [],
                "suggestions": ["Add logging"],
                "refactored_code": "def hello():\n    \"\"\"Greets the world\"\"\"\n    print('world')"
            }
        }
