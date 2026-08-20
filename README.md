# Fenix Auto Platform

Собственная автомобильная платформа Fenix_Auto для каталога, автомобилей в наличии, автомобилей под заказ, заявок и будущих интеграций с внешними источниками.

## Стек

- Frontend: Next.js + TypeScript
- Backend: FastAPI + Python
- Database: PostgreSQL
- Cache/background jobs: Redis
- Containerization: Docker Compose
- CI: GitHub Actions

## Архитектура

Fenix_Auto является системой хранения и отображения данных. Внешние источники подключаются через адаптеры и не управляют структурой публичного сайта.

```text
Source Adapter
   ↓
Fenix Auto API
   ↓
PostgreSQL
   ↓
Admin / Catalog / Vehicle Page
```

Источники могут быть ручными, USA, Korea, China и другими. Внешний источник хранит свои идентификаторы и исходные данные отдельно от коммерческих данных Fenix_Auto.

## Уже реализовано

- Vehicle model, statuses and sources
- PostgreSQL schema for vehicles, specs, sources, media, prices and leads
- FastAPI vehicle CRUD API
- Media API with primary-photo support
- Lead API stored in PostgreSQL
- Next.js catalog
- Dynamic vehicle pages by slug
- Real media rendering in vehicle gallery
- Admin vehicle creation/edit/archive
- Admin leads inbox
- Docker Compose for PostgreSQL, Redis, backend and frontend
- CI workflow for backend database/import checks and frontend production build

## Локальный запуск

Требуется Docker и Docker Compose.

```bash
docker compose up --build
```

После запуска:

- Frontend: http://localhost:3000
- Catalog: http://localhost:3000/cars
- Admin: http://localhost:3000/admin
- Leads: http://localhost:3000/admin/leads
- API: http://localhost:8000
- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

Первый тестовый автомобиль загружается через `database/seed.sql`.

## Важное правило данных

Поля Fenix_Auto (цена, описание, статус, видимость, контент) не должны перезаписываться синхронизацией внешнего источника. Для внешних интеграций используются отдельные source-данные и адаптеры.

## Следующие этапы

1. Production deployment
2. Authentication and roles for admin
3. Object storage / полноценная загрузка фотографий
4. Расширенные характеристики и SEO/CMS
5. USA source adapter
6. Korea source adapter
7. Дополнительные источники, CRM и Telegram
