import "./App.scss";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { useState , useContext ,useEffect } from "react";
import Students from "./components/students/Students";
import Sidebar from "./components/sidebar/Sidebar";
import  Dashboard  from "./components/dashboard/Dashboard";
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import Faculty from "./components/faculty/Faculty";
import CareerService from "./components/careerService/CareerService";
import UserContext from "./context/UserContext"
import NotFound from "./components/notFound/NotFound";
import Attendance from "./components/attendance/Attendance";
import StudentDetail from "./components/studentDetails/StudentDetail";
import Profile from "./components/profile/Profile";
import { useCookies } from "react-cookie";


function App() {
  const [cookies, setCookie] = useCookies();
  const ctx = useContext(UserContext)
  const manage = ctx.manage;
  console.log(manage.isLoggedIn)
  const [data , setData] = useState("dashboard");
  const getData = (data) => {
    console.log(data)
    setData(data)
  }
  useEffect(() => {
    
  }, [data])

  return (
    
      <div className="App">
      <Box sx={{ display: 'flex' }}>
            <CssBaseline />
      {(manage.isLoggedIn || cookies.userLogged) &&  <Sidebar getData={getData} />}
      
          <Routes>
            <Route path="/" element={<Login />} />

            {(!cookies.userLogged || cookies.userLogged==="")  &&   <Route path="*" element={<NotFound />} /> }

            {data === "dashboard" && cookies.userLogged && <Route path="/dashboard" element={<Dashboard />} />}  
            {data === "students" && cookies.userLogged  &&  <Route path="/students" element={<Students />} /> }
            {data === "faculty" && cookies.userLogged  &&   <Route path="/faculty" element={<Faculty />} /> }
            {data === "careerServices" && cookies.userLogged  &&   <Route path="/careerServices" element={<CareerService />} /> }
            {data === "attendance" && cookies.userLogged  &&   <Route path="/attendance" element={<Attendance />} /> }
            {cookies.userLogged  &&  <Route path="/student/:id"  element={<StudentDetail />}  />}
            {cookies.userLogged  &&  <Route path="/profile" element={<Profile />} />}
          </Routes>
        </Box>
      </div>
  
  );
}

export default App;
