import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  FormControl,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import {  Spin, DatePicker, Space } from "antd";


// icons
import { CloseOutlined } from "@ant-design/icons";

import firebase from "firebase";
import db from "../../../../../../../config/firebase";

// styles
import "./Selected_Item.css";

export default function Selected_Item() {
    const [selectedType, setSelectedType] = useState("shop");
    const [qty, setQty] = useState(0);
    const [allRoot, setAllRoot] = useState([]);
    // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  // eslint-disable-next-line
  const [date, setDate] = useState(null);

    const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

   useEffect(() => {
   
    db.collection("root")
      .get()
      .then((re) => {
        var rawRoot = [];
        re.docs.forEach((each) => {
          rawRoot.push(each.data().root);
        });
        setAllRoot(rawRoot);
      });

    // eslint-disable-next-line
  }, []);

  
  // const removeItems = (i, itemId) => {
  //   var itemsDataLength = itemsData.length;
  //   let index = itemsData.indexOf((re) => re.id === itemId);
  //   itemsData.splice(index, 1);
  //   setItemsData([...itemsData]);
  //   itemsDataLength = itemsDataLength - 1;
  //   if (itemsDataLength === 0) {
  //     closeModel();
  //   }
  // };

    return (
        <Container component="main" className="main_container_root">
       <Typography className="title_root" variant="h5" gutterBottom>
               Selected Items
      </Typography>
            <Grid item xs={12} sm={2}>
        <hr className="titles_hr_root" />
            </Grid>
            <div className="paper_root">
                <form className="form_root" noValidate>
                  <Grid container spacing={2}>
                  <Grid className="txt_Labels_root" item xs={12} sm={4}>
                     Bed Sheet 
                 </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                className="manage_qty"
                autoComplete="mQty"
                name="mQty"
                variant="outlined"
                required
                type="number"
                id="mQty"
                label="Qty"
                autoFocus
                  size="small"
                  InputProps={{ inputProps: { min: 0 } }}
                    value={qty}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setQty(parseInt(e.target.value.trim()));
                    }
                  }}
              
              />
                        </Grid>
              <Grid item xs={12} sm={4}>
                <span className="icons_Close">
                <CloseOutlined />
                </span>
                          </Grid>
                      </Grid>
            {/* <p className="validate_updateRoot">{validation}</p> */}
            <Grid className="hr-yt" item xs={12} sm={12}><hr /></Grid>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                      Select a type
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Space direction="vertical">
                        <FormControl variant="outlined" className="fcontrol">
                          <Select
                            className="roll_selector"
                            size="small"
                            native
                            onChange={handleChange}
                            value={selectedType}
                    >
                           <option onChange={handleChange} value={"main"}>
                              main
                            </option>
                            <option onChange={handleChange} value={"shop"}>
                              shop
                            </option>
                           
                            {allRoot.map((each) => (
                              <option
                                onChange={handleChange}
                                key={each}
                                value={each}
                              >
                                {each}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Space>
                    </Grid>
              <Grid item xs={12} sm={1}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={4}>
              Date :
            </Grid>
            <Grid item xs={12} sm={8}>
              <DatePicker
                onChange={(e) => {
                  if (e !== null) {
                    setDate(firebase.firestore.Timestamp.fromDate(e.toDate()));
                  } else {
                    setDate(null);
                  }
                }}
              />
            </Grid>
              </Grid>

            
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            color="primary"
            className="btn_SelectdeDone"
           
          >
            {isLoadingSubmit ? <Spin size="large" /> : "Done"}
          </Button>
        </Grid>
      </Grid>
                 </form>
             </div>
         </Container>
    )
}
