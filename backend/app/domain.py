from enum import Enum

from pydantic import BaseModel, Field


class VehicleStatus(str, Enum):
    IN_STOCK = "IN_STOCK"
    RESERVED = "RESERVED"
    IN_TRANSIT = "IN_TRANSIT"
    ORDER = "ORDER"
    AUCTION = "AUCTION"
    BUY_NOW = "BUY_NOW"
    SOLD = "SOLD"
    ARCHIVED = "ARCHIVED"


class VehicleSource(str, Enum):
    FENIX_AUTO = "FENIX_AUTO"
    AUCTIONS_API = "AUCTIONS_API"
    COPART = "COPART"
    IAAI = "IAAI"
    ENCAR = "ENCAR"
    CSV = "CSV"
    OTHER = "OTHER"


class VehicleCreate(BaseModel):
    brand: str = Field(min_length=1, max_length=100)
    model: str = Field(min_length=1, max_length=100)
    trim: str | None = Field(default=None, max_length=150)
    year: int = Field(ge=1900, le=2100)
    mileage_km: int = Field(default=0, ge=0)
    price_usd: float = Field(ge=0)
    status: VehicleStatus = VehicleStatus.IN_STOCK
    source: VehicleSource = VehicleSource.FENIX_AUTO
    description: str | None = None


class VehicleUpdate(BaseModel):
    brand: str | None = Field(default=None, min_length=1, max_length=100)
    model: str | None = Field(default=None, min_length=1, max_length=100)
    trim: str | None = Field(default=None, max_length=150)
    year: int | None = Field(default=None, ge=1900, le=2100)
    mileage_km: int | None = Field(default=None, ge=0)
    price_usd: float | None = Field(default=None, ge=0)
    status: VehicleStatus | None = None
    source: VehicleSource | None = None
    description: str | None = None
    is_visible: bool | None = None


class Vehicle(VehicleCreate):
    id: int
    slug: str
    is_visible: bool = True
