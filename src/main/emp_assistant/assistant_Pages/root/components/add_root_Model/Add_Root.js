import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Spin } from "antd";
import { Checkbox } from "antd";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// eslint-disable-next-line
import { nicValidation } from "../../../../../../config/validation.js";
// eslint-disable-next-line
import db from "../../../../../../config/firebase.js";
import "react-notifications/lib/notifications.css";

// styles
import "./Add_Root.css";

export default function Add_Root() {
  const [rootName, setRootName] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line
  const [employeeName, setEmployeeName] = useState("");
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [state, setState] = React.useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <Container component="main" className="main_container_root">
      <Typography className="title_root" variant="h5" gutterBottom>
        Add Root
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_root" />
      </Grid>
      <div className="paper_root">
        <form className="form_root" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels_root" item xs={12} sm={4}>
              Root Name:
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txt_nic_root"
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Root Name"
                autoFocus
                size="small"
                value={rootName}
                onChange={(e) => {
                  setRootName(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="txt_descriptin_root" item xs={12} sm={4}>
              Description:
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                className="txt_discp_root"
                autoComplete="description"
                name="description"
                variant="outlined"
                required
                multiline
                rows={6}
                fullWidth
                id="description"
                label="Description"
                size="small"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels_root" item xs={12} sm={4}>
              Assigne Employee:
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Employee 1
                </InputLabel>
                <Select native onChange={handleChange} label="Name">
                  <option value={10}>Namal Perera</option>
                  <option value={20}>Kumara Soiza</option>
                  <option value={30}>Ajith Muthukumara</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels_root" item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={5}>
              <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Employee 2
                </InputLabel>
                <Select native onChange={handleChange} label="Name">
                  <option value={20}>Kumara Soiza</option>
                  <option value={10}>Namal Perera</option>
                  <option value={30}>Ajith Muthukumara</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>

            <Grid className="txt_dayTopic_root" item xs={12} sm={4}>
              Select Days:
              <br />
              <hr />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_days_root" item xs={12} sm={4}>
              Monday:
              <br />
              Tuesday:
              <br />
              Wednesday:
              <br />
              Thursday:
              <br />
              Friday:
              <br />
              Saturday:
              <br />
              Sunday:
            </Grid>
            <Grid item xs={12} sm={5} className="txt_days_root_Checkbox">
              <Checkbox />
              <br />
              <Checkbox />
              <br />
              <Checkbox />
              <br />
              <Checkbox />
              <br />
              <Checkbox />
              <br />
              <Checkbox />
              <br />
              <Checkbox />
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
        </form>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="btn_addRoot"
            // onClick={submit}
            disabled={rootName.length === 0 || description.length === 0}
          >
            {isLoadingSubmit ? <Spin size="large" /> : "Done"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
