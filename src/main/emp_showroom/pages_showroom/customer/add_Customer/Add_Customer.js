import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import "./Add_Customer.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function Add_Customer() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                className="txtt_nic"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="NIC"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address1"
                label="NIC Address"
                name="address"
                autoComplete="address"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                fullWidth
                id="address2"
                label="Address"
                name="address"
                autoComplete="address"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Mobile Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                required
                fullWidth
                id="mNumber"
                label="Mobile Number Home"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                fullWidth
                id="mNumber"
                label="Mobile Number Work"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Root to Home :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_rHome"
                autoComplete="rHome"
                name="rHome"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                id="rHome"
                label="Root to Home"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid className="txt_LabelsImg" item xs={12} sm={1}>
              Image :
            </Grid>
            <Grid item xs={12} sm={6}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar_uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" className="image" />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className="btn_ClearCustomer"
            endIcon={<ClearOutlinedIcon />}
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
                className="txtt_nic"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="NIC"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="NIC Address"
                name="email"
                autoComplete="email"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Address"
                name="email"
                autoComplete="email"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Mobile Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                required
                fullWidth
                id="mNumber"
                label="Mobile Number Home"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                fullWidth
                id="mNumber"
                label="Mobile Number work"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              className="btn_Cleartrustee"
              endIcon={<ClearOutlinedIcon />}
            >
              Clear All
            </Button>
          </Grid> */}
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
                className="txtt_nic"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="NIC"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={7}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Primary Contact :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fName"
                label="First Name"
                name="fName"
                autoComplete="fname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="NIC Address"
                name="email"
                autoComplete="email"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 2 :
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Address"
                name="email"
                autoComplete="email"
                size="small"
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Mobile Number :
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                required
                fullWidth
                id="mNumber"
                label="Mobile Number Home"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                className="txt_Number"
                autoComplete="mNumber"
                name="mNumber"
                variant="outlined"
                fullWidth
                id="mNumber"
                label="Mobile Number work"
                autoFocus
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}></Grid>
            {/* <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                color="primary"
                className="btn_Cleartrustee"
                endIcon={<ClearOutlinedIcon />}
              >
                Clear All
              </Button>
            </Grid> */}
          </Grid>

          {/* 2nd trustee form END */}
          <Button
            variant="contained"
            color="primary"
            className="btn_MakeCustomer"
            endIcon={<DoneIcon />}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
