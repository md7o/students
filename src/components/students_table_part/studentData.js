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

  const data = [
    { firstName: 'John', lastName: 'Doe', dob: '01/01/1990', eduLevel: "Bachelor's", gender: 'Male', country: 'USA', city: 'New York', mobileNumber: '123-456-7890', notes: 'Notes about John' },
    { firstName: 'John', lastName: 'Doe', dob: '01/01/1990', eduLevel: "Bachelor's", gender: 'Male', country: 'USA', city: 'New York', mobileNumber: '123-456-7890', notes: 'Notes about John' },
    // Add more rows as needed
  ];

  return (
    <div className="bg-white w-full m-20 rounded-xl p-10 pt-16">
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

      <div className="flex justify-center items-center gap-12 py-5 mt-5 w-full text-white text-sm">
      <table className="min-w-full rounded-2xl">
    
        <thead className="bg-primary ">
        <tr >
          <th className="py-2 px-4 border-b">First Name</th>
          <th className="py-2 px-4 border-b">Last Name</th>
          <th className="py-2 px-4 border-b">Date of Birth</th>
          <th className="py-2 px-4 border-b">Educational level</th>
          <th className="py-2 px-4 border-b">Gender</th>
          <th className="py-2 px-4 border-b">Country</th>
          <th className="py-2 px-4 border-b">City</th>
          <th className="py-2 px-4 border-b">Mobile Number</th>
          <th className="py-2 px-4 border-b">Notes</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      {data.map((row, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#EEF5F9' }}
            className="text-black"
          >
            <td className="py-2 px-4 border-b">{row.firstName}</td>
            <td className="py-2 px-4 border-b">{row.lastName}</td>
            <td className="py-2 px-4 border-b">{row.dob}</td>
            <td className="py-2 px-4 border-b">{row.eduLevel}</td>
            <td className="py-2 px-4 border-b">{row.gender}</td>
            <td className="py-2 px-4 border-b">{row.country}</td>
            <td className="py-2 px-4 border-b">{row.city}</td>
            <td className="py-2 px-4 border-b">{row.mobileNumber}</td>
            <td className="py-2 px-4 border-b">{row.notes}</td>
            <td className="py-2 px-4 border-b">
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500 ml-2">Delete</button>
            </td>
          </tr>
        ))}
    </table>
      </div>
    </div>
  );
};

export default StudentsData;
