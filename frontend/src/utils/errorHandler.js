export const formatErrorMessage = (error) => {
  // Handle validation errors
  if (error.includes("validation errors for ResumeData")) {
    return "Unable to analyze some parts of your resume. Please make sure your resume is properly formatted and contains the necessary information.";
  }

  // Handle file-related errors
  if (error.includes("File type not supported")) {
    return "Please upload a valid resume file. Supported formats are PDF and DOCX.";
  }

  if (error.includes("File too large")) {
    return "The resume file is too large. Please upload a file smaller than 5MB.";
  }

  // Handle API and server errors
  if (error.includes("Failed to fetch") || error.includes("NetworkError")) {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  if (error.includes("Failed to analyze resume")) {
    return "We encountered an issue while analyzing your resume. Please try again or upload a different file.";
  }

  // Default error message
  return "An unexpected error occurred. Please try again later.";
};

export const getErrorType = (error) => {
  if (
    error.includes("validation") ||
    error.includes("File type") ||
    error.includes("File too large")
  ) {
    return "warning";
  }
  return "error";
};
