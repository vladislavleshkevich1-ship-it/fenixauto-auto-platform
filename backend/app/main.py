from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .vehicles import router as vehicles_router

app = FastAPI(
    title="Fenix Auto API",
    version="0.1.0",
    description="Backend API for the Fenix_Auto vehicle platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vehicles_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "fenix-auto-api"}
