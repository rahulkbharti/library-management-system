import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import axiosInstance from '../../axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';

// LibrarianLogin component using Formik and Yup
function LibrarianLogin() {
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values) => {
        // Add authentication logic here (e.g., call an authentication API)
        console.log('Librarian login logic goes here', values);
        let x = await axiosInstance.post("/auth/admin/login", values);
        console.log(x);
        navigate("/librarian/dashboard");
    };

    return (
        <Stack sx={{ justifyContent: "center", alignItems: 'center', height: "80vh" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                <h2>Librarian Login</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="username"
                                    name="username"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                    size="small"
                                />
                            </FormControl>
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    size="small"
                                />
                            </FormControl>
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Form>
                </Formik>
            </div>
        </Stack>
    );
}

// LibrarianRegister component using Formik and Yup
function LibrarianRegister() {
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: '',
        full_name: '',
        email: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        full_name: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const onSubmit = async (values) => {
        // Add registration logic here (e.g., call a registration API)
        console.log('Librarian registration logic goes here', values);
        let x = await axiosInstance.post("/auth/admin/signup", values);
        console.log(x);
        navigate("/librarian/dashboard");
    };

    return (
        <Stack sx={{ justifyContent: "center" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                <h2>Librarian Register</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>

                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="username"
                                    name="username"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                />
                            </FormControl>
                            <ErrorMessage name="username" component="div" />
                        </div>
                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                            </FormControl>
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                <InputLabel htmlFor="full_name">Full Name</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="full_name"
                                    name="full_name"
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                />
                            </FormControl>
                            <ErrorMessage name="full_name" component="div" />
                        </div>
                        <div>
                            <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Field
                                    as={OutlinedInput}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                />
                            </FormControl>
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <Button type="submit" variant="contained" color="primary" size="small">
                            Register
                        </Button>

                    </Form>
                </Formik>
            </div>
        </Stack>
    );
}

export { LibrarianLogin, LibrarianRegister };
