from fastapi import APIRouter, HTTPException

from .domain import Vehicle, VehicleCreate
from .store import vehicle_store

router = APIRouter(prefix="/api/v1/vehicles", tags=["vehicles"])


@router.get("", response_model=list[Vehicle])
def list_vehicles() -> list[Vehicle]:
    return vehicle_store.list()


@router.get("/{vehicle_id}", response_model=Vehicle)
def get_vehicle(vehicle_id: int) -> Vehicle:
    vehicle = vehicle_store.get(vehicle_id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


@router.post("", response_model=Vehicle, status_code=201)
def create_vehicle(payload: VehicleCreate) -> Vehicle:
    return vehicle_store.create(payload)
