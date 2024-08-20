import React, { useState } from "react";

const DropDownButton = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (language, label) => {
    setSelectedLanguage(label);
    setIsOpen(false);
    onLanguageChange(language); // Notify parent component about the language change
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-1 ring-1 ring-black rounded-lg shadow-md hover:bg-gray-200"
      >
        {selectedLanguage} ˅
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg">
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer relative"
            onClick={() => handleOptionClick("en", "English")}
          >
            English
          </p>
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer relative"
            onClick={() => handleOptionClick("ar", "Arabic")}
          >
            Arabic
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
