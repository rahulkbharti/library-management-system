import React from "react";
import styles from "./MainContent.module.css";
import { Outlet } from "react-router-dom";

const MainContent = ({ activePage }) => {
    return (
        <main className={styles.mainContent}>
            {/* <h2>{activePage}</h2> */}
            {/* <p>Displaying content for: {activePage}</p> */}
            <Outlet />
        </main>
    );
};

export default MainContent;
