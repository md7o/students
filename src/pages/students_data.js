import StudentsData from "../components/students_options/dashboard/student_dashboard";
import EventAppointments from "../components/students_options/event/event_appointments";
import SideBar from "../components/students_options/sideBar";
import AppBar from "../components/students_options/appbar";
import React, { useState } from "react";

const StudentsTable = () => {
  const [language, setLanguage] = useState("en");
  const [activeComponent, setActiveComponent] = useState("students");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  return (
    <div className="bg-background">
      <div className="flex justify-between  ">
        <SideBar setActiveComponent={setActiveComponent} />
        <div className="w-full justify-between items-start">
          <AppBar
            onLanguageChange={handleLanguageChange}
            currentPage={activeComponent}
          />
          <div className="">
            {activeComponent === "students" && <StudentsData lang={language} />}
            {activeComponent === "events" && <EventAppointments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
