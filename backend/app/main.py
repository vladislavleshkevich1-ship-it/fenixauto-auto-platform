from fastapi import FastAPI

app = FastAPI(
    title="Fenix Auto API",
    version="0.1.0",
    description="Backend API for the Fenix_Auto vehicle platform.",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "fenix-auto-api"}
