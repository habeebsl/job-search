import os
from dotenv import load_dotenv
from elasticsearch import AsyncElasticsearch

load_dotenv()

es_client = AsyncElasticsearch(
    os.getenv("ELASTICSEARCH_URL"),
    api_key=os.getenv("ELASTICSEARCH_KEY"),
    request_timeout=60
)