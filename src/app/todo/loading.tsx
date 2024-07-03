import React from "react";

const LoadingProduct = () => {
  return (
    <div className="px-4">
      <div className="flex w-64 h-80 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

export default LoadingProduct;
