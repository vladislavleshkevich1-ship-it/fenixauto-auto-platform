from .db import get_connection
from .domain import Vehicle, VehicleCreate


class VehicleStore:
    @staticmethod
    def _from_row(row) -> Vehicle:
        return Vehicle(**row)

    def list(self) -> list[Vehicle]:
        with get_connection() as connection:
            rows = connection.execute(
                """SELECT id, slug, brand, model, trim, year, mileage_km,
                          price_usd, status, source, description, is_visible
                   FROM vehicles WHERE is_visible = TRUE ORDER BY created_at DESC"""
            ).fetchall()
        return [self._from_row(row) for row in rows]

    def get(self, vehicle_id: int) -> Vehicle | None:
        with get_connection() as connection:
            row = connection.execute(
                """SELECT id, slug, brand, model, trim, year, mileage_km,
                          price_usd, status, source, description, is_visible
                   FROM vehicles WHERE id = %s""", (vehicle_id,)
            ).fetchone()
        return self._from_row(row) if row else None

    def create(self, payload: VehicleCreate) -> Vehicle:
        slug = f"{payload.brand}-{payload.model}-{payload.year}-{payload.source.value}".lower().replace(" ", "-")
        with get_connection() as connection:
            row = connection.execute(
                """INSERT INTO vehicles
                   (slug, brand, model, trim, year, mileage_km, price_usd,
                    status, source, description)
                   VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                   RETURNING id, slug, brand, model, trim, year, mileage_km,
                             price_usd, status, source, description, is_visible""",
                (slug, payload.brand, payload.model, payload.trim, payload.year,
                 payload.mileage_km, payload.price_usd, payload.status.value,
                 payload.source.value, payload.description),
            ).fetchone()
            connection.commit()
        return self._from_row(row)


vehicle_store = VehicleStore()
