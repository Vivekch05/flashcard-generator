import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case "info":
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      default:
        return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${getStyles()} border rounded-xl p-4 shadow-lg backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Close notification"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
