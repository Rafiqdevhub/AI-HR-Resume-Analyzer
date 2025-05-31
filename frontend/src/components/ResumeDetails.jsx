import React from "react";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const ResumeDetails = ({ resumeData }) => {
  if (!resumeData) return null;

  const { personalInfo, workExperience, education, skills, highlights } =
    resumeData;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-6">
        <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Candidate Assessment
        </h2>
      </div>

      {/* Key Highlights */}
      {highlights && (
        <div className="mb-8 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <StarIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium text-blue-700">
              Key Highlights
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {highlights.map((highlight, index) => (
              <li key={index} className="text-blue-600">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Personal Information */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <UserCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-medium text-gray-700">
            Candidate Profile
          </h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(personalInfo).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <BriefcaseIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-medium text-gray-700">
            Professional Experience
          </h3>
        </div>
        <div className="space-y-4">
          {workExperience.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
            >
              <h4 className="font-medium text-blue-600">{exp.title}</h4>
              <p className="text-gray-700 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>{" "}
              {exp.description && exp.description.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Description:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-medium text-gray-700">
            Skills Assessment
          </h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="text-sm text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center mb-4">
          <AcademicCapIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-medium text-gray-700">
            Educational Background
          </h3>
        </div>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
            >
              {" "}
              <h4 className="font-medium text-blue-600">{edu.degree}</h4>
              <p className="text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
              {edu.details && edu.details.length > 0 && (
                <div className="mt-2">
                  <ul className="list-disc list-inside space-y-1">
                    {edu.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
