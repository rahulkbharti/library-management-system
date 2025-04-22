import { Link } from "react-router-dom";
import styles from "./Header.module.css"
const Header = () => {

    return (
        <div className={styles.header}>
            <h2> Library Management System</h2>
            <div className={styles.menu}>
                <Link to="/admin/login">Login</Link>
                <Link to="/admin/register">Sign Up</Link>
            </div>
        </div>
    )
}

export default Header;