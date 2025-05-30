from fastapi import APIRouter, File, UploadFile
from utils.resume import Resume


router = APIRouter(prefix="/users")

@router.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()

    parser = Resume(contents, file.filename)
    text = parser.extract_text_from_resume()
    
    return { "text": text }
