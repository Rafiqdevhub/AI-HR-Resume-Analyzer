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
    error: "bg-red-50 text-red-800 border-red-200 shadow-red-100/50",
    warning:
      "bg-yellow-50 text-yellow-800 border-yellow-200 shadow-yellow-100/50",
    success: "bg-green-50 text-green-800 border-green-200 shadow-green-100/50",
  };

  const iconStyles = {
    error: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
  };

  const Icon = icons[type];

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-4 right-4 z-50 w-full max-w-md">
        <div className={`rounded-lg border p-4 shadow-lg ${styles[type]}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon
                className={`h-5 w-5 ${iconStyles[type]}`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 hover:bg-opacity-10 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
                  className={`h-5 w-5 ${iconStyles[type]}`}
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
