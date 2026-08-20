# Fenix Auto API

## Local start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Health check: `GET /health`

Vehicle API: `/api/v1/vehicles`
