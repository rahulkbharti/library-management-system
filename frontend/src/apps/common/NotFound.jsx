import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound =()=>{

    return (
        <>
          <Stack sx={{justifyContent:"center",alignItems:"center",height:"80vh"}}>
              <Typography component="h1">
                 404 Page Not Found
              </Typography>
              <Link to="/">GO Home</Link>
          </Stack>
        </>
    )
}

export default NotFound;