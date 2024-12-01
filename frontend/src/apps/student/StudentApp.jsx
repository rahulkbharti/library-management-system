import { Avatar, Box, Button, Container, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import axiosInstance from "../../axios/AxiosInstance";


// Student components
function StudentApp() {
    const [user, setUser] = useState(null);
    // useEffect(() => {
    //     async function myFun() {
    //         let x = await axiosInstance.get("/auth/student/profile");
    //         console.log(x)
    //         setUser(x.data.student);
    //     }
    //     myFun();
    // }, [])
    return (
        <>
            <Box sx={{ boxShadow: "0 0 10px black" }}>
                <Container maxWidth="md">
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center", p: 1, }}>
                        <h2>Student App</h2>
                        <Stack direction={"row"} spacing={2}>
                            {!user ? (
                                <>
                                    <Link to="login">
                                        <Button size="small" variant="contained">Login</Button>
                                    </Link>
                                    <Link to="register">
                                        <Button size="small" variant="outlined">Sign Up</Button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="profile">
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="logo192.png" />
                                    </IconButton>
                                </Link>
                            )}

                        </Stack>
                    </Stack>

                </Container>
            </Box>
            <Stack direction="row">
                <Container maxWidth="md">
                    <Outlet />
                </Container>
            </Stack>
        </>
    );
}

export default StudentApp;