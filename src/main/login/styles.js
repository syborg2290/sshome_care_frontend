import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  // container: {
  //   height: "100vh",
  //   width: "100vw",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  // },
  // logotypeContainer: {
  //   backgroundColor: theme.palette.primary.main,
  //   width: "60%",
  //   height: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   [theme.breakpoints.down("md")]: {
  //     width: "50%",
  //   },
  //   [theme.breakpoints.down("md")]: {
  //     display: "none",
  //   },
  // },
  // logotypeImage: {
  //   width: 165,
  //   marginBottom: theme.spacing(4),
  // },
  // logotypeText: {
  //   color: "white",
  //   fontWeight: 500,
  //   fontSize: 84,
  //   [theme.breakpoints.down("md")]: {
  //     fontSize: 48,
  //   },
  // },

  form: {
    width: 320,
  },

  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },

  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
