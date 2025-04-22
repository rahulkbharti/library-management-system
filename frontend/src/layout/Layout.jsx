import React, { useState } from "react";
import styles from "./Layout.module.css";
import Header from "../components/Header/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import MainContent from "../components/MainContent/MainContent.jsx";
// import { Outlet } from "react-router-dom";

const Layout = ({ Links }) => {
    const [activePage, setActivePage] = useState("Books");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleAuth = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div className={styles.app}>
            <Header isLoggedIn={isLoggedIn} handleAuth={handleAuth} />
            <div className={styles.container}>
                <Sidebar setActivePage={setActivePage} Links={Links} />
                <MainContent activePage={activePage} />
                {/* <Outlet /> */}
            </div>
        </div>
    );
};

export default Layout;
