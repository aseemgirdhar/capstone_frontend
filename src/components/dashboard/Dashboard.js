import React, {useEffect , useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./dashboard.scss"
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getAllBatch , getAllStudent } from "../../api/Api";
import UserContext from "../../context/UserContext"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Dashboard = () => {
  const [getBatch, setgetBatch] = useState([]);
  const [allStudent, setAllStudent] = useState([]);

 
  useEffect(() => {
    getAllBatch()
    .then((res) => res.data)
    .then((getBatch) => setgetBatch(getBatch.length))
    .catch((err) => {
      console.log(err);
    });

    getAllStudent()
    .then((res) => res.data)
    .then((allStudent) => setAllStudent(allStudent.length))
    .catch((err) => {
      console.log(err);
    });
  }, [])
  return (
    <>
   
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <h3>Hi, Welcome back Aseem</h3>
      <div className="static-card-wrapper">
      <Card className="card">
        <CardContent>
          <div  className="card-content" sx={{ fontSize: 14 }} color="text.secondary">
            <Diversity1Icon />
            <h3>{getBatch}</h3>
            <h6>Batches</h6>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardContent>
          <div  className="card-content" sx={{ fontSize: 14 }} color="text.secondary">
            <LocalLibraryIcon />
            <h3>{allStudent}</h3>
            <h6>Total Learners</h6>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardContent>
          <div  className="card-content">
            <FactCheckIcon />
            <h3>76</h3>
            <h6>Active Learners</h6>
          </div>
        </CardContent>
      </Card>
      <Card className="card">
        <CardContent>
          <div  className="card-content" sx={{ fontSize: 14 }} color="text.secondary">
            <EventAvailableIcon />
            <h3>Available</h3>
            <h6>Learner Reports</h6>
          </div>
        </CardContent>
      </Card>
      </div>
      
    </Box>
   
    </>
  );
};

export default Dashboard;
