from fastapi import APIRouter, HTTPException
from utils.dataset import DataSet
from utils.elastic_search import ElasticSearch
from utils.elasticsearch_client import es_client
import schemas
from utils.resume import Resume

router = APIRouter(prefix="/jobs")

@router.get("")
async def search_jobs(keyword: str, location: str):
    elasticsearch = ElasticSearch(es_client)
    jobs = await elasticsearch.search_jobs_with_keyword(keyword, location, True)

    if not jobs:
        return []
    
    return jobs


@router.post("/user-jobs")
async def get_jobs_from_resume(resume_text: schemas.ResumeText):
    dataset = DataSet()
    skills_dataset = await dataset.get_dataset()

    print(type(skills_dataset))

    jobs = []

    if skills_dataset:
        parser = Resume()
        resume_skills = await parser.extract_skills_semantic(resume_text.text)
        print(resume_skills)
        db = ElasticSearch(es_client)
        jobs = await db.search_jobs_with_skills(resume_skills, min_match=1)

    if not jobs:
        raise HTTPException(404, "No jobs found")
    
    return jobs