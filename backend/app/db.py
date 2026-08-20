from contextlib import contextmanager

import psycopg

from .config import settings


@contextmanager
def get_connection():
    with psycopg.connect(settings.database_url) as connection:
        yield connection
