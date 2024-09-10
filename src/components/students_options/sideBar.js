import React, { useState } from "react";
import dashboardIcon from "../../assets/images/dashboard.png";
import event from "../../assets/images/event.png";
import openBook from "../../assets/images/open-book.png";
import logout from "../../assets/images/logout.png";
import LogoutModal from "../modal/logout_modal";
import "../../App.css";

const optionsButton = [
  {
    icon: dashboardIcon,
    name: "Dashboard",
    active: "students",
  },
  {
    icon: event,
    name: "Event",
    active: "events",
  },
  {
    icon: openBook,
    name: "Courses",
    active: "courses",
  },
];

const SideBar = ({ setActiveComponent }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log("User has logged out");
    setShowLogoutModal(false);
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <div>
      <div className="h-screen flex flex-col justify-between m-5 bg-darkColor rounded-xl">
        <div className="mx-5">
          <p className="text-2xl text-white font-bold my-5">Options</p>
          {optionsButton.map((items, index) => (
            <div key={index} className="my-5">
              <button
                onClick={() => setActiveComponent(items.active)}
                className="group flex justify-start items-center  w-72 bg-background rounded-lg p-4 hover:bg-primary shadowing duration-200"
              >
                <img
                  src={items.icon}
                  alt="Logout"
                  className="w-6 opacity-40 group-hover:opacity-100"
                />
                <p className="text-xl text-white opacity-40 group-hover:opacity-100 px-6">
                  {items.name}
                </p>
              </button>
            </div>
          ))}
          <p className="text-2xl text-white font-bold my-5 pt-5">Others</p>
          <div className="my-5">
            <button
              onClick={handleLogoutClick}
              className="group flex justify-start items-center  w-72 bg-background rounded-lg p-4 hover:bg-primary shadowing duration-200"
            >
              <img
                src={logout}
                alt="Logout"
                className="w-6 opacity-40 group-hover:opacity-100"
              />
              <p className="text-xl text-white opacity-40 group-hover:opacity-100 px-6">
                Logout
              </p>
            </button>
          </div>
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
  );
};

export default SideBar;
