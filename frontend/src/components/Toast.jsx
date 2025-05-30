import React, { Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  XCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Toast = ({ message, type = "error", show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const icons = {
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    success: CheckCircleIcon,
  };

  const styles = {
    error:
      "bg-gradient-to-r from-red-50 to-red-50/80 text-red-800 border-red-200 shadow-lg shadow-red-100/50 backdrop-blur-sm",
    warning:
      "bg-gradient-to-r from-yellow-50 to-amber-50/80 text-yellow-800 border-yellow-200 shadow-lg shadow-yellow-100/50 backdrop-blur-sm",
    success:
      "bg-gradient-to-r from-green-50 to-emerald-50/80 text-green-800 border-green-200 shadow-lg shadow-green-100/50 backdrop-blur-sm",
  };

  const iconStyles = {
    error: "text-red-500 animate-bounce",
    warning: "text-yellow-500 animate-pulse",
    success: "text-green-500 animate-bounce",
  };

  const Icon = icons[type];

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-500 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-8 scale-95"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0 scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95 translate-x-8"
    >
      {" "}
      <div className="fixed top-4 right-4 z-50 w-full max-w-md transform-gpu">
        <div
          className={`rounded-xl border-2 p-4 ${styles[type]} hover:scale-102 transition-all duration-300 ease-in-out`}
          style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 relative">
              <div className="absolute -inset-1 rounded-full blur-sm opacity-30 bg-current"></div>
              <Icon
                className={`h-6 w-6 relative ${iconStyles[type]}`}
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-wide leading-5">
                {message}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className={`transform transition-all duration-200 inline-flex rounded-full p-1.5 hover:scale-110 hover:bg-opacity-10 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === "error"
                    ? "focus:ring-red-500"
                    : type === "warning"
                    ? "focus:ring-yellow-500"
                    : "focus:ring-green-500"
                }`}
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className={`h-5 w-5 transform hover:rotate-90 transition-transform duration-200 ${iconStyles[type]}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
