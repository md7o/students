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

const TableDashboard: React.FC<StudentsTableDataProps> = ({ lang, }) => {
  const { t, i18n } = useTranslation();
  
  const tableHeaders = [
    t("Student_Name"),
    t("Date_of_Birth"),
    t("Gender"),
    t("Country"),
    t("College_Majors"),
    t("Phone"),
    t("Actions"),
  ];
  const tableRows = [
    {
      studentName: "Mohammed Ayman",
      dob: "2004/04/10",
      gender: "Male",
      country: "Syria",
      collegeMajors: "Computer Science",
      phone: "0551227021",
    },
    {
      studentName: "Jane Doe",
      dob: "1995/12/01",
      gender: "Female",
      country: "USA",
      collegeMajors: "Mathematics",
      phone: "9876543210",
    },
  ];
  
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
      <div className="lg:block hidden ">
      <table className="w-full rounded-lg overflow-hidden ">
      <thead >
        <tr
          className={`bg-background text-white py-5 mb-5 rounded-lg uppercase text-xs ${
            lang === "en"
              ? "justify-center items-center"
              : "flex-row-reverse justify-center items-center"
          }`}
        >
          {tableHeaders.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left font-medium tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200 text-md">
        {tableRows.map((row, index) => (
          <tr key={index}>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.studentName}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.dob}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.gender}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.country}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.collegeMajors}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              {row.phone}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">
              <div className="flex gap-3 w-16">
                <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
                  <img src={bin} alt="delete" className="" />
                </button>
                <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
                  <img src={pencil} alt="edit" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
      
    
  <div className="  bg-white rounded-lg flex justify-between items-center">
    <div className="space-y-2 p-4">
    {tableHeaders.map((header,index) => (
        <p key={index} className="font-bold text-gray-800">{header}:</p>
      ))}
      </div>
    
    
    {tableRows.map((row, index) => (
      <div key={index} className="bg-white p-4 rounded-lg space-y-2">
        <div className="flex justify-between">

          <p className="text-gray-600">{row.studentName}</p>
        </div>
        <div className="flex justify-between mt-2">

          <p className="text-gray-600">{row.dob}</p>
        </div>
        <div className="flex justify-between mt-2">

          <p className="text-gray-600">{row.gender}</p>
        </div>
        <div className="flex justify-between mt-2">

          <p className="text-gray-600">{row.country}</p>
        </div>
        <div className="flex justify-between mt-2">

          <p className="text-gray-600">{row.collegeMajors}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-bold text-gray-800">{t("Phone")}:</p>
          <p className="text-gray-600">{row.phone}</p>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
            <img src={bin} alt="delete" className="w-5 h-5" />
          </button>
          <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
            <img src={pencil} alt="edit" className="w-5 h-5" />
          </button>
        </div>
      </div>
    ))}
  </div>


    </div>
  );
};

export default TableDashboard;
