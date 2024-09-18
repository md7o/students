import university from "../../../assets/images/school.png";

const bookCourses = [
  {
    courseName: "Computer science",
    courseCategories: ["Java", "C#", "JavaScript", "c++"],
  },
  {
    courseName: "Graphic Design",
    courseCategories: ["Java", "C#", "JavaScript", "c++"],
  },
  {
    courseName: "Graphic Design",
    courseCategories: ["Java", "C#", "JavaScript", "c++"],
  },
  {
    courseName: "Graphic Design",
    courseCategories: ["Java", "C#", "JavaScript", "c++"],
  },
  {
    courseName: "Graphic Design",
    courseCategories: ["Java", "C#", "JavaScript", "c++"],
  },
];

const totalStudents = 200; // Total number of students
const studentsPerSpecialty = [50, 20, 100, 15, 15]; // Number of students in each specialty

const GeneralCourses = () => {
  return (
    <div className="flex justify-between ">
      <div>
        {/* Courses Card */}
        <div className="flex flex-row justify-center  text-white rounded-xl ">
          {bookCourses.map((items, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-darkColor rounded-xl w-full p-14 mx-5 space-y-5"
            >
              <img src={university} alt={university} className="w-24" />
              <p className="text-2xl">{items.courseName}</p>
              <button className="group bg-background text-xl px-10 py-1.5 rounded-lg shadowing hover:bg-primary duration-300">
                <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                  Courses
                </p>
              </button>
            </div>
          ))}
        </div>
        {/* Most registered  */}
        <div className="w-2/3  bg-darkColor rounded-xl mx-auto mt-5 text-white">
          <p className="text-3xl p-5">Most registered courses</p>
          {bookCourses.map((items, index) => {
            const percentage =
              (studentsPerSpecialty[index] / totalStudents) * 100;
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center space-x-6 p-4 px-20"
              >
                <p className="text-2xl w-52">{items.courseName}</p>
                <div className="flex-1 h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p>{Math.round(percentage)}%</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Countries Percentage */}
      <div className="2.8xl:block hidden mr-10 w-1/3 bg-darkColor rounded-roundedButt">
        <p className="m-6 text-white text-xl">For contact and inquiries</p>
        <div className="space-y-5">
          {/* Events leader */}
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
              <img src={university} alt={university} className="w-14" />
              <div>
                <p className="text-white text-xl">Events Laeder</p>
                <p className="text-white text-md">Work hours: 8am - 4pm</p>
              </div>
            </div>
            <a
              href="mailto:md7ohe@gmail.com"
              className="group bg-background text-xl px-5 py-1 rounded-lg shadowing hover:bg-primary duration-300"
            >
              <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                Email
              </p>
            </a>
          </div>
          {/* Events official */}
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default">
              <img src={university} alt={university} className="w-14" />
              <div>
                <p className="text-white text-xl">Events official</p>
                <p className="text-white text-md">Work hours: 8am - 4pm</p>
              </div>
            </div>
            <button className="group bg-background text-xl px-5 py-1 rounded-lg shadowing hover:bg-primary duration-300">
              <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                Email
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCourses;
