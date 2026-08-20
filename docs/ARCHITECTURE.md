# Fenix Auto Platform — Architecture

## Goal

Build a self-owned automotive platform where Fenix_Auto controls the catalog, prices, statuses, content and media. External sources such as AuctionsAPI are integrations, not the system of record.

## Initial stack

- Web: Next.js + TypeScript
- API: FastAPI + Python
- Database: PostgreSQL
- Cache/jobs: Redis
- Media: S3-compatible object storage

## Domain boundaries

### Vehicle
A normalized Fenix_Auto vehicle record. It can be manually created or imported from an external source.

### Source data
Raw/normalized external data is stored separately from Fenix_Auto commercial/content fields. Synchronization must not overwrite Fenix_Auto-owned fields.

### Media
Vehicle images/video references are separate records so ordering, source and ownership can be controlled independently.

### Leads
All public forms create a lead linked to a vehicle when applicable.

## Vehicle statuses

- IN_STOCK — В наличии
- RESERVED — Забронирован
- IN_TRANSIT — В пути
- ORDER — Под заказ
- AUCTION — На аукционе
- BUY_NOW — Buy Now
- SOLD — Продан
- ARCHIVED — Архив

## Source types

- FENIX_AUTO
- AUCTIONS_API
- COPART
- IAAI
- ENCAR
- CSV
- OTHER

## API boundary

The public website must never call an external auction API directly. External credentials remain server-side. Integrations import data into the Fenix_Auto database; the frontend reads from the Fenix_Auto API.

## First implementation slice

1. Repository structure.
2. Backend health endpoint and API versioning.
3. PostgreSQL models and migrations.
4. Vehicle CRUD API.
5. Minimal admin authentication.
6. Admin vehicle creation/editing.
7. Public catalog and vehicle page.
8. Media upload abstraction.

AuctionsAPI integration comes after this foundation is working end-to-end.
