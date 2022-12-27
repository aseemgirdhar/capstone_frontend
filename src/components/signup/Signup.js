import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RegisterUser } from "../../api/Api";
import validator from "validator";
import { getAllBatch } from "../../api/Api";

const theme = createTheme();
const Signup = () => {
  const [getBatch, setgetBatch] = useState([]);
  const [fullname, setfullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setphone] = useState("");
  const [type, settype] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [batchName, setbatchName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const batchList = getAllBatch();
  
  let data = {
    batchName: batchName,
    fullname: fullname,
    username: username,
    phoneNo: phone,
    userType: type,
    email: email,
    password: password,
  };

  const validate = (value) => {
    setpassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };
  const changeHandeler = (e) => {
    setbatchName(e.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const registerUser =  RegisterUser(data, type)
    if (password.length < 8) {
      console.log(password.length, password);
      setErrorMessage("Password should be at least 8 characters");
    } else {
      registerUser.then((res) => res ,  event.target.reset())
      .catch((err) => console.error(err));
      setbatchName( event.target.reset());
      settype(event.target.reset())
    }
  };
  useEffect(() => {
    batchList
      .then((res) => res.data)
      .then((getBatch) => setgetBatch(getBatch))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // RegisterUser(data , type);
  // data = "";

  return (
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
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="FullName"
                label="Full Name"
                name="FullName"
                autoComplete="FullName"
                onChange={(e) => setfullname(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="User Name"
                name="UserName"
                autoComplete="UserName"
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                id="Phone"
                label="Phone"
                name="Phone"
                autoComplete="Phone"
                onChange={(e) => setphone(e.target.value)}
              />

              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => validate(e.target.value)}
              />
              <div>
                {errorMessage && errorMessage === "" ? null : (
                  <span
                    style={{
                      fontWeight: "normal",
                      fontSize: 14,
                      color: "red",
                    }}
                  >
                    {errorMessage}
                  </span>
                )}
              </div>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="batch"
                label="Batch Name"
                type="text"
                id="batch"
                onChange={(e) => setbatchName(e.target.value)}
              /> */}

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                  Batch Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={batchName}
                  label="Batch Name"
                  onChange={changeHandeler}
                >
                  {getBatch &&
                    getBatch.map((batch) => (
                      <MenuItem key={batch.BatchName} value={batch.BatchName}>
                        {batch.BatchName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="User Type"
                  onChange={(e) => settype(e.target.value)}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="careerService">Career Service</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register New User
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
