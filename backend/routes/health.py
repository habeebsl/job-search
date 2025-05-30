from fastapi import APIRouter

router = APIRouter(prefix="/health")

@router.get("")
async def health_check():
    """Health check endpoint for monitoring or CronJobs."""
    return {"status": "ok"}