import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const ResumeUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Review Candidate Resume
      </h2>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
          }`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon
          className={`mx-auto h-12 w-12 transition-colors duration-300 ${
            isDragActive ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <p
          className={`mt-4 text-base transition-colors duration-300 ${
            isDragActive ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {isDragActive
            ? "Drop candidate's resume here..."
            : "Upload candidate's resume (drag & drop or click)"}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Accepts PDF, DOC, and DOCX formats
        </p>
      </div>
      <div className="mt-4 text-center space-y-2">
        <p className="text-xs text-gray-400">
          Our AI will analyze the resume and help you prepare for the interview
        </p>
        <p className="text-xs text-blue-500">
          Get instant insights and tailored interview questions
        </p>
      </div>
    </div>
  );
};

export default ResumeUpload;
