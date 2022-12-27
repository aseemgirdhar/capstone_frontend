import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createNewBatch } from "../../api/Api";

const theme = createTheme();

const CreateBatch = () => {
  const [batchName, setBatchName] = useState("");
  const [totalEnroll, setTotalEnroll] = useState("");
  const [startDate, setStartDate] = useState("");
  const [statusActive, setStatusActive] = useState("");
  const [dropout, setDropout] = useState("");
  
  let data = {
    BatchName: batchName,
    TotalEnroll: totalEnroll,
    StartDate: startDate,
    StatusActive: statusActive,
    Dropout: dropout,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBatch(data).then((res) => console.log(res) , e.target.reset())
    .catch((err) => console.error(err));
    // e.target.reset()
  }
  return (
    <div>

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
                id="BatchName"
                label="Batch Name"
                name="BatchName"
                autoComplete="BatchName"
                autoFocus
                onChange={(e) => setBatchName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="StartDate"
                label="Start Date"
                name="StartDate"
                autoComplete="StartDate"
                autoFocus
                onChange={(e) => setStartDate(e.target.value)}
              />

              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                id="TotalEnroll"
                label="Total Enroll"
                name="TotalEnroll"
                autoComplete="TotalEnroll"
                autoFocus
                onChange={(e) => setTotalEnroll(e.target.value)}
              />
              
              <TextField
                type="text"
                margin="normal"
                required
                fullWidth
                id="StatusActive"
                label="Status Active"
                name="StatusActive"
                autoComplete="StatusActive"
                autoFocus
                onChange={(e) => setStatusActive(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Dropout"
                label="Dropout"
                type="text"
                id="passwDropoutord"
                autoComplete="current-password"
                onChange={(e) => setDropout(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Batch
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    </div>
  )
}

export default CreateBatch