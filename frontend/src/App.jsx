import "./index.css";
import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import ResumeDetails from "./components/ResumeDetails";
import GeneratedQuestions from "./components/GeneratedQuestions";
import Toast from "./components/Toast";
import { formatErrorMessage, getErrorType } from "./utils/errorHandler";

const App = () => {
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError({ show: false, message: "", type: "error" });

    // Validate file size
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError({
        show: true,
        message:
          "The file is too large (max 5MB). Please upload a smaller file or compress the current one.",
        type: "warning",
      });
      setIsLoading(false);
      return;
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/octet-stream",
      "application/x-msword",
      "application/vnd.ms-word",
      "", // Empty string for when browser doesn't provide MIME type
    ];

    // Also validate file extension
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    const isValidExtension = allowedExtensions.includes(fileExtension);

    console.log("File type:", file.type, "File extension:", fileExtension);

    // Check both MIME type and file extension
    if (!allowedTypes.includes(file.type) && !isValidExtension) {
      setError({
        show: true,
        message: "Please upload a PDF or Word document (DOC/DOCX).",
        type: "warning",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze resume");
      }

      const data = await response.json();
      setResumeData(data.resumeData);
      setQuestions(data.questions);

      setError({
        show: true,
        message:
          "Resume successfully analyzed! Scroll down to view the results.",
        type: "success",
      });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      const errorMessage = formatErrorMessage(error.message);
      const errorType = getErrorType(error.message);
      setError({
        show: true,
        message: errorMessage,
        type: errorType,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Toast
        show={error.show}
        message={error.message}
        type={error.type}
        onClose={() => setError({ show: false, message: "", type: "error" })}
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-[wave_10s_linear_infinite] motion-safe:transform-none"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-full bg-gradient-to-r from-blue-50 via-blue-50/70 to-sky-50/50 opacity-40 blur-[106px] animate-pulse"></div>
      </div>

      <header className="bg-white/70 backdrop-blur-sm shadow-lg sticky top-0 z-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between bg-gradient-to-r from-white/80 via-blue-50/50 to-indigo-50/30 rounded-2xl border border-blue-100/30 shadow-xl shadow-blue-100/20 backdrop-blur-md px-8 py-4 hover:shadow-2xl hover:border-blue-200/40 transition-all duration-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <svg
                  className="h-12 w-12 text-blue-600 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
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
                <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 group-hover:scale-105">
                  HR Resume Assistant
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex flex-col items-end group">
                <p className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600">
                  Smart Candidate Evaluation
                </p>
                <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                  AI-Powered Interview Preparation
                </p>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-ping opacity-30"></div>
              </div>
              <p className="text-gray-500 animate-pulse">Analyzing resume...</p>
            </div>
          </div>
        ) : (
          <div className="relative space-y-8 z-10">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-blue-50 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <ResumeUpload onFileUpload={handleFileUpload} />
            {resumeData && <ResumeDetails resumeData={resumeData} />}
            {questions.length > 0 && (
              <GeneratedQuestions questions={questions} />
            )}

            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-50 to-indigo-50 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 mt-12 overflow-hidden">
        {/* Footer Background with Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/90 to-indigo-50/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] animate-[pulse_4s_ease-in-out_infinite]"></div>

        {/* Animated background elements */}
        <div className="absolute -top-40 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-60 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Top Footer Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 py-12 sm:px-6 lg:px-8 border-t border-blue-100/30 backdrop-blur-sm">
            {/* Company Info - Spans 4 columns */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center group transform hover:scale-105 transition-all duration-300">
                <svg
                  className="h-8 w-8 text-blue-600 transform group-hover:rotate-12 transition-all duration-500"
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
                <h3 className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%] hover:bg-[length:100%] animate-gradient">
                  JobPsych AI
                </h3>
              </div>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed hover:text-gray-800 transition-colors duration-300">
                Revolutionizing HR processes with AI-powered resume analysis and
                intelligent interview preparation.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 border border-blue-200/80 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-3 h-3 mr-1 transform group-hover:rotate-180 transition-transform duration-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  AI Powered
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border border-green-200/80 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-3 h-3 mr-1 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  HR Optimized
                </span>
              </div>
            </div>

            {/* Features Section - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Features
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Resume Analysis
                  </a>
                </li>
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Question Generation
                  </a>
                </li>
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Interview Prep
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section - Spans 3 columns */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Resources
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Documentation
                  </a>
                </li>
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    API Reference
                  </a>
                </li>
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center transform hover:translate-x-1">
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section - Spans 2 columns */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="group">
                  <a className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    support@jobpsych.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="border-t border-blue-100/30 bg-gradient-to-r from-white/50 via-blue-50/30 to-indigo-50/20 backdrop-blur-sm">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-600/90 font-medium hover:text-gray-800 transition-colors duration-300">
                    © 2025 JobPsych AI. All rights reserved.
                  </p>
                  <div className="hidden md:block h-4 w-px bg-gradient-to-b from-gray-200 to-gray-300/50"></div>
                  <a className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                    Privacy
                  </a>
                  <a className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                    Terms
                  </a>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    <span className="group inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-medium bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-green-600 transition-all duration-300">
                        Systems Operational
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
