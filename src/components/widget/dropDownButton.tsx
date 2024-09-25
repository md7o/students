import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropDownButtonProps {
  onLanguageChange: (language: string) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (language: string, label: string) => {
    setSelectedLanguage(label);
    setIsOpen(false);
    setIsLoading(true);
    if (!isLoading) {
      setIsLoading(true);
    }
    setTimeout(() => {
      onLanguageChange(language);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* ========= Show loading <3======== */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="text-white xl:text-lg text-md min-w-28 px-4 py-2 bg-primary rounded-lg flex justify-center items-center gap-2">
        <button onClick={toggleDropdown}>{selectedLanguage}</button>

        <IoIosArrowDown />
      </div>

      {!isLoading && isOpen && (
        <div className="group absolute xl:min-w-[118px] min-w-[110px] mt-2 bg-white rounded-md z-50 shadow-md">
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
            onClick={() => handleOptionClick("en", "English")}
          >
            English
          </p>
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
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
