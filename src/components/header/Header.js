import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
const drawerWidth = 240;
const Header = () => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
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

  //   const openedMixin = (theme) => ({
  //     width: drawerWidth,
  //     transition: theme.transitions.create('width', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     overflowX: 'hidden',
  //   });

  //   const closedMixin = (theme) => ({
  //     transition: theme.transitions.create('width', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     overflowX: 'hidden',
  //     width: `calc(${theme.spacing(7)} + 1px)`,
  //     [theme.breakpoints.up('sm')]: {
  //       width: `calc(${theme.spacing(8)} + 1px)`,
  //     },
  //   });

  //   const DrawerHeader = styled('div')(({ theme }) => ({
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'flex-end',
  //     padding: theme.spacing(0, 1),
  //     // necessary for content to be below app bar
  //     ...theme.mixins.toolbar,
  //   }));

  //   const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  //     ({ theme, open }) => ({
  //       width: drawerWidth,
  //       flexShrink: 0,
  //       whiteSpace: 'nowrap',
  //       boxSizing: 'border-box',
  //       ...(open && {
  //         ...openedMixin(theme),
  //         '& .MuiDrawer-paper': openedMixin(theme),
  //       }),
  //       ...(!open && {
  //         ...closedMixin(theme),
  //         '& .MuiDrawer-paper': closedMixin(theme),
  //       }),
  //     }),
  //   );


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

  return (
    <AppBar position="fixed" open={open}>
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
        <Typography variant="h6" noWrap component="div">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
