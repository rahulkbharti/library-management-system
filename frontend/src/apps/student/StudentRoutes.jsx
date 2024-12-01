import { Route, Routes } from "react-router-dom"
import StudentDashboard from "./StudentDashboard";

const StudentRoutes = () => {
  return (
    <>
      <Routes>
         <Route index element={<StudentDashboard/>} />
         <Route path="/dashboard" element={<StudentDashboard/>} />
      </Routes>
    </>
  );
};

export default StudentRoutes;