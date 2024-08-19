import React, { useState } from "react";

const DropDownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="m-5">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 ring-1 ring-black rounded-md shadow-md hover:bg-gray-200 w-1/6"
      >
        English ^
      </button>
      {isOpen && (
        <div className="flex flex-col w-1/6 bg-white border border-gray-200 rounded-md shadow-lg">
          <p className=" px-4 py-2 text-gray-700 hover:bg-gray-200">English</p>
          <p className=" px-4 py-2 text-gray-700 hover:bg-gray-200">Arabic</p>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
