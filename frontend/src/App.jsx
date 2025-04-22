import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from "./pages/UserList"
import DashboardLayoutBasic from "./layout/AdminLayout";
import AdminRoutes from './routes/AdminRoutes';
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<DashboardLayoutBasic />} />
            <Route path='/admin/*' element={<AdminRoutes />}></Route>
            {/* <Route path="/admin" element={<DashboardLayoutBasic />} />
            <Route path="/" element={<UserList />} />
            <Route path="/:email" element={<UserList />} /> */}
            
         </Routes>
      </BrowserRouter>
   );
}

export default App;
