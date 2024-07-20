import React from "react";

const OrSpacer = () => {
  return (
    <div className="relative w-full flex items-center">
      <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
      <span className="flex-shrink mx-4 text-gray-400">or</span>
      <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
    </div>
  );
};

export default OrSpacer;
