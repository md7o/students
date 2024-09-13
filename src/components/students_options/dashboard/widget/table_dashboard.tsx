import React, { useState } from "react";
import bin from "../../../../assets/images/trash.png";
import pencil from "../../../../assets/images/pen.png";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

interface StudentsTableDataProps {
  lang: string;
}

const TableDashboard: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Student[]>([]);
  const [isSearch, setIsSearch] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
    null
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [birthDateFilter, setBirthDateFilter] = useState<Date | null>(null);
  const [dateComparison, setDateComparison] = useState<string>("Equal_to");

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.birthDate);
    const filterDate = birthDateFilter ? new Date(birthDateFilter) : null;

    const matchesName =
      item.firstName.toLowerCase().includes(isSearch.toLowerCase()) ||
      item.lastName.toLowerCase().includes(isSearch.toLowerCase());

    const matchesBirthDate = birthDateFilter
      ? filterDate &&
        {
          Equal_to: itemDate.toDateString() === filterDate.toDateString(),
          Greater_than: itemDate > filterDate,
          Less_than: itemDate < filterDate,
        }[dateComparison] // dateComparison should be the value of your select dropdown
      : true;

    return matchesName && matchesBirthDate;
  });

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

  //   const indexOfLastStudent = currentPage * rowsPerPage;
  //   const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  //   const currentStudents = filteredData.slice(
  //     indexOfFirstStudent,
  //     indexOfLastStudent
  //   );

  const handleOpenModalForEdit = (studentData: Student) => {
    setStudentDataToEdit(studentData);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setStudentIdToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <table className="w-full rounded-lg overflow-hidden">
        <thead>
          <tr
            className={`bg-background text-white py-5 mb-5 rounded-lg uppercase text-sm ${
              lang === "en"
                ? "justify-center items-center "
                : "flex-row-reverse justify-center items-center"
            }`}
          >
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Student_Name")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Date_of_Birth")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Gender")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Country")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("College_Majors")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Phone")}
            </th>
            <th className="px-6 py-3 text-left font-medium tracking-wider">
              {t("Actions")}
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 text-lg">
          {/* {currentStudents.map((item, index) => ( */}
          <tr
          //   key={item.id}
          // className={`${index % 2 === 0 ? "bg-white" : "bg-gray-300"} ${
          //   lang === "en" ? "" : "flex-row-reverse"
          // }`}
          >
            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.studentName || "N/A"} */}
              {"Mohammed Ayman"}
            </td>

            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.birth?.translations?.[0]?.name || "N/A"} */}
              {"2004/04/10"}
            </td>
            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.gender?.translations?.[0]?.name || "N/A"} */}
              {"Male"}
            </td>
            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.country || "N/A"} */}
              {"Syria"}
            </td>
            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.collegeMajors || "N/A"} */}
              {"Computer Since"}
            </td>
            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              {/* {item.phone || "N/A"} */}
              {"0551227021"}
            </td>

            <td className="px-6 py-3 whitespace-nowrap  text-gray-900">
              <div className="flex gap-3 w-16 ">
                <button
                  className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300"
                  //   onClick={() => handleDeleteClick(item.id)}
                >
                  <img src={bin} alt="delete" className="" />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300"
                  //   onClick={() => handleOpenModalForEdit(item)}
                >
                  <img src={pencil} alt="edit" />
                </button>
              </div>
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default TableDashboard;
