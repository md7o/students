import AppBar from "../../components/students_table_part/appbar";
import SideBar from "../../components/students_table_part/sideBar";
import StudentsData from "../../components/students_table_part/studentData";

const StudentsTable = () => {
  return (
    <div className="bg-[#F3F6F9]">
      <AppBar />
      <div className="flex justify-between">
        <SideBar />
        <StudentsData />
      </div>
    </div>
  );
};

export default StudentsTable;
