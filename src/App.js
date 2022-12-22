import "./App.scss";
import Login from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { useState , useContext } from "react";
import Students from "./components/students/Students";
import Sidebar from "./components/sidebar/Sidebar";
import  Dashboard  from "./components/dashboard/Dashboard";
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import Faculty from "./components/faculty/Faculty";
import CareerService from "./components/careerService/CareerService";
import UserContext from "./context/UserContext"
import NotFound from "./components/notFound/NotFound";


function App() {
  const ctx = useContext(UserContext)
  const manage = ctx.manage;
  console.log(manage.isLoggedIn)
  const [data , setData] = useState("dashboard");
  const getData = (data) => {
    console.log(data)
    setData(data)
  }

  return (
    
      <div className="App">
      <Box sx={{ display: 'flex' }}>
            <CssBaseline />
      {manage.isLoggedIn &&  <Sidebar getData={getData} />}
      
          <Routes>
            <Route path="/" element={<Login />} />

            {(!manage.isLoggedIn || manage.isLoggedIn==="")  &&   <Route path="*" element={<NotFound />} /> }

            {data === "dashboard" && manage.isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}  
            {data === "students" && manage.isLoggedIn  &&  <Route path="/students" element={<Students />} /> }
            {data === "faculty" && manage.isLoggedIn  &&   <Route path="/faculty" element={<Faculty />} /> }
            {data === "careerServices" && manage.isLoggedIn  &&   <Route path="/careerServices" element={<CareerService />} /> }
           
          </Routes>
        </Box>
      </div>
  
  );
}

export default App;
