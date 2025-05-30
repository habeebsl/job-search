from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.elasticsearch_client import es_client
from routes import job, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://job-search-tau.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

es = es_client

app.include_router(user.router, prefix="/api", tags=["user"])
app.include_router(job.router, prefix="/api", tags=["job"])