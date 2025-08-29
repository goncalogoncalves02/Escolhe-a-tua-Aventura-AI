from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import story, job
from db.database import create_tables

create_tables()

app = FastAPI(
    title="Escolhe a tua Aventura API",
    description="API para o projeto Escolhe a tua Aventura",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuração do CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS, # Permitir origens especificadas nas configurações
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos HTTP
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

app.include_router(story.router, prefix=settings.API_PREFIX)
app.include_router(job.router, prefix=settings.API_PREFIX)

if __name__ == "__main__":
    import uvicorn
    # Executa o servidor Uvicorn para desenvolvimento e para usar a FastAPI
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
