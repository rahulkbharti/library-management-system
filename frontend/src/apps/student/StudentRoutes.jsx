import { Route, Routes } from "react-router-dom"
import StudentDashboard from "./StudentDashboard";
import NotFound from "../common/NotFound";

const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<StudentDashboard />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default StudentRoutes;