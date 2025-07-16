import React from "react";

const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
      <div
        className="absolute top-60 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-ping"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default BackgroundElements;
