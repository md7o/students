import { useLocation, useNavigate } from "react-router-dom";

const CourseSubjects: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjects } = location.state as { subjects: string[] };

  const handleBack = () => {
    window.history.back(); // Go back to the previous page in history
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Subjects</h1>
      <button
        onClick={handleBack}
        className="mb-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Courses
      </button>
      <ul className="list-disc list-inside space-y-2">
        {subjects.map((subject, index) => (
          <li key={index} className="text-gray-700 text-lg">
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSubjects;
