import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import search from "../../assets/images/search.png";
import calendar from "../../assets/images/calendar.png";
import plus from "../../assets/images/plus.png";
import filter from "../../assets/images/filter.png";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles

const StudentsData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const datePickerRef = useRef(null);

  const handleClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.input.focus(); // Focuses the input of the DatePicker
    }
  };

  return (
    <div className="bg-green-100 w-full m-52 rounded-xl p-10 pt-16">
      <div className="flex justify-between items-center ">
        <p className="text-5xl font-semibold">Students' Data</p>
        <div className="flex justify-center items-center bg-primary rounded-2xl text-white text-lg font-light px-6 py-3">
          <button className="">Add Student</button>
          <img src={plus} alt="plus" className="w-5 ml-5" />
        </div>
      </div>
      <div className="flex justify-start items-center py-10">
        <div className="flex justify-center items-center">
          <img src={filter} alt="Search icon" className=" w-6 mr-3" />
          <p className="text-primary text-2xl">Filter By:</p>
        </div>
        <div className="relative w-1/3 max-w-sm">
          <img
            src={search}
            alt="Search icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            id="username"
            type="text"
            placeholder="Search by first name, last name"
            className="w-96 py-3 rounded-xl text-left mx-5 px-5 pr-16 ring-1 ring-gray-300 focus:ring-black text-xl"
          />
        </div>
        <div
          className="bg-white py-2 rounded-xl mx-10 px-5 ring-1 ring-gray-300 focus:ring-black text-xl cursor-pointer select-none"
          onClick={handleClick}
        >
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-700">Equal to</span>
              <span className="text-black font-black">˅</span>
            </div>
            <div className="h-9 w-0.5 bg-gray-500 opacity-20 ml-4 mr-2" />
            <div className="relative w-36">
              <DatePicker
                ref={datePickerRef}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/d/yyyy"
                className="w-full border-transparent rounded-md text-gray-600 focus:outline-none "
                placeholderText="Select a date"
              />
              <img
                src={calendar}
                alt="Calendar icon"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-7"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-[#9999995E]" />

      <div className="flex justify-center items-center bg-primary rounded-lg py-5 mt-5 w-full text-white text-2xl">
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
        <p>First Name</p>
      </div>
    </div>
  );
};

export default StudentsData;
