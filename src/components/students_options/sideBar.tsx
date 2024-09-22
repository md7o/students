import React, { useState } from "react";
import MenuButton from "../../components/widget/menu_button";
import dashboardIcon from "../../assets/images/dashboard.png";
import event from "../../assets/images/event.png";
import openBook from "../../assets/images/open-book.png";
import metro from "../../assets/images/metro.jpg";
import logout from "../../assets/images/logout.png";
import LogoutModal from "../modal/logout_modal";
import "../../App.css";

interface SideBarProps {
  showSideBar: boolean;
  setActiveComponent: (component: string) => void;
  toggleSidebar: () => void;
}
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

const SideBar: React.FC<SideBarProps> = ({
  showSideBar,
  setActiveComponent,
  toggleSidebar,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // const [closeSideBar, setCloseSideBar] = useState(true);

  const handleLogout = () => {
    console.log("User has logged out");
    setShowLogoutModal(false);
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // const handleSideBarShow = () => {
  //   setCloseSideBar(true);
  // };

  return (
    <div>
      {/* <MenuButton onClick={handleSideBarShow} /> */}
      <div
        className={`xl:relative fixed top-0 left-0 transform ${
          showSideBar ? "translate-x-0" : "xl:translate-x-0 -translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="h-screen flex flex-col justify-between sm:m-3 m-0 bg-darkColor rounded-xl">
          <div className="mx-5">
            <div className="flex justify-between items-center">
              <p className="text-4xl text-white font-bold mb-10 mt-5">
                App Logo
              </p>
              <button
                onClick={toggleSidebar}
                className="xl:hidden block text-2xl text-white font-bold mb-10 mt-5"
              >
                X
              </button>
            </div>
            {/* Account */}
            <div className="my-5">
              <button className="group flex justify-start items-center w-72 shadow-md shadow-shadowBlock bg-background rounded-lg p-4 hover:scale-95 duration-500">
                <img
                  src={metro}
                  alt="metro"
                  className="w-14 h-14 object-cover rounded-xl mr-3"
                />
                <div className="flex flex-col items-start">
                  <p className="text-xl text-white ">Mohammed Ayman</p>
                  <p className="text-md text-white opacity-40">Admin</p>
                </div>
              </button>
            </div>
            {/* Option categories */}
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
            {/* Other categories */}
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
    </div>
  );
};

export default SideBar;
