import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserContext from "../../context/UserContext";
import { getSingleStudent } from "../../api/Api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCookies } from "react-cookie";

import "./Profile.scss";
import { Button } from "@mui/material";
const Profile = () => {
  const [getStudent, setGetStudent] = useState([]);
  const [cookies, setCookie ] = useCookies();

  const ctx = useContext(UserContext);
  const userId = ctx.studentId;
  console.log(userId);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    getSingleStudent(`${cookies.studentId}`)
      .then((res) => res.data)
      .then((getStudent) => setGetStudent(getStudent))
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item className="profile-card">
              <div className="profile-wrapper">
                <div className="user-img">
                  <img src={getStudent.userImage} alt="" />
                </div>
                <div className="profile-details">
                  <h3>{getStudent.fullname}</h3>
                  <h3>{getStudent.email}</h3>
                  <h3>{getStudent.phoneNo}</h3>
                  <h3>{getStudent.courseName}</h3>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Qualification
                    </TableCell>
                    <TableCell align="right">
                      {getStudent.qualification}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Batch Name
                    </TableCell>
                    <TableCell align="right">{getStudent.batchName}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                    Working Status
                    </TableCell>
                    <TableCell align="right">{getStudent.workingStatus}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                    Total Experience
                    </TableCell>
                    <TableCell align="right"> {getStudent.yearOfExp}</TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                    Current CTC
                    </TableCell>
                    <TableCell align="right">  {getStudent.currentCTC}</TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row" align="center">
                    <Button variant="outlined">Edit</Button>
                    </TableCell>
                   
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      {/* <Card
        sx={{ minWidth: 275, maxWidth: 500, margin: "auto" }}
        className="profile-card"
      >
        <CardContent>
          <div className="profile-wrapper">
            <div className="user-img">
              <img src={getStudent.userImage} alt="" />
            </div>
            <div className="profile-details">
              <h3>Name : {getStudent.fullname}</h3>

              <h4>Course Name : {getStudent.courseName}</h4>
              <h4>qualification : {getStudent.qualification}</h4>
              <h4>Phone Number: {getStudent.phoneNo}</h4>
              <h4>Email : {getStudent.email}</h4>
              <h4>Batch Name : {getStudent.batchName}</h4>
              <h4>Working Status : {getStudent.workingStatus}</h4>
              <h4>Total Experience : {getStudent.yearOfExp}</h4>
              <h4>Current CTC : {getStudent.currentCTC}</h4>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </Box>
  );
};

export default Profile;
