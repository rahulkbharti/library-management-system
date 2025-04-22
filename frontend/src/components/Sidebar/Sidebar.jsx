import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Footer from "../Footer/Footer";

const Sidebar = ({ setActivePage, Links }) => {
    const location = useLocation();

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.menu}>
                {Links.map((item) => (
                    <li key={item.id} className={location.pathname === item.uri ? styles.active : ""}>
                        <Link to={item.uri} onClick={() => setActivePage(item.name)}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Footer />
        </aside>
    );
};

export default Sidebar;
