from fastapi import APIRouter
from pydantic import BaseModel, Field

from .db import get_connection

router = APIRouter(prefix="/api/v1/leads", tags=["leads"])


class LeadCreate(BaseModel):
    vehicle_id: int | None = None
    name: str = Field(min_length=1, max_length=150)
    phone: str | None = Field(default=None, max_length=80)
    telegram: str | None = Field(default=None, max_length=150)
    message: str | None = None
    source_page: str | None = None


@router.post("", status_code=201)
def create_lead(payload: LeadCreate):
    with get_connection() as connection:
        row = connection.execute(
            """INSERT INTO leads
               (vehicle_id, name, phone, telegram, message, source_page)
               VALUES (%s,%s,%s,%s,%s,%s)
               RETURNING id, vehicle_id, name, phone, telegram, message, source_page, created_at""",
            (payload.vehicle_id, payload.name, payload.phone, payload.telegram, payload.message, payload.source_page),
        ).fetchone()
        connection.commit()
    return row


@router.get("")
def list_leads():
    with get_connection() as connection:
        return connection.execute(
            """SELECT id, vehicle_id, name, phone, telegram, message, source_page, created_at
               FROM leads ORDER BY created_at DESC"""
        ).fetchall()
