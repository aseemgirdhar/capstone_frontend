import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { getAllBatch, getStudentByBatch, getAllStudent } from "../../api/Api";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { format } from "date-fns";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Students = () => {
  const [value, setValue] = React.useState(null);

  const [getBatch, setgetBatch] = useState([]);
  const [getStudent, setGetStudent] = useState([]);
  const [getBatchDetails, setgetBatchDetails] = useState("All");
  const [allStudent, setAllStudent] = useState([]);
  const [filterStudent, setFilterStudent] = useState(false);

  const changeHandeler = (e) => {
    setgetBatchDetails(e.target.value);
    setFilterStudent(true);
    const studentList = getStudentByBatch({ batchName: e.target.value });
    studentList
      .then((res) => res.data)
      .then((getStudent) => setGetStudent(getStudent))
      .catch((err) => {
        console.log(err);
      });
  };

  const batchList = getAllBatch();
  const allStudentList = getAllStudent();

  useEffect(() => {
    batchList
      .then((res) => res.data)
      .then((getBatch) => setgetBatch(getBatch))
      .catch((err) => {
        console.log(err);
      });
    allStudentList
      .then((res) => res.data)
      .then((allStudent) => setAllStudent(allStudent))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <ThemeProvider theme={theme}>
        <Grid container component="main">
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={0}
            square
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                style={{
                  minWidth: 100 + "%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <FormControl
                  fullWidth
                  margin="normal"
                  style={{ maxWidth: 50 + "%" }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Batch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getBatchDetails}
                    label="Select Batch"
                    onChange={changeHandeler}
                  >
                    {/* { getBatch && getBatch.map((item) => console.log(item.BatchName) )} */}
                    <MenuItem value="All">All</MenuItem>
                    {getBatch &&
                      getBatch.map((item) => (
                        <MenuItem key={item.BatchName} value={item.BatchName}>
                          {item.BatchName}
                        </MenuItem>
                      ))}
                    {/*  */}
                  </Select>
                </FormControl>
                <div style={{ minwidth: 50 + "%" }}>
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
                </div>

                {/* {getBatch && getBatch.map((item) => <div>{item}</div>)} */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            {getBatchDetails === "All" && (
              <TableRow>
                <StyledTableCell>Batch Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Full Name</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">Contact</StyledTableCell>
                <StyledTableCell align="left">Account Created</StyledTableCell>
              </TableRow>
            )}
            {getBatchDetails !== "All" && (
              <TableRow>
                <StyledTableCell>Batch Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Full Name</StyledTableCell>
                <StyledTableCell align="left">
                  Attendance Status
                </StyledTableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {filterStudent &&
              getStudent.map((student) => (
                <StyledTableRow key={student._id}>
                  <StyledTableCell component="th" scope="row">
                    {student.batchName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.fullname}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <FormControl>
                     
                      <RadioGroup
                      row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Present"
                        name="radio-buttons-group"
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
                  </StyledTableCell>
                </StyledTableRow>
              ))}

            {getBatchDetails === "All" &&
              allStudent.map((student) => (
                <StyledTableRow key={student._id}>
                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {student.courseName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.email}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.fullname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {student.phoneNo}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {format(new Date(student.accountCreated), "d-M-Y")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Students;