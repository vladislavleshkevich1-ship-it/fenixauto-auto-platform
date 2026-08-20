from .domain import Vehicle, VehicleCreate


class VehicleStore:
    def __init__(self) -> None:
        self._vehicles: list[Vehicle] = []
        self._next_id = 1

    def list(self) -> list[Vehicle]:
        return [vehicle for vehicle in self._vehicles if vehicle.is_visible]

    def get(self, vehicle_id: int) -> Vehicle | None:
        return next((vehicle for vehicle in self._vehicles if vehicle.id == vehicle_id), None)

    def create(self, payload: VehicleCreate) -> Vehicle:
        vehicle_id = self._next_id
        self._next_id += 1
        slug = f"{payload.brand}-{payload.model}-{payload.year}-{vehicle_id}".lower().replace(" ", "-")
        vehicle = Vehicle(id=vehicle_id, slug=slug, **payload.model_dump())
        self._vehicles.append(vehicle)
        return vehicle


vehicle_store = VehicleStore()
