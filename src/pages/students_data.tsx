import StudentsData from "../components/students_options/dashboard/student_dashboard";
import EventAppointments from "../components/students_options/event/event_appointments";
import GeneralCourses from "../components/students_options/courses/general_courses";
import SideBar from "../components/students_options/sideBar";
import AppBar from "../components/students_options/appbar";
import LogoutModal from "../components/modal/logout_modal";
import React, { useState } from "react";

const StudentsTable = () => {
  const [language, setLanguage] = useState<string>("en");
  const [activeComponent, setActiveComponent] = useState<string>("students");
  const [showSideBar, setShowSideBar] = useState<boolean>(false); // State to control sidebar
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleShowModal = () => {
    setShowLogoutModal(true);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleSideBarShow = () => {
    setShowSideBar((prevState) => !prevState);
  };

  return (
    <div className="bg-background">
      <div className="flex justify-between">
        {/* Pass showSideBar and handleSideBarShow */}
        <SideBar
          setActiveComponent={setActiveComponent}
          showSideBar={showSideBar}
          toggleSidebar={handleSideBarShow}
          onLogoutClick={handleShowModal}
        />
        <div className="w-full justify-between items-start">
          {/* Pass handleSideBarShow to AppBar */}
          <AppBar
            onLanguageChange={handleLanguageChange}
            currentPage={activeComponent}
            toggleSidebar={handleSideBarShow} // Pass the function
          />
          <div>
            {activeComponent === "students" && <StudentsData lang={language} />}
            {activeComponent === "events" && <EventAppointments />}
            {activeComponent === "courses" && <GeneralCourses />}
          </div>
        </div>
        {showLogoutModal && (
          <LogoutModal
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            message="Are you sure you want to log out of your account?"
          />
        )}
      </div>
    </div>
  );
};

export default StudentsTable;
