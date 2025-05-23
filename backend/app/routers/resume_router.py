from fastapi import APIRouter, UploadFile, HTTPException
from app.services.resume_parser import ResumeParser
from app.services.question_generator import QuestionGenerator
from app.models.schemas import ResumeAnalysisResponse
from app.models.schemas import ResumeData

router = APIRouter()

@router.post("/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile):
    try:
        # Parse resume
        parser = ResumeParser()
        resume_data = await parser.parse(file)

        # Generate questions
        generator = QuestionGenerator()
        questions = await generator.generate(resume_data)

        # Create response with proper typing
        return ResumeAnalysisResponse(
            resumeData=ResumeData(**resume_data),
            questions=questions
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
