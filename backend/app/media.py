from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl

from .db import get_connection

router = APIRouter(prefix="/api/v1/vehicles", tags=["vehicle-media"])


class MediaCreate(BaseModel):
    url: HttpUrl
    media_type: str = "IMAGE"
    sort_order: int = 0
    is_primary: bool = False
    source: str = "FENIX_AUTO"


@router.get("/{vehicle_id}/media")
def list_media(vehicle_id: int):
    with get_connection() as connection:
        return connection.execute(
            """SELECT id, media_type, url, sort_order, is_primary, source
               FROM vehicle_media WHERE vehicle_id = %s ORDER BY sort_order, id""",
            (vehicle_id,),
        ).fetchall()


@router.post("/{vehicle_id}/media", status_code=201)
def add_media(vehicle_id: int, payload: MediaCreate):
    with get_connection() as connection:
        if payload.is_primary:
            connection.execute("UPDATE vehicle_media SET is_primary = FALSE WHERE vehicle_id = %s", (vehicle_id,))
        row = connection.execute(
            """INSERT INTO vehicle_media
               (vehicle_id, media_type, url, sort_order, is_primary, source)
               VALUES (%s,%s,%s,%s,%s,%s)
               RETURNING id, media_type, url, sort_order, is_primary, source""",
            (vehicle_id, payload.media_type, str(payload.url), payload.sort_order, payload.is_primary, payload.source),
        ).fetchone()
        connection.commit()
    return row


@router.delete("/{vehicle_id}/media/{media_id}")
def delete_media(vehicle_id: int, media_id: int):
    with get_connection() as connection:
        row = connection.execute(
            "DELETE FROM vehicle_media WHERE id = %s AND vehicle_id = %s RETURNING id",
            (media_id, vehicle_id),
        ).fetchone()
        connection.commit()
    return {"deleted": bool(row)}
