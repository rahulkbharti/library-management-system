import { useNavigate } from "react-router-dom";
import { postRequest } from "../../services/axiosInstance";
import { useState } from "react";

const AddBook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        department_id: "",
        language: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const res = await postRequest("/books", formData);
            console.log("Book added successfully:", res);
            navigate('/admin/books');
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <form onSubmit={handleForm}>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required /> <br />
            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required /> <br />
            <input type="text" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} required /> <br />
            <input type="number" name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} required /> <br />
            <input type="number" name="department_id" placeholder="Department Id" value={formData.department_id} onChange={handleChange} required /> <br />
            <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} required /> <br />
            <hr />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default AddBook;
