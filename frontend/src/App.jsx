import "./index.css";
import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import ResumeDetails from "./components/ResumeDetails";
import GeneratedQuestions from "./components/GeneratedQuestions";

const App = () => {
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    try {
      // Create form data
      const formData = new FormData();
      formData.append("resume", file);

      // TODO: Replace with your actual API endpoint
      const response = await fetch("http://localhost:8000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResumeData(data.resumeData);
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <svg
                  className="h-10 w-10 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HR Resume Assistant
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-sm font-medium text-gray-600">
                  Smart Candidate Evaluation
                </p>
                <p className="text-xs text-gray-400">
                  AI-Powered Interview Preparation
                </p>
              </div>
              <button className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Review
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 animate-pulse">
              Analyzing Candidate Profile...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <ResumeUpload onFileUpload={handleFileUpload} />
            {resumeData && <ResumeDetails resumeData={resumeData} />}
            {questions.length > 0 && (
              <GeneratedQuestions questions={questions} />
            )}
          </div>
        )}
      </main>

      <footer className="bg-white shadow-md mt-12">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Powered by JobPsych AI - Your Intelligent Recruitment Assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
