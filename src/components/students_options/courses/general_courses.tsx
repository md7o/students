import { useNavigate, Link } from "react-router-dom";
import university from "../../../assets/images/school.png";
import desktop from "../../../assets/images/desktop.png";
import engineering from "../../../assets/images/engineering.png";
import briefcase from "../../../assets/images/briefcase.png";
import gear from "../../../assets/images/gear.png";
import palette from "../../../assets/images/palette.png";
import research from "../../../assets/images/research.png";
import science from "../../../assets/images/science-book.png";
import end from "../../../assets/images/eng.png";

type Major = {
  name: string;
  imageUrl: string;
  subjects: string[];
};

interface coursesLanguage {
  lang: string;
}

const totalStudents = 200; // Total number of students
const studentsPerSpecialty = [65, 5, 50, 15, 15, 20, 10, 20]; // Number of students in each specialty

const GeneralCourses: React.FC<coursesLanguage> = ({ lang }) => {
  const navigate = useNavigate();

  const handleNavigateClick = (subjects: string[]) => {
    navigate("/students/subjects_course", { state: { subjects } });
  };

  const majors: Major[] = [
    {
      name: lang === "en" ? "Computer Science" : "علوم الحاسب",
      imageUrl: desktop,
      subjects: [
        "Data Structures and Algorithms",
        "Operating Systems",
        "Database Systems",
        "Artificial Intelligence",
        "Computer Networks",
        "Software Engineering",
        "Web Development",
        "Cybersecurity",
      ],
    },
    {
      name: lang === "en" ? "Mechanical Engineering" : "هندسة ميكانيكية",
      imageUrl: engineering,
      subjects: [
        "Thermodynamics",
        "Fluid Mechanics",
        "Mechanics of Materials",
        "Machine Design",
        "Robotics",
        "Heat Transfer",
        "Engineering Materials",
        "Manufacturing Processes",
      ],
    },
    {
      name: lang === "en" ? "Business Administration" : "إدارة أعمال",
      imageUrl: briefcase,
      subjects: [
        "Principles of Management",
        "Marketing",
        "Business Law",
        "Financial Accounting",
        "Human Resource Management",
        "Organizational Behavior",
        "Strategic Management",
        "Entrepreneurship",
      ],
    },
    {
      name: lang === "en" ? "Electrical Engineering" : "الهندسة الكهربائية",
      imageUrl: gear,
      subjects: [
        "Circuit Analysis",
        "Digital Signal Processing",
        "Electromagnetic Fields",
        "Power Systems",
        "Microelectronics",
        "Control Systems",
        "Analog Electronics",
        "Renewable Energy Systems",
      ],
    },
    {
      name: lang === "en" ? "psychology" : "علم النفس",

      imageUrl: research,
      subjects: [
        "Cognitive Psychology",
        "Developmental Psychology",
        "Abnormal Psychology",
        "Social Psychology",
        "Behavioral Neuroscience",
        "Research Methods in Psychology",
        "Clinical Psychology",
        "Psychological Testing and Assessment",
      ],
    },
    {
      name: lang === "en" ? "English" : " لغة انجليزية",
      imageUrl: end,
      subjects: [
        "Introduction to Literature",
        "Shakespearean Studies",
        "Creative Writing",
        "Literary Theory",
        "American Literature",
        "Postcolonial Literature",
        "English Grammar and Linguistics",
        "Modern Poetry",
      ],
    },

    {
      name: lang === "en" ? "Environmental Science" : "العلوم البيئية",
      imageUrl: science,
      subjects: [
        "Environmental Chemistry",
        "Ecology and Conservation",
        "Environmental Policy",
        "Climate Change",
        "Renewable Energy",
        "Environmental Impact Assessment",
        "Geographic Information Systems (GIS)",
        "Natural Resource Management",
      ],
    },
    {
      name: lang === "en" ? "Fine Arts" : "الفنون الجميلة",
      imageUrl: palette,
      subjects: [
        "Drawing and Painting",
        "Art History",
        "Sculpture",
        "Digital Media",
        "Photography",
        "Printmaking",
        "Ceramics",
        "Contemporary Art Theory",
      ],
    },
  ];
  return (
    <div
      className="flex justify-center gap-5"
      style={{ direction: lang === "en" ? "ltr" : "rtl" }}
    >
      <div>
        {/* Courses Card */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:justify-center justify-stretch text-white rounded-xl ">
          {majors.map((items, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center bg-darkColor rounded-xl py-20  space-y-5 ${
                lang === "en" ? "2.8xl:px-12 px-5" : "2.8xl:px-16 px-5"
              }`}
            >
              <img src={items.imageUrl} alt={university} className="w-24" />
              <p className="sm:text-lg text-xl">{items.name}</p>
              <button
                onClick={() => handleNavigateClick(items.subjects)}
                className="group bg-background text-xl px-10 py-1.5 rounded-lg shadowing hover:bg-primary duration-300"
              >
                <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                  Courses
                </p>
              </button>
            </div>
          ))}
        </div>
        {/* Most registered  */}
        <div className=" bg-darkColor rounded-xl mt-5 pb-5 text-white">
          <p className="text-3xl p-5">
            {lang === "en" ? "Most registered courses" : "أكثر الدورات المسجلة"}
          </p>
          {majors.map((items, index) => {
            const percentage =
              (studentsPerSpecialty[index] / totalStudents) * 100;
            return (
              <div
                key={index}
                className="flex flex-row md:justify-start justify-between items-center space-x-6 py-5 px-14 "
              >
                <p className="text-lg w-52">{items.name}</p>
                <div className="md:block hidden flex-1 h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="md:text-base  text-xl ">
                  {Math.round(percentage)}%
                </p>
              </div>
            );
          })}
        </div>
        {/* Countries Percentage Mobile Statue */}
        <div className="2.8xl:hidden block mx-2 w-full bg-darkColor rounded-roundedButt">
          <p className="m-6 pt-10 text-white text-2xl">
            {lang === "en" ? "Student nationality ratio" : "نسبة جنسيات الطلاب"}
          </p>
          <div className="space-y-5">
            <div className="flex justify-between items-center mx-10">
              <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
                <div className="w-5 h-5 bg-red-500 rounded-full" />
                <div>
                  <p className="text-white opacity-50 text-xl">Events Laeder</p>
                  <p className="text-white text-xl">10% </p>
                </div>
              </div>
              <p className="text-white text-2xl">62</p>
            </div>
          </div>
        </div>
      </div>
      {/* Countries Percentage */}
      <div
        className={`2.5xl:block hidden w-1/4 bg-darkColor rounded-roundedButt ${
          lang === "en" ? "mr-10" : "mr-0"
        }`}
      >
        <p className="m-6 text-white text-2xl">
          {lang === "en" ? "Student nationality ratio" : "نسبة جنسيات الطلاب"}
        </p>
        <div className="space-y-5">
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
              <div className="w-5 h-5 bg-red-500 rounded-full" />
              <div>
                <p className="text-white opacity-50 text-xl">Events Laeder</p>
                <p className="text-white text-xl">10% </p>
              </div>
            </div>
            <p className="text-white text-2xl">62</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCourses;
