import DropDownButton from "../../widget/dropDownButton";
import profile from "../../../assets/images/metro.jpg";
import React from "react";

const AppBar = ({ onLanguageChange }) => {
  return (
    <div className="my-2.5">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          <div className="group  w-8 h-7 flex flex-col justify-between items-start">
            <span className="bg-white w-full group-hover:w-5 h-1 duration-300 rounded-full" />
            <span className="bg-white w-5 h-1 group-hover:w-full duration-300 rounded-full"></span>
            <span className="bg-white w-full group-hover:w-6 h-1 duration-300 rounded-full"></span>
          </div>
          <p className="text-3xl p-4 mx-2 font-bold text-white">Dashboard</p>
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
