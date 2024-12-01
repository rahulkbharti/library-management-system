import { Container, Stack } from "@mui/material";

const  Home = ()=> {
    return (
        
       <Container maxWidth="md">
         <Stack >
            <div  >
                <h1>Welcome to Our Library System</h1>
                <p>
                    Explore a world of knowledge and manage your library resources efficiently with our
                    user-friendly system.
                </p>
                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>Student Dashboard with personalized information</li>
                        <li>Librarian Dashboard for managing library resources</li>
                        <li>Easy-to-use navigation for students and librarians</li>
                        <li>Secure login and registration for authorized access</li>
                        <li>Efficient book management system for librarians</li>
                    </ul>
                </section>
                <section>
                    <h2>Get Started</h2>
                    <p>
                        Are you a student looking to access your dashboard? Click{' '}
                        <a href="/student/dashboard">here</a>.
                    </p>
                    <p>
                        Are you a librarian managing the library resources? Click{' '}
                        <a href="/librarian/dashboard">here</a>.
                    </p>
                </section>
                <section>
                    <h2>About Us</h2>
                    <p>
                        Learn more about our library system and how it can benefit both students and librarians.
                    </p>
                    <p>Contact us for any assistance or inquiries.</p>
                </section>
            </div>
        </Stack>
       </Container>
    );
}

export default Home;