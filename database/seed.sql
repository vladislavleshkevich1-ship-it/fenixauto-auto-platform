INSERT INTO vehicles (
    slug, brand, model, trim, year, mileage_km, price_usd, status, source,
    description, is_visible, is_featured
) VALUES (
    'deepal-s07-620-max-2026-demo',
    'Deepal',
    'S07',
    '620 Max',
    2026,
    0,
    24500,
    'IN_STOCK',
    'FENIX_AUTO',
    'Тестовый автомобиль Fenix_Auto. Новый Deepal S07 620 Max 2026 года. Серый кузов, рыжий салон. Автомобиль в наличии.',
    TRUE,
    TRUE
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO vehicle_specifications (
    vehicle_id, engine_type, drivetrain, body_type, fuel_type, exterior_color, interior_color
)
SELECT id, 'Electric', 'AWD', 'SUV', 'Electric', 'Серый', 'Рыжий'
FROM vehicles
WHERE slug = 'deepal-s07-620-max-2026-demo'
ON CONFLICT (vehicle_id) DO NOTHING;
