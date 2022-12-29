import React, { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";
import Person3Icon from "@mui/icons-material/Person3";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserContext from "../../context/UserContext";
import "./sidebar.scss";
import RegisterNewUser from "../../modals/RegisterNewUser";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Logo from "../../assets/images/logo.png"
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCookies } from "react-cookie";

const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.color,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const Sidebar = ({ getData }) => {
  const theme = useTheme();
  const ctx = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [modelType, setModelType] = useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie , removeToken] = useCookies();
  console.log(cookies.userType)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const RegisterUser = () => {
    setRegister(true);
    setModelType("register");
  };
  const CancelRegister = () => {
    setRegister(false);
  };
  const uploadQuestion = () => {
    setRegister(true);
    setModelType("question");
  };
  const createBatch = () => {
    setRegister(true);
    setModelType("createBatch");
  };


  const menuHandeler = (type) => {
    getData(type);
    navigate(`/${type}`);
    // data = type;
  };
  const logOut = () => {
    
    removeToken("access_token");
    removeToken("refresh_token");
    removeToken("userId");
    removeToken("userLogged");
    removeToken("userType");
    removeToken("studentId");
    ctx.loginHandler({
      isLoggedIn: false,
    });
    navigate("/")
  } 
  return (
    <>
      {/* Header Starts */}
      <AppBar position="fixed" open={open} style={{backgroundColor: "#d81816"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} className="logo" alt="" />
          {/* <Logo sx={{ display: { xs: "flex" }, mr: 1 }} /> */}
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              
            </Button>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src="https://placeimg.com/640/480/any" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem onClick={() => navigate("/profile")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
             
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Header End */}
      {/* ============================================================== */}
      {/* Sidebar Starts */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="sidebar-avatar">
            <Avatar
              alt="Remy Sharp"
              src="https://placeimg.com/640/480/people"
            />
            <strong> {ctx.manage.userdetails.username}</strong>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={(e) => menuHandeler("dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                
                Dashboard
              </ListItemText>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => menuHandeler("students")} >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                
                Students
              </ListItemText>
            </ListItemButton>
            <Divider />
            {cookies.userType === "admin" && (
              <>
                <ListItemButton onClick={() => menuHandeler("faculty")}>
                  <ListItemIcon>
                    <Person3Icon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Faculty
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </>
            )}
            {cookies.userType === "admin" && (
              <>
                <ListItemButton onClick={() => menuHandeler("careerServices")}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Career Services
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </>
            )}
            {cookies.userType === "admin" && (
              <>
                <ListItemButton onClick={RegisterUser}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Register New Users
                  </ListItemText>
                </ListItemButton>

                <Divider />
              </>
            )}

            {cookies.userType === "faculty" && (
              <>
                <ListItemButton onClick={uploadQuestion}>
                  <ListItemIcon>
                    <DynamicFormIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Upload Question
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </>
            )}
            {cookies.userType === "faculty" && (
              <>
                <ListItemButton onClick={() => menuHandeler("attendance")}>
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Upload Attendance
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </>
            )}
            {cookies.userType === "faculty" && (
              <>
                <ListItemButton onClick={createBatch}>
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                    
                    Create New Batch
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </>
            )}
          </ListItem>
        </List>
      </Drawer>

      {/* Sidebar End */}

      <RegisterNewUser
        register={register}
        CancelRegister={CancelRegister}
        modelType={modelType}
      />
    </>
  );
};

export default Sidebar;
