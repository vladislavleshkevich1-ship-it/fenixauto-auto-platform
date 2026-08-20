from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/leads", tags=["leads"])


class LeadCreate(BaseModel):
    vehicle_id: int | None = None
    name: str = Field(min_length=1, max_length=150)
    phone: str | None = Field(default=None, max_length=80)
    telegram: str | None = Field(default=None, max_length=150)
    message: str | None = None
    source_page: str | None = None


leads: list[dict] = []


@router.post("", status_code=201)
def create_lead(payload: LeadCreate):
    lead = {"id": len(leads) + 1, **payload.model_dump()}
    leads.append(lead)
    return lead


@router.get("")
def list_leads():
    return leads
