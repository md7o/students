import React, { useState } from "react";

interface DropDownButtonProps {
  onLanguageChange: (language: string) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (language: string, label: string) => {
    setSelectedLanguage(label);
    setIsOpen(false);
    onLanguageChange(language);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-white xl:text-lg text-md min-w-28 px-6 py-2 bg-primary rounded-lg"
      >
        {selectedLanguage} ˅
      </button>
      {isOpen && (
        <div className="group absolute xl:min-w-[118px] min-w-[110px] mt-2 bg-white rounded-md  z-50">
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer relative"
            onClick={() => handleOptionClick("en", "English")}
          >
            English
          </p>
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer relative"
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
