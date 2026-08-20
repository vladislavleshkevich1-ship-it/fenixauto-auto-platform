CREATE TABLE IF NOT EXISTS vehicles (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(180) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    trim VARCHAR(150),
    year SMALLINT NOT NULL,
    mileage_km INTEGER NOT NULL DEFAULT 0,
    price_usd NUMERIC(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'IN_STOCK',
    source VARCHAR(30) NOT NULL DEFAULT 'FENIX_AUTO',
    description TEXT,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_source ON vehicles(source);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand_model ON vehicles(brand, model);
CREATE INDEX IF NOT EXISTS idx_vehicles_visible ON vehicles(is_visible);

CREATE TABLE IF NOT EXISTS vehicle_specifications (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    engine_type VARCHAR(50),
    engine_volume_l NUMERIC(4,1),
    power_hp INTEGER,
    transmission VARCHAR(80),
    drivetrain VARCHAR(50),
    body_type VARCHAR(50),
    fuel_type VARCHAR(50),
    exterior_color VARCHAR(80),
    interior_color VARCHAR(80),
    UNIQUE(vehicle_id)
);

CREATE TABLE IF NOT EXISTS vehicle_sources (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    source VARCHAR(30) NOT NULL,
    external_id VARCHAR(180),
    auction VARCHAR(50),
    lot_number VARCHAR(100),
    vin VARCHAR(32),
    raw_payload JSONB,
    synced_at TIMESTAMPTZ,
    UNIQUE(source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_vehicle_sources_vin ON vehicle_sources(vin);
CREATE INDEX IF NOT EXISTS idx_vehicle_sources_lot ON vehicle_sources(auction, lot_number);

CREATE TABLE IF NOT EXISTS vehicle_media (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL DEFAULT 'IMAGE',
    url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    source VARCHAR(30) NOT NULL DEFAULT 'FENIX_AUTO'
);

CREATE INDEX IF NOT EXISTS idx_vehicle_media_vehicle ON vehicle_media(vehicle_id, sort_order);

CREATE TABLE IF NOT EXISTS vehicle_prices (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    purchase_price_usd NUMERIC(12,2),
    auction_fee_usd NUMERIC(12,2),
    delivery_usd NUMERIC(12,2),
    customs_usd NUMERIC(12,2),
    recycling_fee_usd NUMERIC(12,2),
    insurance_usd NUMERIC(12,2),
    bank_fee_usd NUMERIC(12,2),
    fenix_markup_usd NUMERIC(12,2),
    final_price_usd NUMERIC(12,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT REFERENCES vehicles(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(80),
    telegram VARCHAR(150),
    message TEXT,
    source_page TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
