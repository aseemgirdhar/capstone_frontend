import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LoginUser } from "../../api/Api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useCookies } from "react-cookie";

import UserContext from "../../context/UserContext";

const theme = createTheme();
const Login = () => {
  const [cookies, setCookie] = useCookies();
  const ctx = useContext(UserContext);
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  let userIsLoggedIn = false;
  const [manageLogin, setManageLogin] = useState({
    email: "",
    password: "",
    type: "",
    errorMsg: "",
    isError: false,
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    console.log(event.target.value);
    setManageLogin((prev) => ({
      ...prev,
      type: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: manageLogin.email,
        password: manageLogin.password,
      };
      if (!data.email.length || !data.password.length) {
        console.log("here");
        alert("Please enter all required fields");
        return;
      }
      const res = await LoginUser(data, manageLogin.type);
      if (res.status === 200 && res.data) {
        userIsLoggedIn = true;
        ctx.loginHandler({
          isLoggedIn: true,
          userDetails: res.data.result,
          type: res.data.result.userType,
          token: res.data.token,
        });
        console.log("res.data.result" , res.data.result._id)
        let expires = new Date();
        expires.setTime(expires.getTime() + res.data.expires_in * 1000);
        setCookie("access_token", res.data.token, { path: "/", expires });
        setCookie("refresh_token", res.data.token, { path: "/", expires });
        setCookie("userType" , res.data.result.userType)
        setCookie("userId" , res.data.result._id)
        setCookie("userLogged" , userIsLoggedIn)
        navigate(`/dashboard`);
      }
    } catch (err) {
      setManageLogin((prev) => ({
        ...prev,
        isError: true,
        errorMsg: err.response.data,
      }));
    }

    // localStorage.setItem("user" , type);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://herovired.com/wp-content/uploads/2021/03/Vired-About-Us-Banner.png)",
            backgroundRepeat: "repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            {manageLogin.isError && (
              <Alert severity="error">{manageLogin.errorMsg}</Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) =>
                  setManageLogin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setManageLogin((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={manageLogin.type}
                  label="User Type"
                  onChange={handleChange}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="careerservice">Career Service</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
