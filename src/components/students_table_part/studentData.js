import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import AddStudents from "../../components/modal/add_students";
import search from "../../assets/images/search.png";
import calendar from "../../assets/images/calendar.png";
import plus from "../../assets/images/plus.png";
import filter from "../../assets/images/filter.png";
import bin from "../../assets/images/bin.png";
import pencil from "../../assets/images/pencil.png";
import "react-datepicker/dist/react-datepicker.css";

const StudentsData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eduLevel, setEduLevel] = useState("equal-to");
  const datePickerRef = useRef(null);

  // const handleClick = () => {
  //   if (datePickerRef.current) {
  //     datePickerRef.current.input.focus(); // Focuses the input of the DatePicker
  //   }
  // };

  const handleChange = (e) => {
    setEduLevel(e.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const addStudent = async (studentData) => {
  //   try {
  //     const response = await axios.post(
  //       "https://taxiapp.easybooks.me:8283/Student/Add",
  //       studentData,
  //       {
  //         headers: {
  //           accept: "*/*",
  //           Authorization:
  //             "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6IjAxZGVkY2IyLWY0OWYtNDRhOS05MTNhLWJiMDYwNjVkZTNkMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDQwNzU1OX0.wChBmdrnNoNy7IISOv_RyvHYB4gG4W68_eQ6E7ejy7Q",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Student added successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error adding student:", error);
  //   }
  // };

  const addStudent = async (studentData) => {
    console.log(studentData);
    try {
      const response = await axios.post(
        "https://taxiapp.easybooks.me:8283/Student/Add",
        {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          birthDate: studentData.birthDate,
          grade: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          gender: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          country: studentData.country,
          city: studentData.city,
          phone: studentData.phone,
          remarks: studentData.remarks,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization:
              "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6ImIyZGEzMzllLTRjNjEtNDRiYS1hNzUzLTYzZDAwMjQ1M2RlNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDQxMzE1NH0.nHYJRhBF0Puc2iEMIanhZFdTntdIN8zXRkyorg_hpnQ",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Student added successfully:", response.data);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://taxiapp.easybooks.me:8283/Student/GetAll",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6IjQ2OGMzNWU2LWUzMGUtNGExNi1iZWI5LWFhYTlmYzE5OWFmNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDM2NDk5OX0.lUsu_jYOWtIMWmZK6knsqjjigdhtkgh-jAj8iJxgrvs",
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteStudent = async (id) => {
    const url = "https://taxiapp.easybooks.me:8283/Student/Remove";
    const token =
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQxYTlmYjdkLTM5MzctNDRmNi0xMzVhLTA4ZGNhY2FjMjNkYyIsImp0aSI6ImIyZGEzMzllLTRjNjEtNDRiYS1hNzUzLTYzZDAwMjQ1M2RlNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJzdWIiOiJ1c2VybmFtZTAyMSIsImV4cCI6MTcyNDQxMzE1NH0.nHYJRhBF0Puc2iEMIanhZFdTntdIN8zXRkyorg_hpnQ";

    console.log("Sending DELETE request to:", url);

    try {
      const response = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          Id: id,
        },
      });

      console.log("Student deleted successfully", response.data);
      // Update state or handle success
    } catch (error) {
      console.error(
        "Error deleting student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white w-full m-10 rounded-xl p-10 ring-2 ring-[#7777771A] drop-shadow-md">
      <div className="flex justify-between items-center mb-6">
        <p className="text-3xl font-semibold">Students' Data</p>
        <div className="flex items-center bg-primary rounded-2xl text-white text-lg font-light px-6 py-3">
          <button onClick={handleOpenModal}>Add Student</button>
          <AddStudents
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            onAddStudent={addStudent}
          />
          <img src={plus} alt="plus" className="w-5 ml-3" />
        </div>
      </div>

      <div className="flex items-center mb-6 space-x-6">
        <div className="flex items-center space-x-3">
          <img src={filter} alt="Filter icon" className="w-6" />
          <p className="text-primary text-xl">Filter By:</p>
        </div>
        <div className="relative flex-grow max-w-sm">
          <img
            src={search}
            alt="Search icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            placeholder="Search by first name, last name"
            className="w-full py-3 rounded-xl pl-10 pr-16 ring-1 ring-gray-300 focus:ring-black text-xl"
          />
        </div>
        <div
          className="relative bg-white py-2 px-4 rounded-xl ring-1 ring-gray-300 cursor-pointer select-none"
          // onClick={handleClick}
        >
          <div className="flex items-center">
            {/* <span className="text-lg text-gray-700 mr-2">Equal to</span> */}
            <select
              name="eduLevel"
              value={eduLevel}
              onChange={handleChange}
              className=" outline-none text-lg text-gray-700 mr-2"
            >
              <option value="equal-to">Equal to</option>
              <option value="high-school">Greater than</option>
              <option value="bachelors">Less than</option>
            </select>

            <div className="h-8 w-0.5 bg-gray-500 opacity-20 mx-4" />
            <div className="relative w-36">
              <DatePicker
                ref={datePickerRef}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full border-transparent rounded-sm text-gray-600 focus:outline-none cursor-pointer"
                placeholderText="Select a date"
              />
              <img
                src={calendar}
                alt="Calendar icon"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-7 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 h-1 mb-6" />

      <div className="overflow-x-auto">
        <div className="bg-gray-100">
          <div className="bg-blue-500 text-white flex justify-center items-center py-5 mb-5 rounded-lg">
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              First Name
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Last Name
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Date of Birth
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Educational Level
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Gender
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Country
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              City
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Mobile Number
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Notes
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Actions
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <div
                key={item.id}
                className={`flex rounded-lg ${
                  data.indexOf(item) % 2 === 0 ? "bg-white" : "bg-gray-300"
                }`}
              >
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.firstName || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.lastName || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.birthDate
                    ? new Date(item.birthDate).toISOString()
                    : "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.grade?.translations?.[0]?.name || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.gender?.translations?.[0]?.name || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.country || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.city || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.phone || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  {item.remarks || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-sm text-gray-900">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        handleDeleteStudent(item.id);
                      }}
                    >
                      <img src={bin} alt="delete" />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700">
                      <img src={pencil} alt="edit" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-1 my-6" />
      <div>
        <p className="text-xl opacity-65">Rows per page:</p>
      </div>
    </div>
  );
};

export default StudentsData;
