import React from "react";
import MenuButton from "../../components/widget/menu_button";
import DropDownButton from "../widget/dropDownButton";
import profile from "../../assets/images/metro.jpg";

interface AppBarProps {
  onLanguageChange: (language: string) => void;
  currentPage: string;
  toggleSidebar: () => void; // Accept the toggle function
}

const AppBar: React.FC<AppBarProps> = ({
  onLanguageChange,
  currentPage,
  toggleSidebar,
}) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case "students":
        return "Students Dashboard";
      case "events":
        return "Events";
      default:
        return "Courses";
    }
  };

  return (
    <div className="my-3 mb-14">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          <MenuButton onClick={toggleSidebar} />
          <p className="text-3xl p-4 mx-2 font-bold text-white">
            {getPageTitle()}
          </p>
        </div>
        <div className="flex justify-center items-center px-10">
          <p className="text-lg text-white font-bold">Aleksandar Mitrović</p>
          <img
            src={profile}
            alt="Profile"
            className=" w-10 h-10 object-cover rounded-xl mx-3"
          />
          <DropDownButton onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
