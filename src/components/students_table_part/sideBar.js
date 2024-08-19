import calendar from "../../assets/images/calendar.png";


const SideBar = () => {
  return (
    <div className="flex">
      <div className="w-72 h-screen flex flex-col justify-between">
        <div className="flex justify-start items-center p-5 mb-24 bg-[#1f7bf427]">
        <div className="w-1 h-full bg-primary"/>
        <img src={calendar} className="w-5"/>
        <p className="px-2">Students' Data</p>
        </div>
        <div className="flex justify-start items-center p-5 mb-24">
        <img src={calendar} className="w-5"/>
          <button className="px-2 text-xl opacity-65">Logout</button>
        </div>
      </div>
      <div className="w-widthLine h-screen bg-shadowLine" />
    </div>
  );
};

export default SideBar;
