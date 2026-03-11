from google import genai
from google.genai import types
from app.config import settings
from app.utils.prompt_engine import PromptEngine
from app.database.mongo import db
import json
import asyncio
from datetime import datetime

class AIReviewer:
    # Initialize Async Gemini Client
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    
    @classmethod
    async def analyze_code(cls, code: str, language: str):
        """
        Non-streaming analysis using the async client.
        """
        prompt = PromptEngine.get_review_prompt(code, language)
        
        try:
            # Using the async client via .aio
            response = await cls.client.aio.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=PromptEngine.get_system_instruction()
                )
            )
            
            text = response.text
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            
            result = json.loads(text)
            
            review_to_save = {
                "code": code,
                "language": language,
                "created_at": datetime.now(),
                **result,
            }
            await db.save_review(review_to_save)
            return result
        except Exception as e:
            print(f"Error parsing Gemini response: {str(e)}")
            raise e

    @classmethod
    async def analyze_code_stream(cls, code: str, language: str):
        """
        Streaming analysis using the async client.
        """
        prompt = PromptEngine.get_review_prompt(code, language)
        
        try:
            # Using the async generator
            full_text = ""
            async for chunk in await cls.client.aio.models.generate_content_stream(
                model="gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=PromptEngine.get_system_instruction()
                )
            ):
                if chunk.text:
                    full_text += chunk.text
                    yield chunk.text

            # After stream completes, we no longer save here to avoid duplication
            # with analyze_code (non-streaming) which is called sequentially by the frontend.
            pass
        except Exception as e:
            print(f"Streaming error: {str(e)}")
            yield f"Error: {str(e)}"
