import AppBar from "../../components/students_table_part/appbar";
import StudentsData from "../../components/students_table_part/studentData";
import SideBar from "../../components/students_table_part/sideBar";
import React, { useState } from "react";

const StudentsTable = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  const handleLanguageChange = (lang) => {
    setLanguage(lang); // Update the language state
  };
  return (
    <div className="bg-[#F3F6F9]">
      <AppBar onLanguageChange={handleLanguageChange} />
      <div className="flex justify-between">
        <SideBar />
        <StudentsData lang={language} />
      </div>
    </div>
  );
};

export default StudentsTable;
