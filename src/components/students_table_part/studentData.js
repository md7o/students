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
import spin from "../../assets/images/loading.png";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../../components/modal/delete_modal";
import { getCookie } from "../../cookieUtils";

import { useTranslation } from "react-i18next";

const StudentsData = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [birthDateFilter, setBirthDateFilter] = useState(null);
  const [dateComparison, setDateComparison] = useState("Equal_to");

  const datePickerRef = useRef(null);

  const handleOpenModalForAdd = () => {
    setStudentDataToEdit(null);
    setShowModal(true);
  };
  const handleOpenModalForEdit = (studentData) => {
    setStudentDataToEdit(studentData);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setStudentDataToEdit(null);
  };

  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    handleDeleteStudent(studentIdToDelete);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const searchName = (e) => {
    setIsSearch(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.birthDate);
    const filterDate = new Date(birthDateFilter);

    const matchesName =
      item.firstName.toLowerCase().includes(isSearch.toLowerCase()) ||
      item.lastName.toLowerCase().includes(isSearch.toLowerCase());

    const matchesBirthDate = birthDateFilter
      ? {
          Equal_to: itemDate.toDateString() === filterDate.toDateString(),
          Greater_than: itemDate > filterDate,
          Less_than: itemDate < filterDate,
        }[dateComparison] // dateComparison should be the value of your select dropdown
      : true;

    return matchesName && matchesBirthDate;
  });

  const handleComparisonChange = (e) => {
    setDateComparison(e.target.value);
  };

  const addStudent = async (studentData) => {
    const token = getCookie("authToken");

    try {
      await axios.post(
        "https://taxiapp.easybooks.me:8283/Student/Add",
        {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          birthDate: studentData.birthDate,
          grade: studentData.grade,
          gender: studentData.gender,
          country: studentData.country,
          city: studentData.city,
          phone: studentData.phone,
          remarks: studentData.remarks,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("authToken");

      try {
        const response = await axios.get(
          "https://taxiapp.easybooks.me:8283/Student/GetAll",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
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

    if (lang) {
      i18n.changeLanguage(lang);
    }
    fetchData();
  }, [lang, i18n]);

  const handleEditStudent = async (updatedStudentData) => {
    const token = getCookie("authToken");

    try {
      await axios.put(
        "https://taxiapp.easybooks.me:8283/Student/Edit",
        {
          firstName: updatedStudentData.firstName,
          lastName: updatedStudentData.lastName,
          birthDate: updatedStudentData.birthDate,
          grade: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          gender: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          country: updatedStudentData.country,
          city: updatedStudentData.city,
          phone: updatedStudentData.phone,
          remarks: updatedStudentData.remarks,
          id: updatedStudentData.id,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          params: {
            Id: updatedStudentData.id,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    const url = "https://taxiapp.easybooks.me:8283/Student/Remove";
    const token = getCookie("authToken");

    try {
      await axios.delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          Id: id,
        },
      });

      setData((prevData) => prevData.filter((student) => student.id !== id));
    } catch (error) {
      console.error(
        "Error deleting student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}/${formattedDay}/${formattedMonth}`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center mx-auto">
        <img src={spin} alt={spin} className="w-14 h-14 animate-spin" />
      </div>
    );
  if (error) return <p>{error}</p>;

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = filteredData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white lg:w-full lg:m-10 m-5 rounded-xl lg:p-10 p-5 ring-2 ring-[#7777771A] drop-shadow-md">
      <div
        className={`mb-6 ${
          lang === "en"
            ? "flex justify-between items-center"
            : "flex flex-row-reverse justify-between items-center"
        }`}
      >
        <p className="text-3xl font-semibold">{t("Students_Data")}</p>
        <div>
          <button
            className="flex justify-center items-center bg-primary rounded-2xl text-white text-lg font-light px-6 py-3 hover:bg-hovprimary cursor-pointer"
            onClick={handleOpenModalForAdd}
          >
            {t("Add_Student")}
            <img src={plus} alt="plus" className="w-5 ml-3" />
          </button>

          <DeleteModal
            show={showDeleteModal}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            // message="Are you sure you want to delete this student?"
          />

          <AddStudents
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            onAddStudent={addStudent}
            editStudent={handleEditStudent}
            studentDataToEdit={studentDataToEdit}
          />
        </div>
      </div>
      <div
        className={`mb-6 space-x-6 ${
          lang === "en"
            ? "flex = items-center"
            : "flex flex-row-reverse items-center"
        }`}
      >
        <div
          className={`${
            lang === "en"
              ? "flex items-center space-x-3"
              : "flex flex-row-reverse items-center space-x-3"
          }`}
        >
          <img src={filter} alt="Filter icon" className="w-6 ml-2" />
          <p className="text-primary text-xl">{t("Filter_By")}</p>
        </div>
        <div className="relative flex-grow max-w-sm">
          <img
            src={search}
            alt="Search icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5"
          />

          <input
            type="text"
            value={isSearch}
            onChange={searchName}
            placeholder={t("search_place_holder")}
            className="w-full py-3 rounded-xl pl-10 pr-16 ring-1 ring-gray-300 focus:ring-black text-xl"
          />
        </div>
        <div className="relative bg-white py-2 px-4 rounded-xl ring-1 ring-gray-300 cursor-pointer select-none">
          <div className="flex items-center">
            <select
              name="dateComparison"
              value={dateComparison}
              onChange={handleComparisonChange}
              className=" outline-none text-lg text-gray-700 mr-2"
            >
              <option value="Equal_to">{t("Equal_to")}</option>
              <option value="Greater_than">{t("Greater_than")}</option>
              <option value="Less_than">{t("Less_than")}</option>
            </select>

            <div className="h-8 w-0.5 bg-gray-500 opacity-20 mx-4" />
            <div className="relative w-36">
              <DatePicker
                ref={datePickerRef}
                selected={startDate}
                onChange={(date) => {
                  setBirthDateFilter(date);
                  setStartDate(date);
                }}
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
      <div className="overflow-x-auto ">
        <div className="bg-gray-100 ">
          <div
            className={`bg-blue-500 text-white py-5 mb-5 rounded-lg ${
              lang === "en"
                ? "flex justify-center items-center"
                : "flex flex-row-reverse justify-center items-center"
            }`}
          >
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("First_Name")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Last_Name")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Date_of_Birth")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Edu_Level")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Gender")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Country")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("City")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Phone")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Notes")}
            </div>
            <div className="flex-1 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              {t("Actions")}
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200 ">
            {currentStudents.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg text-lg ${
                  data.indexOf(item) % 2 === 0 ? "bg-white" : "bg-gray-300"
                } ${lang === "en" ? "flex" : "flex flex-row-reverse"}`}
              >
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.firstName || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.lastName || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.birthDate ? formatDate(item.birthDate) : "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.grade?.translations?.[0]?.name || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.gender?.translations?.[0]?.name || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.country || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.city || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.phone || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  {item.remarks || "N/A"}
                </div>
                <div className="flex-1 px-6 py-4 text-gray-900">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      <img src={bin} alt="delete" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        handleOpenModalForEdit(item);
                      }}
                    >
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
      <div
        className={` ${
          lang === "en"
            ? "flex justify-between items-center"
            : "flex flex-row-reverse justify-between items-center"
        }`}
      >
        <div
          className={` ${
            lang === "en"
              ? "flex items-center"
              : "flex flex-row-reverse items-center"
          }`}
        >
          <label
            htmlFor="rowsPerPage"
            className="text-lg text-gray-700 mr-2 font-medium opacity-60"
          >
            {t("Rows_Per_Page")}
          </label>
          <select
            name="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="ring-2 px-5 py-1 ring-gray-400 rounded-lg mx-2 text-lg text-gray-700"
          >
            <option value={25}>25</option>
            <option value={15}>15</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className="">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300"
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredData.length / rowsPerPage)
            }
            className="px-4 py-2 mx-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsData;
