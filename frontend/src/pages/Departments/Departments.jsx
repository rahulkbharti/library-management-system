import React, { useState } from "react";
import styles from "./Departments.module.css";

const Departments = () => {
    // Sample department data
    const [departments, setDepartments] = useState([
        { id: 1, name: "Information Technology", description: "Computer Science Specialized Branch" },
        { id: 2, name: "Mechanical Engineering", description: "Engineering branch focused on mechanics and design" },
    ]);

    const [newDepartment, setNewDepartment] = useState({ name: "", description: "" });
    const [editingDepartment, setEditingDepartment] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDepartment({ ...newDepartment, [name]: value });
    };

    // Add Department
    const addDepartment = () => {
        if (!newDepartment.name || !newDepartment.description) return;
        setDepartments([...departments, { id: Date.now(), ...newDepartment }]);
        setNewDepartment({ name: "", description: "" });
    };

    // Edit Department
    const editDepartment = (department) => {
        setEditingDepartment(department);
        setNewDepartment(department);
    };

    // Update Department
    const updateDepartment = () => {
        setDepartments(departments.map((d) => (d.id === editingDepartment.id ? newDepartment : d)));
        setEditingDepartment(null);
        setNewDepartment({ name: "", description: "" });
    };

    // Delete Department
    const deleteDepartment = (id) => {
        setDepartments(departments.filter((department) => department.id !== id));
    };

    return (
        <div className={styles.container}>
            <h2>🏢 Department Management</h2>

            {/* Add/Edit Department Form */}
            <div className={styles.form}>
                <input type="text" name="name" placeholder="Department Name" value={newDepartment.name} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={newDepartment.description} onChange={handleChange} />

                {editingDepartment ? (
                    <button className={styles.updateBtn} onClick={updateDepartment}>Update Department</button>
                ) : (
                    <button className={styles.addBtn} onClick={addDepartment}>Add Department</button>
                )}
            </div>

            {/* Departments Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>{department.description}</td>
                            <td>
                                <button className={styles.editBtn} onClick={() => editDepartment(department)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => deleteDepartment(department.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Departments;
