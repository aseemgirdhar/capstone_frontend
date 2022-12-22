import React from 'react'
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/Sidebar';
import Dashboard from '../dashboard/Dashboard';
import CssBaseline from '@mui/material/CssBaseline';
import Students from '../students/Students';
import Faculty from '../faculty/Faculty';

const Main = () => {
  const getUserType = localStorage.getItem("user");
  return (
    <Box sx={{ display: 'flex' }}>
            <CssBaseline />
        <Sidebar />
       {getUserType === "admin" && <Dashboard />} 
       {getUserType === "student" && <Students />}
       {getUserType === "faculty" && <Faculty />}
    </Box>
  )
}

export default Main