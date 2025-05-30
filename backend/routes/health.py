from fastapi import APIRouter

router = APIRouter(prefix="/health")

@router.get("")
def health_check():
    """Health check endpoint for monitoring or CronJobs."""
    return {"status": "ok"}