import student from "../../assets/images/Student.png";
import power from "../../assets/images/power.png";

const SideBar = () => {
  return (
    <div className="flex">
      <div className="xl:w-72 w-16 h-screen flex flex-col justify-between">
        <div className="flex justify-start items-center cursor-pointer select-none">
          <div className="w-1.5 h-full bg-primary" />
          <div className="flex justify-start items-center p-5 w-full bg-[#1f7bf427]">
            <img src={student} alt="student" className="w-5" />
            <p className="px-2 text-xl font-semibold xl:flex hidden">Students' Data</p>
          </div>
        </div>
        <button className="flex justify-start items-center p-5 mb-24">
          <img src={power} alt="student" className="w-5 " />
          <p className="px-2 text-xl xl:flex hidden">Logout</p>
        </button>
      </div>
      <div className="w-widthLine h-screen bg-shadowLine" />
    </div>
  );
};

export default SideBar;
