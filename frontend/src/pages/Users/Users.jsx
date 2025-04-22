import React, { useState } from "react";
import styles from "./Users.module.css";

const Users = () => {
    // Sample user data
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", password: "12345", role: "student", department: "Information Technology" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", password: "67890", role: "admin", department: "Computer Science" },
    ]);

    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "student", department: "" });
    const [editingUser, setEditingUser] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Add User
    const addUser = () => {
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.role || !newUser.department) return;
        setUsers([...users, { id: Date.now(), ...newUser }]);
        setNewUser({ name: "", email: "", password: "", role: "student", department: "" });
    };

    // Edit User
    const editUser = (user) => {
        setEditingUser(user);
        setNewUser(user);
    };

    // Update User
    const updateUser = () => {
        setUsers(users.map((u) => (u.id === editingUser.id ? newUser : u)));
        setEditingUser(null);
        setNewUser({ name: "", email: "", password: "", role: "student", department: "" });
    };

    // Delete User
    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>👤 User Management</h2>

            {/* Add/Edit User Form */}
            <div className={styles.form}>
                <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} />
                <select name="role" value={newUser.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="librarian">Librarian</option>
                </select>
                <input type="text" name="department" placeholder="Department" value={newUser.department} onChange={handleChange} />

                {editingUser ? (
                    <button className={styles.updateBtn} onClick={updateUser}>Update User</button>
                ) : (
                    <button className={styles.addBtn} onClick={addUser}>Add User</button>
                )}
            </div>

            {/* Users Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>{user.department}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => editUser(user)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
