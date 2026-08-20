from fastapi import FastAPI

from .vehicles import router as vehicles_router

app = FastAPI(
    title="Fenix Auto API",
    version="0.1.0",
    description="Backend API for the Fenix_Auto vehicle platform.",
)

app.include_router(vehicles_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "fenix-auto-api"}
