# JobPsych - AI-Powered Resume Analysis & Interview Preparation Tool

<div align="center">

**Smart Candidate Evaluation & AI-Powered Interview Preparation**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.7-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](https://jobpsych.vercel.app/) • [API Documentation](#api-integration) • [Contact](#contact)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Components](#-components)
- [Error Handling](#-error-handling)
- [Rate Limiting](#-rate-limiting)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Contact](#-contact)

## 🎯 Overview

JobPsych is a cutting-edge web application that revolutionizes HR processes through AI-powered resume analysis and intelligent interview preparation. The platform helps HR professionals and recruiters streamline candidate evaluation by automatically analyzing resumes and generating tailored interview questions.

### Key Benefits

- **Time Efficient**: Reduce resume screening time by 80%
- **AI-Powered**: Advanced natural language processing for accurate analysis
- **Interview Ready**: Auto-generated questions based on candidate's background
- **User-Friendly**: Intuitive interface with real-time feedback
- **Mobile Responsive**: Works seamlessly across all devices

## ✨ Features

### 🔍 Resume Analysis

- **Multi-format Support**: PDF, DOC, DOCX files (up to 5MB)
- **Intelligent Parsing**: Extracts personal info, experience, education, and skills
- **Key Highlights**: Identifies standout qualifications and achievements
- **Real-time Processing**: Fast analysis with visual feedback

### 🎯 Interview Question Generation

- **Categorized Questions**: Technical, Behavioral, and Experience-based
- **Context-Aware**: Questions tailored to candidate's specific background
- **Interactive Selection**: Choose and organize questions for interviews
- **Professional Insights**: Strategic tips for effective interviewing

### 🛡️ Robust Error Handling

- **Network Resilience**: Graceful handling of connection issues
- **File Validation**: Comprehensive checks for file type and size
- **User Feedback**: Clear error messages and recovery suggestions
- **Rate Limit Management**: Built-in quota system with user guidance

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation
- **Dark Mode Ready**: Future-ready design system

## 🛠️ Technology Stack

### Frontend

- **React 19.1.0** - Modern UI library with latest features
- **Vite 6.3.5** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

### State Management

- **React Hooks** - useState, useEffect for local state
- **Context API** - Global state management
- **Error Boundaries** - Graceful error handling

### Development Tools

- **ESLint** - Code linting and formatting
- **React DevTools** - Development debugging
- **Hot Reload** - Instant development feedback

### Browser Features

- **PWA Ready** - Progressive Web App capabilities
- **Service Worker** - Offline functionality
- **Local Storage** - Client-side data persistence

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ResumeUpload.jsx         # File upload interface
│   ├── ResumeDetails.jsx        # Parsed resume display
│   ├── GeneratedQuestions.jsx   # Interview questions
│   ├── RateLimitError.jsx       # Rate limit handling
│   ├── Toast.jsx               # Notification system
│   ├── ErrorBoundary.jsx       # Error boundary wrapper
│   └── ...
├── utils/              # Utility functions
│   ├── api.js                  # API configuration
│   ├── errorHandler.js         # Error management
│   ├── pwaUtils.js            # PWA utilities
│   └── reactSafety.js         # React safety hooks
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## 🧩 Components

### Core Components

#### ResumeUpload

- Drag & drop file upload
- File validation and preview
- Progress indicators
- Error handling

#### ResumeDetails

- Structured resume display
- Highlighting system
- Responsive layout
- Professional formatting

#### GeneratedQuestions

- Categorized question display
- Interactive selection
- Expandable sections
- Export functionality

#### RateLimitError

- Rate limit notification
- Countdown timer
- Contact information
- User guidance

### Error Handling Components

#### ErrorBoundary

- Application-level error catching
- User-friendly error pages
- Recovery options
- Debug information

#### Toast System

- Real-time notifications
- Multiple types (success, warning, error)
- Auto-dismiss functionality
- Accessibility support

## 🚨 Error Handling

### Error Types

```javascript
const ERROR_TYPES = {
  NETWORK: "network",
  SERVER: "server",
  VALIDATION: "validation",
  FILE: "file",
  TIMEOUT: "timeout",
  RATE_LIMIT: "rate_limit",
  UNKNOWN: "unknown",
};
```

### Error Recovery

- **Automatic Retry**: For network and server errors
- **File Validation**: Pre-upload checks with user guidance
- **Graceful Degradation**: Fallback components for critical failures
- **User Feedback**: Clear messages with actionable steps

## ⏱️ Rate Limiting

### Current Limits

- **2 resume uploads per 24 hours** per IP address
- Enforced by backend API
- User-friendly error handling

### Rate Limit Features

- Real-time countdown timer
- Clear reset information
- Contact details for additional quota
- Professional upgrade path

### Example Rate Limit Response

```json
{
  "detail": {
    "error": "Rate limit exceeded",
    "message": "You have exceeded the daily limit of 2 resume uploads per day.",
    "reset_in": "23h 53m",
    "retry_after": 85995
  }
}
```

## 📞 Contact

### Support & Business Inquiries

- **Email**: rafkhan9323@gmail.com
- **Website**: [jobpsych.vercel.app](https://jobpsych.vercel.app)

### Premium Features

For additional resume analysis quota or enterprise features, contact us at rafkhan9323@gmail.com

---

<div align="center">

**Made with ❤️ by the JobPsych Team**

[⭐ Star this repo](https://github.com/yourusername/jobpsych-frontend) • [🐛 Report Bug](https://github.com/yourusername/jobpsych-frontend/issues) • [💡 Request Feature](https://github.com/yourusername/jobpsych-frontend/issues)

</div>
