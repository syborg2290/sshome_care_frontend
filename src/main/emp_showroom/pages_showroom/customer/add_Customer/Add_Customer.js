import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import "./Add_Customer.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function Add_Customer() {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const [nic, setNic] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [root, setRoot] = useState("");
  // eslint-disable-next-line
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [trustee1Nic, setTrustee1Nic] = useState("");
  const [trustee1Fname, setTrustee1Fname] = useState("");
  const [trustee1Lname, setTrustee1Lname] = useState("");
  const [trustee1Addres1, setTrustee1Addres1] = useState("");
  const [trustee1Addres2, setTrustee1Addres2] = useState("");
  const [trustee1Mobile1, setTrustee1Mobile1] = useState("");
  const [trustee1Mobile2, setTrustee1Mobile2] = useState("");

  const [trustee2Nic, setTrustee2Nic] = useState("");
  const [trustee2Fname, setTrustee2Fname] = useState("");
  const [trustee2Lname, setTrustee2Lname] = useState("");
  const [trustee2Address1, setTrustee2Address1] = useState("");
  const [trustee2Address2, setTrustee2Address2] = useState("");
  const [trustee2Mobile1, setTrustee2Mobile1] = useState("");
  const [trustee2Mobile2, setTrustee2Mobile2] = useState("");
  // eslint-disable-next-line
  const valuesInitialState = () => {
    setNic("");
    setFirstName("");
    setLastName("");
    setAddres1("");
    setAddres2("");
    setMobile1("");
    setMobile2("");
    setRoot("");
    setTrustee1Nic("");
    setTrustee1Fname("");
    setTrustee1Lname("");
    setTrustee1Addres1("");
    setTrustee1Addres2("");
    setTrustee1Mobile1("");
    setTrustee1Mobile2("");
    setTrustee2Nic("");
    setTrustee2Fname("");
    setTrustee2Lname("");
    setTrustee2Address1("");
    setTrustee2Address2("");
    setRoot("");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // let imageDownloadUrl = "null";
  //                   if (imageFile !== null) {
  //                     const formData = new FormData();
  //                     const options = {
  //                       maxSizeMB: 1,
  //                       maxWidthOrHeight: 1920,
  //                       useWebWorker: true,
  //                     };
  //                     const compressedFile = await imageCompression(
  //                       imageFile,
  //                       options
  //                     );
  //                     formData.append("image", compressedFile);
  //                     const configFile = {
  //                       headers: {
  //                         "content-type": "multipart/form-data",
  //                       },
  //                     };

  const submit = () => {
    if (nic.length > 0) {
      if (fname.length > 0) {
        if (lname.length > 0) {
          if (addres1.length > 0) {
            if (mobile1.length > 0) {
              //Rest of gurantees
            } else {
              NotificationManager.info(
                "Customer contact number is required!",
                "Remember validations"
              );
            }
          } else {
            NotificationManager.info(
              "Customer address is required!",
              "Remember validations"
            );
          }
        } else {
          NotificationManager.info(
            "Customer last name is required!",
            "Remember validations"
          );
        }
      } else {
        NotificationManager.info(
          "Customer first name is required!",
          "Remember validations"
        );
      }
    } else {
      NotificationManager.info(
        "Customer nic is required!",
        "Remember validations"
      );
    }
  };

  return (
    <Container component="main" className="main_container">
      {/* <CssBaseline /> */}
      <Typography className="titles" variant="h5" gutterBottom>
        Add Customer
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={nic}
                className="txtt_nic"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
                onChange={(e) => {
                  setNic(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={fname}
                disabled={nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={lname}
                disabled={nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={addres1}
                disabled={nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="address1"
                label="NIC Address"
                name="address"
                autoComplete="address"
                size="small"
                onChange={(e) => {
                  setAddres1(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={addres2}
                disabled={nic.length === 0 ? true : false}
                variant="outlined"
                fullWidth
                id="address2"
                label="Address"
                name="address"
                autoComplete="address"
                size="small"
                onChange={(e) => {
                  setAddres2(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Contact Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={mobile1}
                disabled={nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                type="number"
                variant="outlined"
                required
                fullWidth
                id="mNumber"
                label="Contact Number 1"
                size="small"
                onChange={(e) => {
                  setMobile1(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={mobile2}
                disabled={nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                type="number"
                fullWidth
                id="mNumber"
                label="Contact Number 2"
                size="small"
                onChange={(e) => {
                  setMobile2(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Root to Home :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={root}
                disabled={nic.length === 0 ? true : false}
                className="txt_rHome"
                autoComplete="rHome"
                name="rHome"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                id="rHome"
                label="Root to Home"
                size="small"
                onChange={(e) => {
                  setRoot(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_LabelsImg" item xs={12} sm={1}>
              Image :
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                disabled={nic.length === 0 ? true : false}
                accept="image/*"
                name=""
                onChange={onImageChange}
                className="image"
                id="item_image"
                hidden
              />
              <img
                disabled={nic.length === 0 ? true : false}
                alt="Item upload"
                style={{
                  borderRadius: "30px",
                  height: "100px",
                }}
                onClick={() => {
                  document.getElementById("item_image").click();
                }}
                src={
                  imageUrl == null
                    ? require("../../../../../assets/avatar.png")
                    : imageUrl
                }
                className="image"
              />
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className="btn_ClearCustomer"
            disabled={nic.length === 0 ? true : false}
            endIcon={<ClearOutlinedIcon />}
            onClick={() => {
              setNic("");
              setFirstName("");
              setLastName("");
              setAddres1("");
              setAddres2("");
              setMobile1("");
              setMobile2("");
              setRoot("");
            }}
          >
            Clear All
          </Button>
          <hr className="hr" />

          {/* 1st trustee form START */}
          <Typography className="titles" variant="h5" gutterBottom>
            Trustee Details
          </Typography>
          <Grid item xs={12} sm={2}>
            <hr className="titles_hr" />
          </Grid>
          <Typography className="trustee_title" variant="h6" gutterBottom>
            1st Trustee:
          </Typography>
          <Grid className="trustee_container" container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee1Nic}
                className="txtt_nic"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
                onChange={(e) => {
                  setTrustee1Nic(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee1Fname}
                disabled={trustee1Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
                onChange={(e) => {
                  setTrustee1Fname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee1Lname}
                disabled={trustee1Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
                onChange={(e) => {
                  setTrustee1Lname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={trustee1Addres1}
                disabled={trustee1Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="nicaddress"
                label="NIC Address"
                name="nicaddress"
                autoComplete="nicaddress"
                size="small"
                onChange={(e) => {
                  setTrustee1Addres1(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={trustee1Addres2}
                disabled={trustee1Nic.length === 0 ? true : false}
                variant="outlined"
                fullWidth
                id="email"
                label="Address"
                name="email"
                autoComplete="email"
                size="small"
                onChange={(e) => {
                  setTrustee1Addres2(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Contact Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee1Mobile1}
                disabled={trustee1Nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                type="number"
                required
                fullWidth
                id="mNumber"
                label="Contact Number 1"
                autoFocus
                size="small"
                onChange={(e) => {
                  setTrustee1Mobile1(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee1Mobile2}
                disabled={trustee1Nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                type="number"
                variant="outlined"
                fullWidth
                id="mNumber"
                label="Contact Number 2"
                autoFocus
                size="small"
                onChange={(e) => {
                  setTrustee1Mobile2(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>

          {/* 1st trustee form END */}

          {/* 2nd trustee form START */}
          <Typography className="trustee_title" variant="h6" gutterBottom>
            2nd Trustee :
          </Typography>
          <Grid className="trustee_container" container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee2Nic}
                className="txtt_nic"
                autoComplete="nic"
                name="nic"
                variant="outlined"
                required
                fullWidth
                id="nic"
                label="NIC"
                autoFocus
                size="small"
                onChange={(e) => {
                  setTrustee2Nic(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee2Fname}
                disabled={trustee2Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
                onChange={(e) => {
                  setTrustee2Fname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee2Lname}
                disabled={trustee2Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
                onChange={(e) => {
                  setTrustee2Lname(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={trustee2Address1}
                disabled={trustee2Nic.length === 0 ? true : false}
                variant="outlined"
                required
                fullWidth
                id="nicaddress"
                label="NIC Address"
                name="nicaddress"
                autoComplete="nicaddress"
                size="small"
                onChange={(e) => {
                  setTrustee2Address1(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                value={trustee2Address2}
                disabled={trustee2Nic.length === 0 ? true : false}
                variant="outlined"
                fullWidth
                id="email"
                label="Address"
                name="email"
                autoComplete="email"
                size="small"
                onChange={(e) => {
                  setTrustee2Address2(e.target.value);
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Contact Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee2Mobile1}
                disabled={trustee2Nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                type="number"
                variant="outlined"
                required
                fullWidth
                id="mNumber"
                label="Contact Number 1"
                size="small"
                onChange={(e) => {
                  setTrustee2Mobile1(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={trustee2Mobile2}
                disabled={trustee2Nic.length === 0 ? true : false}
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                type="number"
                variant="outlined"
                fullWidth
                id="mNumber"
                label="Contact Number 2"
                size="small"
                onChange={(e) => {
                  setTrustee2Mobile2(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>

          {/* 2nd trustee form END */}
          <Button
            variant="contained"
            color="primary"
            className="btn_MakeCustomer"
            endIcon={<DoneIcon />}
            onClick={submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <NotificationContainer />
    </Container>
  );
}
