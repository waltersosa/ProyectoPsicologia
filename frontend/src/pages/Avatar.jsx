import React from "react";

const Avatar = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Crear mi avatar
      </h1>
      <iframe
        src="/src/public/unity/index.html"
        className="w-full h-[500px] border rounded-md shadow-lg"
        frameBorder="0"
        title="Unity Web Player"
      ></iframe>
    </div>
  );
};

export default Avatar;
