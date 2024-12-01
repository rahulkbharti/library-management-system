import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, Stack, TextareaAutosize, Typography } from '@mui/material';
import axiosInstance from '../../axios/AxiosInstance';
import { Link, useNavigate } from 'react-router-dom';

// StudentLogin component using Formik and Yup
const StudentLogin = () => {
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
        let x = await axiosInstance.post("/auth/student/login", values);
        navigate("/student/dashboard");
    };

    return (
        <Stack sx={{ justifyContent: "center" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                <h2>Student Login</h2>
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
                        <Button type="submit" variant="contained" color="primary" size="small">
                            Login
                        </Button>

                    </Form>
                </Formik>
            </div>
        </Stack>
    );
}

// StudentRegister component using Formik and Yup
const StudentRegister = () => {
    const initialValues = {
        roll_number: '',
        full_name: '',
        email: '',
        username: '',
        password: '',
        branch: '',
        year: '',
        address: '',
    };

    const validationSchema = Yup.object({
        roll_number: Yup.string().required('Roll number is required'),
        full_name: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        branch: Yup.string().required('Branch is required'),
        year: Yup.string().required('Year is required'),
        address: Yup.string().required('Address is required'),
    });

    const onSubmit = async (values) => {
        // Add authentication logic here (e.g., call an authentication API)
        console.log('Student login logic goes here', values);
        let x = await axiosInstance.post("/auth/student/signup", values);
        console.log(x);
    };

    return (
        <Stack sx={{ justifyContent: "center" }}>
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                <h2>Student Register</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <Box maxWidth={500} margin="auto">
                            <Typography variant="h6">
                                Register |{' '}
                            </Typography>


                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                        <InputLabel htmlFor="roll_number">Roll Number</InputLabel>
                                        <Field
                                            as={OutlinedInput}
                                            id="roll_number"
                                            name="roll_number"
                                            label="Roll Number"
                                            type="text"
                                            fullWidth
                                        />
                                    </FormControl>
                                    <ErrorMessage name="roll_number" component="div" />
                                </Grid>

                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>

                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                        <InputLabel htmlFor="branch">Branch</InputLabel>
                                        <Field
                                            as={OutlinedInput}
                                            id="branch"
                                            name="branch"
                                            label="Branch"
                                            type="text"
                                            fullWidth
                                        />
                                    </FormControl>
                                    <ErrorMessage name="branch" component="div" />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                        <InputLabel htmlFor="year">Year</InputLabel>
                                        <Field
                                            as={OutlinedInput}
                                            id="year"
                                            name="year"
                                            label="Year"
                                            type="text"
                                            fullWidth
                                        />
                                    </FormControl>
                                    <ErrorMessage name="year" component="div" />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                                        <InputLabel htmlFor="address">Address</InputLabel>
                                        <Field
                                            as={TextareaAutosize}
                                            id="address"
                                            name="address"
                                            label="Address"
                                            component="textarea"
                                            rows={4}
                                            fullWidth
                                        />
                                    </FormControl>
                                    <ErrorMessage name="address" component="div" />
                                </Grid>
                            </Grid>

                            <div>
                                Already a user <Link to="/login" component={Link}>
                                    Back to Login
                                </Link> <br />
                                <br />
                                <Button type="submit" variant="contained" color="primary" size="small">
                                    Register
                                </Button>
                            </div>
                        </Box>
                    </Form>
                </Formik>
            </div>
        </Stack>
    );
}

export { StudentLogin, StudentRegister };
