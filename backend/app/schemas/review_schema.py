from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class ReviewRequest(BaseModel):
    code: str
    language: str

class ReviewResponse(BaseModel):
    bugs: List[str]
    security_issues: List[str]
    performance_issues: List[str]
    suggestions: List[str]
    refactored_code: str

class ReviewHistoryItem(ReviewResponse):
    id: str
    code: str
    language: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
