from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql://fenixauto:fenixauto_dev@localhost:5432/fenixauto"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
