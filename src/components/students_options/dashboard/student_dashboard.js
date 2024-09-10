import React, { useState, useEffect } from "react";
import axios from "axios";
import UpperDashboard from "./widget/upper_dashboard";
import TableDashboard from "./widget/table_dashboard";
import spin from "../../../assets/images/loading.png";
import "react-datepicker/dist/react-datepicker.css";
import { getCookie } from "../../../utils/cookieUtils";
import { useTranslation } from "react-i18next";

const StudentsData = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [birthDateFilter, setBirthDateFilter] = useState(null);
  const [dateComparison, setDateComparison] = useState("Equal_to");

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
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        // setLoading(false);
      }
    };

    if (lang) {
      i18n.changeLanguage(lang);
    }
    fetchData();
  }, [lang, i18n]);

  // if (loading)
  //   return (
  //     <div className="flex items-center justify-center mx-auto">
  //       <img src={spin} alt={spin} className="w-14 h-14 animate-spin" />
  //     </div>
  //   );
  // if (error) return <p>{error}</p>;

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
    <div className="w-full">
      <div className="bg-darkColor rounded-xl mx-8 p-20 px-32 drop-shadow-md">
        {/* UpperDashboard ==========================================*/}
        <UpperDashboard />
        <div className="bg-gray-200 h-0.5 rounded-full mb-6" />
        {/* TableDashboard ==========================================*/}
        <TableDashboard />
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
    </div>
  );
};

export default StudentsData;
