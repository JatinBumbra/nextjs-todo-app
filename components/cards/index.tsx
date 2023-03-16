import React, { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
      {children}
    </div>
  );
};

export default Card;
