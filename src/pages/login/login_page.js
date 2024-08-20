import people from "../../assets/images/people.png";
import DropDownButton from "../../components/widget/dropDownButton";
import React, { useState } from "react";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className=" hidden flex-1 lg:flex justify-center items-center">
        <div className="flex flex-col h-screen">
          <DropDownButton />
          <div className="flex-1 flex items-center justify-center ">
            <img src={people} alt="People" className="w-2/3 mx-auto" />
          </div>
        </div>
      </div>
      <div className="flex-1.5 bg-[#2148C0] flex justify-center items-center">
        <div className="bg-white rounded-xl sm:px-24 px-5 py-20 w-full 2.5xl:max-w-6xl 2xl:max-w-3xl md:max-w-xl max-w-3xl ">
          <p className="text-black :text-6xl text-5xl font-bold mb-20 ">
            Login
          </p>
          <form>
            <div className="mb-8">
              <label
                htmlFor="username"
                className="block text-2xl text-black opacity-60"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                // value={tag.value}
                // onChange={(event) => handleTagChange(index, event)}
                className="w-full py-5 mt-5 rounded-xl text-left px-3 ring-1 ring-gray-300 focus:ring- text-3xl"
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="password"
                className="block text-2xl text-black opacity-60"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                // value={tag.value}
                // onChange={(event) => handleTagChange(index, event)}
                className="w-full py-5 mt-5 rounded-xl text-left px-3 ring-1 ring-gray-300 focus:ring- text-3xl"
              />
            </div>
            <button
              className="w-full bg-primary text-white py-5 px-4 rounded-xl text-3xl hover:bg-blue-600 transition"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
