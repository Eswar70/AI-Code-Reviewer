from fastapi import APIRouter, HTTPException, Body, Request
from fastapi.responses import StreamingResponse
from app.schemas.review_schema import ReviewRequest, ReviewResponse, ReviewHistoryItem
from app.services.ai_reviewer import AIReviewer
from app.database.mongo import db
from app.limiter import limiter
from typing import List
import json

router = APIRouter(tags=["Reviews"])

@router.post("/review-code", response_model=ReviewResponse)
@limiter.limit("5/minute")
async def review_code(request: Request, body: ReviewRequest = Body(...)):
    """
    Standard non-streaming code review.
    """
    try:
        result = await AIReviewer.analyze_code(body.code, body.language)
        return result
    except Exception as e:
        print(f"Error in review_code: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error during code analysis")

@router.post("/review-code-stream")
@limiter.limit("5/minute")
async def review_code_stream(request: Request, body: ReviewRequest = Body(...)):
    """
    Streaming code review for a ChatGPT-like typing effect.
    """
    try:
        return StreamingResponse(
            AIReviewer.analyze_code_stream(body.code, body.language),
            media_type="text/plain"
        )
    except Exception as e:
        print(f"Error in review_code_stream: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initialize stream")

@router.get("/history", response_model=List[ReviewHistoryItem])
async def get_history(limit: int = 20):
    """
    Retrieves previous code reviews from the database.
    """
    try:
        history = await db.get_history(limit)
        return history
    except Exception as e:
        print(f"Error in get_history: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve history")

@router.delete("/history/{review_id}")
@limiter.limit("10/minute")
async def delete_review(request: Request, review_id: str):
    """
    Deletes a specific review from the database.
    """
    try:
        success = await db.delete_review(review_id)
        if not success:
            raise HTTPException(status_code=404, detail="Review not found")
        return {"status": "success", "message": "Review deleted"}
    except Exception as e:
        print(f"Error in delete_review: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete review")
