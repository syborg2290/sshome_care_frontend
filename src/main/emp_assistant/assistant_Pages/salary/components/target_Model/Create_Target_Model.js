import React, { useState } from "react";
import { Modal, DatePicker, Space,Radio  } from "antd";

import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Select,
   FormControl,
     InputLabel,
} from "@material-ui/core";
import { Spin } from "antd";

export default function Create_Target_Model() {

        const [amount, setAmount] = useState("");

    return (
       <Container component="main" className="conctainefr_main">
          <Typography className="titleffs" variant="h5" gutterBottom>
                Make Salary
      </Typography>
             <Grid item xs={12} sm={12}>
        <hr className="titl_hr" />
            </Grid>
            <div className="paper">
                <form className="form" noValidate>
           <Grid container spacing={2}>
            <Grid className="lbl_topi" item xs={12} sm={4}>
           Target Amount(LKR)
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                autoComplete="bsly"
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Target Amount"
                size="small"
                 InputProps={{ inputProps: { min: 0 } }}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              </Grid>
         <Grid className="lbl_topi" item xs={12} sm={4}>
         Type
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                <FormControl variant="outlined" className="fcontrol">
                  <InputLabel
                    className="rolllbl_selector"
                    htmlFor="outlined-age-native-simple"
                  >
                   {/* Type */}
                  </InputLabel>
                  <Select
                    className="roll_selector"
                    size="small"
                    native
                    // onChange={handleChangeWeight}
                  >
                      <option>shop</option>
                      <option>F/B</option>
                       <option>F/D</option>
                 
                  </Select>
                </FormControl>
              </Space>
             </Grid>
        <Grid className="lbl_topi" item xs={12} sm={4}>
         Start Date
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                  <DatePicker />
                   
              </Space>
              </Grid>

           <Grid className="lbl_topi" item xs={12} sm={4}>
         End Date
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Space direction="vertical">
                  <DatePicker />
                   
              </Space>
                        </Grid>
                         <Grid className="lbl_topi" item xs={12} sm={4}>
           Target Type
          </Grid>
            <Grid item xs={12} sm={1}>
              :
            </Grid>
            <Grid item xs={12} sm={7}>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">Sale Target</Radio.Button>
                    <Radio.Button value="b">Cash Target</Radio.Button>
      
            </Radio.Group>
              </Grid>
            </Grid>
       <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_update"
                // onClick={btnUpdate}
               
              >
              Done
              </Button>
            </Grid>
          </Grid>
                  </form>
             </div>
        </Container>
    )
}