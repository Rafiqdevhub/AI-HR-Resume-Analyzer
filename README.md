# JobPsych - AI-Powered Resume Analysis & Interview Preparation

JobPsych is a modern web application that revolutionizes HR processes by leveraging AI to analyze resumes and generate intelligent, context-aware interview questions. Built with FastAPI and React, it uses Google's Gemini AI to provide sophisticated resume parsing and interview question generation.

## Features

- 📄 **Smart Resume Analysis**

  - Supports PDF and DOCX formats
  - Extracts key information including personal details, work experience, education, and skills
  - Generates concise highlights from the resume

- 🤖 **AI-Powered Question Generation**

  - Creates tailored interview questions based on candidate profile
  - Categories include:
    - Technical Competency Questions
    - Behavioral & Cultural Fit Questions
    - Experience Validation Questions

- 💼 **Modern UI Features**
  - Drag-and-drop resume upload
  - Interactive question selection
  - Responsive design for all devices
  - Real-time processing feedback

## Tech Stack

### Backend

- **Framework**: FastAPI
- **AI Integration**: Google Gemini AI
- **Document Processing**:
  - PyPDF2 & pdfplumber for PDF parsing
  - python-docx for DOCX handling
- **Data Validation**: Pydantic
- **Dependencies**: See `backend/pyproject.toml`

### Frontend

- **Framework**: React with Vite
- **UI Components**:
  - TailwindCSS for styling
  - Headless UI for accessible components
  - Heroicons for icons
- **File Handling**: react-dropzone
- **Dependencies**: See `frontend/package.json`

## Getting Started

### Prerequisites

- Python 3.13+
- Node.js (Latest LTS version)
- Google Gemini API Key

### Backend Setup

1. Navigate to the backend directory:

```powershell
cd backend
```

2. Create a .env file with your credentials:

```
GOOGLE_API_KEY="your-api-key"
HOST="localhost"
PORT="8000"
```

5. Start the backend server:

```powershell
uvicorn app.main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:

```powershell
cd frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### POST /api/analyze-resume

Analyzes a resume file and returns structured data with interview questions.

**Request**:

- Method: POST
- Content-Type: multipart/form-data
- Body: file (PDF or DOCX)

**Response**:

```json
{
  "resumeData": {
    "personalInfo": {
      "name": string,
      "email": string,
      "phone": string,
      "location": string
    },
    "workExperience": [{
      "title": string,
      "company": string,
      "duration": string,
      "description": string[]
    }],
    "education": [{
      "degree": string,
      "institution": string,
      "year": string,
      "details": string[]
    }],
    "skills": string[],
    "highlights": string[]
  },
  "questions": [{
    "type": string,
    "question": string,
    "context": string
  }]
}
```

## Acknowledgments

- Google Gemini AI for powering the intelligent analysis
- FastAPI for the robust backend framework
- React and Vite for the modern frontend architecture
