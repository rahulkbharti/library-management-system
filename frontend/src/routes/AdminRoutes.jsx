import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import BookList from "../pages/Books/BookList";
import Books from "../pages/Books/Books";
import Users from "../pages/Users/Users";
import Departments from "../pages/Departments/Departments";
import EBooks from "../pages/Ebooks/Ebooks";
import Transactions from "../pages/Transactions/Transactions";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const Links = [
    { name: "📚 Books", id: "1", uri: "books", element: <BookList /> },
    { name: "👥 Users", id: "2", uri: "users", element: <>Users</> },
    { name: "🏢 Departments", id: "3", uri: "departments", element: <>Departments</> },
    { name: "📖 Ebooks", id: "4", uri: "ebooks", element: <>Ebooks</> },
    { name: "🔄 Transactions", id: "5", uri: "transactions", element: <>Transactions</> },
];

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout Links={Links} />}>
                <Route path={Links[0].uri} element={<Books />} />
                <Route path={Links[1].uri} element={<Users />} />
                <Route path={Links[2].uri} element={<Departments />} />
                <Route path={Links[3].uri} element={<EBooks />} />
                <Route path={Links[4].uri} element={<Transactions />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AdminRoutes;
