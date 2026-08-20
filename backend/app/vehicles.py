from fastapi import APIRouter, HTTPException

from .domain import Vehicle, VehicleCreate

router = APIRouter(prefix="/api/v1/vehicles", tags=["vehicles"])

_vehicles: list[Vehicle] = []
_next_id = 1


def make_slug(brand: str, model: str, year: int, vehicle_id: int) -> str:
    return f"{brand}-{model}-{year}-{vehicle_id}".lower().replace(" ", "-")


@router.get("", response_model=list[Vehicle])
def list_vehicles() -> list[Vehicle]:
    return [vehicle for vehicle in _vehicles if vehicle.is_visible]


@router.get("/{vehicle_id}", response_model=Vehicle)
def get_vehicle(vehicle_id: int) -> Vehicle:
    for vehicle in _vehicles:
        if vehicle.id == vehicle_id:
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")


@router.post("", response_model=Vehicle, status_code=201)
def create_vehicle(payload: VehicleCreate) -> Vehicle:
    global _next_id
    vehicle_id = _next_id
    _next_id += 1
    vehicle = Vehicle(
        id=vehicle_id,
        slug=make_slug(payload.brand, payload.model, payload.year, vehicle_id),
        **payload.model_dump(),
    )
    _vehicles.append(vehicle)
    return vehicle
