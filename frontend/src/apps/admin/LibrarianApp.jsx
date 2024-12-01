import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useEffect, useState } from "react";

import axiosInstance from "../../axios/AxiosInstance";

const menu = {
  dashboard: "/librarian/dashboard",
  books: "/librarian/books",
  students: "/librarian/students",
  transactions: "/librarian/transactions",
  login: "/librarian/login",
  register: "/librarian/register"
}

const LibrarianApp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function myFun() {
      let x = await axiosInstance.get("/auth/admin/profile");
      setUser(x.data.user);
    }
    myFun();
  }, [])

  const handleLogout = async () => {
    let x = confirm("Do you  want to logout!");
    if (x) {
      await axiosInstance.get("/auth/admin/logout");
      navigate("/librarian/login");
    }
  }
  return (
    <>
      <Box sx={{ boxShadow: "0 0 10px black" }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center", p: 1, }}>
            <h2>Librarian App</h2>
            <Stack direction={"row"} spacing={2}>
              {!user ? (
                <>
                  <Link to={menu.register}>
                    <Button size="small" variant="contained">Register</Button>
                  </Link>
                  <Link to={menu.login}>
                    <Button size="small" variant="outlined">Login</Button>
                  </Link>
                </>
              ) : (
                <IconButton sx={{ p: 0 }} onClick={handleLogout}>
                  <Typography>
                    {user?.full_name}
                  </Typography>
                  <Avatar alt={user?.user?.full_name} src="logo192.png" />
                </IconButton>
              )}

            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={12} md={12}>

          </Grid>
          <Grid item xs={12} sm={3} md={3}>

            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                component={Link}
                to={menu.dashboard}
                selected={true}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={menu.books}
                selected={false}
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Books" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={menu.students}
                selected={false}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to={menu.transactions}
                selected={false}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItemButton>
            </List>
          </Grid>
          <Grid item xs={12} sm={9} md={9} sx={{ p: 4 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LibrarianApp;