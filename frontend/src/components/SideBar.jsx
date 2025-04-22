import { Link } from "react-router-dom";

// const Menus = [
//     { name: "Books", id: "1", uri: "books" },
//     { name: "Users", id: "2", uri: "users" },
//     { name: "Departments", id: "3", uri: "departments" },
//     { name: "Ebooks", id: "4", uri: "ebooks" },
// ]

const Sidebar = ({ Links }) => {
    return (
        <ul>
            {Links.map(item => (
                <li key={item.id}><Link to={item.uri}>{item.name}</Link></li>
            ))}
        </ul>
    )
}

export default Sidebar;