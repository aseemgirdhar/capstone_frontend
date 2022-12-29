import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getSingleStudent, markAttendance } from "../../api/Api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import "./studentDetails.scss";
import Button from '@mui/material/Button';

const StudentDetail = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [value, setValue] = React.useState(null);

  const [getStudent, setGetStudent] = useState([]);
  const [attendance, serAttendance] = useState("Present");
  const params = useParams();
  //   const getStudentDetails = getSingleStudent(params.id);
  useEffect(() => {
    getSingleStudent(params.id)
      .then((res) => res.data)
      .then((getStudent) => setGetStudent(getStudent))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAttendanceValue = (e) => {
    serAttendance(e.target.value);
  };
  const submitAttendance = () => {
    const attData = {
      student: getStudent._id,
      StudentName: getStudent.fullname,
      BatchName: getStudent.batchName,
      attendanceDate: value,
      isPresent: attendance === "Present" ? true : false,
    };
    console.log(attData)
    markAttendance(attData)
      .then((res) => res)
      .catch((err) => console.error(err));
  };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Card sx={{ minWidth: 275 , maxWidth: 540, margin: "auto"}}>
        <CardContent>
          <div class="userDetails-wrapper">
            <div className="user-img">
              <img src={getStudent.userImage} alt="" />
            </div>
            <div className="userDetails">
              <Typography variant="h5" component="div" className="student-name">
                {getStudent.fullname}
              </Typography>
              <Typography variant="body2"  className="student-batch">
                    {getStudent.batchName}
              </Typography>
              <Typography variant="body2"  className="student-contact">
                {getStudent.phoneNo}
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Present"
                  name="radio-buttons-group"
                  onChange={getAttendanceValue}
                >
                  <FormControlLabel
                    value="Present"
                    control={<Radio />}
                    label="Present"
                  />
                  <FormControlLabel
                    value="Absent"
                    control={<Radio />}
                    label="Absent"
                  />
                </RadioGroup>
              </FormControl>
              <Button variant="contained" onClick={submitAttendance}>Submit </Button>

            </div>
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default StudentDetail;
