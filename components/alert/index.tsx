import React, { ReactEventHandler, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type AlertProps = {
  children: ReactNode;
  visible?: boolean;
  type?: "success" | "error";
  onDismiss?: ReactEventHandler;
};

const Alert = ({ children, type, visible, onDismiss }: AlertProps) => {
  let commonStyles =
    "fixed p-4 m-4 max-w-sm text-sm rounded-lg shadow font-medium right-0 transition-all flex items-center gap-2 ";
  commonStyles += visible ? "top-0" : "-top-44";

  switch (type) {
    case "success":
      return (
        <div className={commonStyles + " text-green-800  bg-green-50"}>
          {children}
          <button
            className="w-8 h-8 p-1.5 rounded-full hover:bg-green-100"
            onClick={onDismiss}
          >
            <XMarkIcon />
          </button>
        </div>
      );
    case "error":
      return (
        <div className={commonStyles + " text-red-800 bg-red-50"}>
          {children}
          <button
            className="w-8 h-8 p-1.5 rounded-full hover:bg-red-100"
            onClick={onDismiss}
          >
            <XMarkIcon />
          </button>
        </div>
      );
    default:
      return (
        <div className={commonStyles + " text-purple-800 bg-purple-50"}>
          {children}
          <button
            className="w-8 h-8 p-1.5 rounded-full hover:bg-purple-100"
            onClick={onDismiss}
          >
            <XMarkIcon />
          </button>
        </div>
      );
  }
};

export default Alert;
