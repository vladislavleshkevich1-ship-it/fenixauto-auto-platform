from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl

router = APIRouter(prefix="/api/v1/vehicles", tags=["vehicle-media"])


class MediaCreate(BaseModel):
    url: HttpUrl
    media_type: str = "IMAGE"
    sort_order: int = 0
    is_primary: bool = False


_media: dict[int, list[dict]] = {}


@router.get("/{vehicle_id}/media")
def list_media(vehicle_id: int):
    return _media.get(vehicle_id, [])


@router.post("/{vehicle_id}/media", status_code=201)
def add_media(vehicle_id: int, payload: MediaCreate):
    item = {"id": len(_media.get(vehicle_id, [])) + 1, **payload.model_dump(mode="json")}
    _media.setdefault(vehicle_id, []).append(item)
    return item
