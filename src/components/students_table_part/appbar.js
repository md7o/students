import DropDownButton from "../../components/widget/dropDownButton";
import metro from "../../assets/images/metro.jpg";
import React from "react";

const AppBar = ({ onLanguageChange }) => {
  return (
    <div className="w-full sticky inset-0 z-50 bg-white">
      <div className="flex justify-between items-center">
        <p className="text-3xl p-4 font-bold">Logo</p>
        <div className="flex justify-center items-center px-10">
          <p className="text-lg">William Jacobson</p>
          <img
            src={metro}
            alt="Profile"
            className=" w-10 h-10 object-cover rounded-xl mx-3"
          />
          <DropDownButton onLanguageChange={onLanguageChange} />
        </div>
      </div>
      <div className="h-hightLine w-full bg-shadowLine" />
    </div>
  );
};

export default AppBar;
