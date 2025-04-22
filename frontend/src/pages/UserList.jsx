// components/UserList.js
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getRequest, postRequest, deleteRequest } from '../services/axiosInstance';
import { useParams } from 'react-router-dom';
const UserList = () => {
    const { email } = useParams();
    const [data, setData] = useState(null);

    const FetchData = async () => {
        const data = (email) ? await getRequest(`/users/${email}`) : await getRequest('/users');
        console.log(data);
        setData(data);
    };

    useEffect(() => {
        // setTimeout(() => {
        FetchData();
        // }, 2000);
    }, []);

    const handleDelete = async (id) => {
        const data = await deleteRequest(`/users/${id}`);
        console.log(data);
        FetchData();
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await postRequest("auth/login", { email: e.target.email.value, password: e.target.password.value });
        console.log(data);
    }
    if (data === null) {
        return <h2>Loading...</h2>
    }
    if (data && data.length == 0) {
        return <h2>No User Found.</h2>
    }
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {data.map && data.map((user) => (
                    <li key={user.user_id}>
                        {user.name} <a href={`${user.email}`}>{user.email} </a>
                        <button type='button' onClick={() => handleDelete(user.user_id)}>Delete</button>
                    </li>
                ))}
                {data.name && (
                    <span key={data.user_id}>
                        <b>Name : </b>{data.name} <br />
                        <b>Email : </b> {data.email} <br />
                        <b>Role : </b> {data.role} <br />
                        <b>Department : </b> {data.department} <br />
                    </span>
                )}
            </ul>
            <div>
                <h3>Login</h3>
                <form onSubmit={handleLogin} method='POST'>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default UserList;
