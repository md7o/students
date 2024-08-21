// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login/login_page";
import StudentsTable from "./pages/login/students_table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentsTable />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
