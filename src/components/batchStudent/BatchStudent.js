import React, { useState , useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getAllBatch } from "../../api/Api";
import { styled } from '@mui/material/styles';
const theme = createTheme();

const BatchStudent = () => {
    const [getBatch , setgetBatch] = useState([])
  const handleSubmit = () => {
    console.log("sadasdsd");
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


  const batchList =  getAllBatch();
  
  useEffect(() => {

    

    batchList.then((res) => res.data)
     .then(getBatch =>  setgetBatch(getBatch))
     .catch((err) => {
       console.log(err);
     });

  }, [])
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
              style={{minWidth: 100 + "%"}}
            >
              <FormControl fullWidth margin="normal"  style={{minWidth: 100 + "%"}}>
                <InputLabel id="demo-simple-select-label">Select Batch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={getBatch.BatchName}
                  label="Tag Level"
                  onChange={() => setgetBatch(getBatch)}
                >
                    {/* { getBatch && getBatch.map((item) => console.log(item.BatchName) )} */}
                    { getBatch && getBatch.map((item) => <MenuItem key={item.BatchName} value={item.BatchName}>{item.BatchName}</MenuItem> )}
                    {/*  */}
                </Select>
              </FormControl>

              {/* {getBatch && getBatch.map((item) => <div>{item}</div>)} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Box>
  );
};

export default BatchStudent;
