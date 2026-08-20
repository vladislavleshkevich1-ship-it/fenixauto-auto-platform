export type Vehicle = {
  id: number;
  slug: string;
  brand: string;
  model: string;
  trim?: string | null;
  year: number;
  mileage_km: number;
  price_usd: number;
  status: string;
  source: string;
  description?: string | null;
  is_visible: boolean;
};

export type VehicleMedia = {
  id: number;
  media_type: string;
  url: string;
  sort_order: number;
  is_primary: boolean;
  source: string;
};

const API_URL = process.env.API_URL ?? "http://localhost:8000";

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_URL}/api/v1/vehicles`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load vehicles");
  return response.json();
}

export async function getVehicle(id: number): Promise<Vehicle> {
  const response = await fetch(`${API_URL}/api/v1/vehicles/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load vehicle");
  return response.json();
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle> {
  const response = await fetch(`${API_URL}/api/v1/vehicles/by-slug/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load vehicle");
  return response.json();
}

export async function getVehicleMedia(vehicleId: number): Promise<VehicleMedia[]> {
  const response = await fetch(`${API_URL}/api/v1/vehicles/${vehicleId}/media`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load vehicle media");
  return response.json();
}
