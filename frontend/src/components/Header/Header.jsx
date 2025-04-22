import React from "react";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn, handleAuth }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>📚 Library Admin</div>
            <div className={styles.auth}>
                {isLoggedIn ? (
                    <button onClick={handleAuth} className={styles.button}>Logout</button>
                ) : (
                    <button onClick={handleAuth} className={styles.button}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;
