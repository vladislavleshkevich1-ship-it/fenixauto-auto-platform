from uuid import uuid4

from .db import get_connection
from .domain import Vehicle, VehicleCreate, VehicleUpdate


class VehicleStore:
    @staticmethod
    def _from_row(row) -> Vehicle:
        return Vehicle(**row)

    def list(self, include_hidden: bool = False) -> list[Vehicle]:
        where = "" if include_hidden else " WHERE is_visible = TRUE"
        with get_connection() as connection:
            rows = connection.execute(
                f"""SELECT id, slug, brand, model, trim, year, mileage_km,
                          price_usd, status, source, description, is_visible
                   FROM vehicles{where} ORDER BY created_at DESC"""
            ).fetchall()
        return [self._from_row(row) for row in rows]

    def get(self, vehicle_id: int, include_hidden: bool = False) -> Vehicle | None:
        visibility = "" if include_hidden else " AND is_visible = TRUE"
        with get_connection() as connection:
            row = connection.execute(
                f"""SELECT id, slug, brand, model, trim, year, mileage_km,
                          price_usd, status, source, description, is_visible
                   FROM vehicles WHERE id = %s{visibility}""", (vehicle_id,)
            ).fetchone()
        return self._from_row(row) if row else None

    def get_by_slug(self, slug: str, include_hidden: bool = False) -> Vehicle | None:
        visibility = "" if include_hidden else " AND is_visible = TRUE"
        with get_connection() as connection:
            row = connection.execute(
                f"""SELECT id, slug, brand, model, trim, year, mileage_km,
                          price_usd, status, source, description, is_visible
                   FROM vehicles WHERE slug = %s{visibility}""", (slug,)
            ).fetchone()
        return self._from_row(row) if row else None

    def create(self, payload: VehicleCreate) -> Vehicle:
        base = f"{payload.brand}-{payload.model}-{payload.year}".lower().replace(" ", "-")
        slug = f"{base}-{uuid4().hex[:8]}"
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

    def update(self, vehicle_id: int, payload: VehicleUpdate) -> Vehicle | None:
        values = payload.model_dump(exclude_unset=True)
        if not values:
            return self.get(vehicle_id, include_hidden=True)
        assignments = []
        params = []
        for field, value in values.items():
            assignments.append(f"{field} = %s")
            params.append(value.value if hasattr(value, "value") else value)
        assignments.append("updated_at = NOW()")
        params.append(vehicle_id)
        with get_connection() as connection:
            row = connection.execute(
                f"""UPDATE vehicles SET {', '.join(assignments)}
                    WHERE id = %s
                    RETURNING id, slug, brand, model, trim, year, mileage_km,
                              price_usd, status, source, description, is_visible""",
                params,
            ).fetchone()
            connection.commit()
        return self._from_row(row) if row else None

    def archive(self, vehicle_id: int) -> Vehicle | None:
        return self.update(vehicle_id, VehicleUpdate(status="ARCHIVED", is_visible=False))


vehicle_store = VehicleStore()
