import StudentsData from "../../components/students_options/dashboard/student_dashboard";
import SideBar from "../../components/students_options/sideBar";
import React, { useState } from "react";

const StudentsTable = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  const handleLanguageChange = (lang) => {
    setLanguage(lang); // Update the language state
  };
  return (
    <div className="bg-background">
      {/* <AppBar onLanguageChange={handleLanguageChange} /> */}
      <div className="flex justify-between">
        <SideBar />
        <StudentsData lang={language} />
      </div>
    </div>
  );
};

export default StudentsTable;
