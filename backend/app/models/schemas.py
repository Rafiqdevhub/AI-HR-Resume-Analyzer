from pydantic import BaseModel
from typing import List, Optional

class PersonalInfo(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class Experience(BaseModel):
    title: str
    company: str
    duration: str
    description: List[str]

class Education(BaseModel):
    degree: str
    institution: str
    year: str
    details: Optional[List[str]] = None

class ResumeData(BaseModel):
    personalInfo: PersonalInfo
    workExperience: List[Experience]
    education: List[Education]
    skills: List[str]
    highlights: List[str]

class Question(BaseModel):
    type: str  # "technical" | "behavioral" | "experience"
    question: str
    context: str

class ResumeAnalysisResponse(BaseModel):
    resumeData: ResumeData
    questions: List[Question]
