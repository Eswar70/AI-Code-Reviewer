"""
Vercel Serverless Function entrypoint.

Vercel's Python runtime looks for a module-level callable named `app`.
FastAPI itself is an ASGI app, so we can export it directly.
"""

from app.main import app  # noqa: F401

