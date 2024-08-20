import React, { useState } from "react";

const DropDownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="m-5">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 ring-1 ring-black rounded-md shadow-md hover:bg-gray-200 "
      >
        {selectedValue} ˅
      </button>
      {isOpen && (
        <div className="flex flex-col absolute bg-white border border-gray-200 rounded-md shadow-lg">
          <p
            className=" px-4 py-2 text-gray-700 hover:bg-gray-200"
            role="menuitem"
            onClick={() => handleOptionClick("English")}
          >
            English
          </p>
          <p
            className=" px-4 py-2 text-gray-700 hover:bg-gray-200"
            role="menuitem"
            onClick={() => handleOptionClick("Arabic")}
          >
            Arabic
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
