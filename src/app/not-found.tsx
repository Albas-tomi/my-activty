import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-screen">
      <Image
        src="/images/404.png"
        className="w-[450px] pt-4"
        alt="404"
        width={300}
        height={300}
      />
    </div>
  );
};

export default NotFoundPage;
