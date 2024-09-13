// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login_page";
import StudentsDashboard from "./pages/students_data";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentsDashboard />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
