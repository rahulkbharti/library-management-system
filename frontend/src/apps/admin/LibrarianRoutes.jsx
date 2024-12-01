import { Route, Routes } from "react-router-dom"
import BookManagement from "./book/BookManagement";
import LibrarianDashboard from "./LibrarianDashboard ";
import TransactionOperations from "./transaction/TransactionOperations";
import StudentManagement from "./student/StudentManagement";

import BookAddForm from "./book/BookAddForm";
import BookUpdateForm from "./book/BookUpdateForm";
import BookDeleteForm from "./book/BookDeleteForm";
import BookList from "./book/BookList";
import BookDetail from "./book/BookDetail";

import StudentList from "./student/StudentList";
import StudentView from "./student/StudentView";
import StudentEdit from "./student/StudentUpdate";
import StudentAdd from "./student/StudentAdd";
import TransactionIssue from "./transaction/TransactionAdd";
import TransactionHistory from "./transaction/TransactionHistory";
import TransactionReturn from "./transaction/TransactionReturn";


const LibrarianRoutes = () => {
  return (
    <Routes>
      <Route index element={<LibrarianDashboard />} />
      <Route path="dashboard" element={<LibrarianDashboard />}></Route>
      <Route path="books/*" element={<BookManagement />}>
        <Route index element={<BookList />} />
        <Route path="view/:id" element={<BookDetail />} />
        <Route path="add" element={<BookAddForm />} />
        <Route path="edit/:id" element={<BookUpdateForm />} />
        <Route path="delete:id" element={<BookDeleteForm />} />
      </Route>

      <Route path="students" element={<StudentManagement />}>
        <Route index element={<StudentList />} />
        <Route path="view/:id" element={<StudentView />} />
        <Route path="add" element={<StudentAdd />} />
        <Route path="edit/:id" element={<StudentEdit />} />
        {/* <Route path="delete:/id" element={<StudentDelete />} /> */}
      </Route>

      <Route path="transactions" element={<TransactionOperations />}>
        <Route index element={<TransactionHistory />} />
        <Route index path="history" element={<TransactionHistory />} />
        <Route path="issue" element={<TransactionIssue />} />
        <Route path="return" element={<TransactionReturn />} />
      </Route>
    </Routes>
  );
};

export default LibrarianRoutes;