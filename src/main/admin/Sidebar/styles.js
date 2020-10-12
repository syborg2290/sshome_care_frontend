import { makeStyles } from "@material-ui/styles";


const drawerWidth = 250;

export default makeStyles((theme) => ({
  // menuButton: {
  //   marginLeft: 12,
  //   marginRight: 36,
  // },
  // hide: {
  //   display: "none",
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    // backgroundColor: "#222A44",
  },

  drawerOpen: {
    color: "white",
    backgroundColor: "#222A44",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#222A44",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 10,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
  },
  sidebarList: {
    marginTop: theme.spacing(6),
  },
  // toolbar: {
  //   ...theme.mixins.toolbar,
  //   [theme.breakpoints.down("sm")]: {
  //     display: "none",
  //   },
  // },

  //   content: {
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //   },
  //  sidebarList: {
  //     marginTop: theme.spacing(6),
  //   },
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  headerIcon:{
color:"white",
  }
}));

