import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../apps/Home";


import StudentApp from "../apps/student/StudentApp";
import LibrarianApp from "../apps/admin/LibrarianApp";

import { StudentLogin, StudentRegister } from "../apps/student/StudentAuth";
import { LibrarianLogin, LibrarianRegister } from "../apps/admin/LibrarianAuth";

import LibrarianRoutes from "../apps/admin/LibrarianRoutes";
import StudentRoutes from "../apps/student/StudentRoutes";
import NotFound from "../apps/common/NotFound";



const MainRoute = () => {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/*" element={<StudentApp />}>
        <Route path="*" element={<StudentRoutes />}></Route>
      </Route>
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />

      <Route path="/librarian/*" element={<LibrarianApp />}>
        <Route path="*" element={<LibrarianRoutes />}></Route>
      </Route>

      <Route path="/librarian/login" element={<LibrarianLogin />} />
      <Route path="/librarian/register" element={<LibrarianRegister />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoute;