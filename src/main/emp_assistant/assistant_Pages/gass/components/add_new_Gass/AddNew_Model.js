import React, { useState } from "react";
import { TextField, Button, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import "react-notifications/lib/notifications.css";

// styles
import "./AddNew_Model.css";

export default function AddNew_Model() {
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Container component="main" className="main_container_addGass">
      <Typography className="title_sarani" variant="h5" gutterBottom>
        Add New Gass
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Weight :
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl variant="outlined" className="fcontrol">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Weight
                </InputLabel>
                <Select
                  size="small"
                  native
                  value={state.age}
                  onChange={handleChange}
                  label="Weight"
                  inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>12.5 kg</option>
                  <option value={20}>5 kg</option>
                  <option value={30}>2.5 kg</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Qty :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="weight"
                variant="outlined"
                required
                fullWidth
                id="weight"
                label="Weight"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Price :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_nic"
                autoComplete="weight"
                name="weight"
                variant="outlined"
                required
                fullWidth
                id="weight"
                label="Weight"
                autoFocus
                size="small"
                type="number"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={5}></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="primary" className="btn_done">
                Done
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
