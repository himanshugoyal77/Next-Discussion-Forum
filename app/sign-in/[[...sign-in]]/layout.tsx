import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-start justify-start bg-yellow-200">
      {children}
    </div>
  );
};

export default layout;
