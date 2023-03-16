import React, { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
