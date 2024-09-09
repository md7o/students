import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import AddStudents from "../../../modal/add_students";
import search from "../../../../assets/images/search.png";
import calendar from "../../../../assets/images/calendar.png";
import plus from "../../../../assets/images/plus.png";
import filter from "../../../../assets/images/filter.png";
import spin from "../../../../assets/images/loading.png";
import DeleteModal from "../../../modal/delete_modal";
import { useTranslation } from "react-i18next";
import { getCookie } from "../../../../utils/cookieUtils";

const UpperDashboard = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [birthDateFilter, setBirthDateFilter] = useState(null);
  const [isSearch, setIsSearch] = useState("");
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [dateComparison, setDateComparison] = useState("Equal_to");

  const datePickerRef = useRef(null);
  const handleOpenModalForAdd = () => {
    setStudentDataToEdit(null);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setStudentDataToEdit(null);
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
  const handleComparisonChange = (e) => {
    setDateComparison(e.target.value);
  };

  // { Add Student } ==================================================
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

  // { Edit Student } ==================================================
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

  // { Delete Student } ==================================================
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

  return (
    <div>
      {/* <p className="text-3xl font-semibold">{t("Students_Data")}</p> */}

      <div
        className={`mb-6 space-x-3 ${
          lang === "en"
            ? "flex flex-row-reverse items-center"
            : "flex items-center"
        }`}
      >
        <div
          className={` ${
            lang === "en"
              ? "flex justify-between items-center"
              : "flex flex-row-reverse justify-between items-center"
          }`}
        >
          <button
            className="flex justify-start items-center text-white bg-background rounded-xl px-5 py-3 hover:bg-primary shadowing duration-200"
            onClick={handleOpenModalForAdd}
          >
            <img src={plus} alt="plus" className="w-4 ml-2 mr-4" />
            {t("Add_Student")}
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

        <div className="relative">
          <img
            src={search}
            alt="Search icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6"
          />

          <input
            type="text"
            value={isSearch}
            onChange={searchName}
            placeholder={t("search_place_holder")}
            className=" py-2 rounded-xl px-5 text-xl"
          />
        </div>
        <div className="flex justify-center items-center bg-background py-2 px-2 rounded-xl shadowing hover:bg-primary duration-300">
          <img src={calendar} alt="Calendar icon" className="w-7 mx-3" />
          <DatePicker
            ref={datePickerRef}
            selected={startDate}
            onChange={(date) => {
              setBirthDateFilter(date);
              setStartDate(date);
            }}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="border-transparent  text-lg bg-transparent text-white focus:outline-none cursor-pointer w-28"
          />
        </div>
        {/* <select
                name="dateComparison"
                value={dateComparison}
                onChange={handleComparisonChange}
                className=" outline-none text-lg text-gray-700 mr-2"
              >
                <option value="Equal_to">{t("Equal_to")}</option>
                <option value="Greater_than">{t("Greater_than")}</option>
                <option value="Less_than">{t("Less_than")}</option>
              </select>
  
              <div className="h-8 w-0.5 bg-gray-500 opacity-20 mx-4" /> */}
      </div>
    </div>
  );
};

export default UpperDashboard;
