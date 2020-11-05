import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

// import NativeSelect from "@material-ui/core/NativeSelect";
import {
  TextField,
  Grid,
  Container,
  Typography,
  // Button,
  Select,
} from "@material-ui/core";

import "./Gass_Model.css";

export default function Gass_Model() {
  const [state, setState] = useState({
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
    <Container component="main" className="conctainefr_main">
      <Typography className="titleffs" variant="h5" gutterBottom>
        Sell
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Type
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl size="small" className="select_type">
                <InputLabel
                  className="select_label_type"
                  id="demo-controlled-open-select-label"
                >
                  Type
                </InputLabel>
                <Select
                  native
                  variant="outlined"
                  // value={state.age}
                  onChange={handleChange}
                  label="Type"
                  inputProps={{
                    name: "type",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}>
              Qty
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                label="Qty"
                name="qty"
                autoComplete="qty"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={4}>
              Total Price(LKR)
            </Grid>
            <Grid item xs={12} sm={4}>
              <p className="price">1600.00</p>
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
