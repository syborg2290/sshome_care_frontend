import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Form, Modal, Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { useLocation } from "react-router-dom";
import "./Add_Customer.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { nicValidation } from "../../../../../config/validation.js";
import db from "../../../../../config/firebase.js";

export default function Add_Customer() {
  const location = useLocation();
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

  const [isValidatedCustomerNic, setisValidatedCustomerNic] = useState(false);
  const [isValidatedTrustee1Nic, setisValidatedTrustee1Nic] = useState(false);
  const [isValidatedTrustee2Nic, setisValidatedTrustee2Nic] = useState(false);

  const [loaderModalOpenV, setloaderModalOpen] = useState(false);

  const loaderModalClose = () => {
    setloaderModalOpen(false);
  };

  const loaderModalOpen = () => {
    setloaderModalOpen(true);
  };

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state ? location.state.detail : ""); // result: 'some_value'
  }, [location]);

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
    setImageFile(null);
    setImageUrl(null);
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
              if (trustee1Nic.length > 0) {
                if (trustee1Fname.length > 0) {
                  if (trustee1Lname.length > 0) {
                    if (trustee1Addres1.length > 0) {
                      if (trustee1Mobile1.length > 0) {
                        //Rest of code
                      } else {
                        NotificationManager.info(
                          "Trustee 1's contact number is required!",
                          "Remember validations"
                        );
                      }
                    } else {
                      NotificationManager.info(
                        "Trustee 1's address is required!",
                        "Remember validations"
                      );
                    }
                  } else {
                    NotificationManager.info(
                      "Trustee 1's last name is required!",
                      "Remember validations"
                    );
                  }
                } else {
                  NotificationManager.info(
                    "Trustee 1's first name is required!",
                    "Remember validations"
                  );
                }
              } else {
                NotificationManager.info(
                  "Trustee 1's NIC is required!",
                  "Remember validations"
                );
              }
            } else {
              NotificationManager.info(
                "Customer's contact number is required!",
                "Remember validations"
              );
            }
          } else {
            NotificationManager.info(
              "Customer's address is required!",
              "Remember validations"
            );
          }
        } else {
          NotificationManager.info(
            "Customer's last name is required!",
            "Remember validations"
          );
        }
      } else {
        NotificationManager.info(
          "Customer's first name is required!",
          "Remember validations"
        );
      }
    } else {
      NotificationManager.info(
        "Customer's NIC is required!",
        "Remember validations"
      );
    }
  };

  const customerNicValidation = (e) => {
    var enterKey = 13; //Key Code for Enter Key

    if (e.which === enterKey) {
      var result = nicValidation(e.target.value.trim());

      if (result) {
        loaderModalOpen();
        db.collection("customer")
          .where("nic", "==", e.target.value.trim())
          .get()
          .then((doc) => {
            if (doc.docs.length > 0) {
              setFirstName(doc.docs[0].data().fname);
              setLastName(doc.docs[0].data().lname);
              setAddres1(doc.docs[0].data().address1);
              setAddres2(doc.docs[0].data().address2);
              setMobile1(doc.docs[0].data().mobile1);
              setMobile2(doc.docs[0].data().mobile2);
              setRoot(doc.docs[0].data().root);
              setImageUrl(doc.docs[0].data().imgUrl);
              setisValidatedCustomerNic(true);
              loaderModalClose();
            } else {
              setisValidatedCustomerNic(true);
              loaderModalClose();
            }
          });
      } else {
        setisValidatedCustomerNic(false);
        NotificationManager.warning(
          "Customer's NIC format is invalid!",
          "Remember validations"
        );
      }
    }
  };

  const trustee1NicValidation = (e) => {
    var enterKey = 13; //Key Code for Enter Key
    if (e.which === enterKey) {
      var result = nicValidation(e.target.value);

      if (result) {
        loaderModalOpen();
        db.collection("trustee")
          .where("nic", "==", e.target.value.trim())
          .get()
          .then((doc) => {
            if (doc.docs.length > 0) {
              setTrustee1Fname(doc.docs[0].data().fname);
              setTrustee1Lname(doc.docs[0].data().lname);
              setTrustee1Addres1(doc.docs[0].data().address1);
              setTrustee1Addres2(doc.docs[0].data().address2);
              setTrustee1Mobile1(doc.docs[0].data().mobile1);
              setTrustee1Mobile2(doc.docs[0].data().mobile2);

              setisValidatedTrustee1Nic(true);
              loaderModalClose();
            } else {
              setisValidatedTrustee1Nic(true);
              loaderModalClose();
            }
          });
      } else {
        setisValidatedTrustee1Nic(false);
        NotificationManager.warning(
          "Trustee 1's NIC format is invalid!",
          "Remember validations"
        );
      }
    }
  };

  const trustee2NicValidation = (e) => {
    var enterKey = 13; //Key Code for Enter Key
    if (e.which === enterKey) {
      var result = nicValidation(e.target.value);

      if (result) {
        loaderModalOpen();
        db.collection("trustee")
          .where("nic", "==", e.target.value.trim())
          .get()
          .then((doc) => {
            if (doc.docs.length > 0) {
              setTrustee2Fname(doc.docs[0].data().fname);
              setTrustee2Lname(doc.docs[0].data().lname);
              setTrustee2Address1(doc.docs[0].data().address1);
              setTrustee2Address2(doc.docs[0].data().address2);
              setTrustee2Mobile1(doc.docs[0].data().mobile1);
              setTrustee2Mobile2(doc.docs[0].data().mobile2);

              setisValidatedTrustee2Nic(true);
              loaderModalClose();
            } else {
              setisValidatedTrustee2Nic(true);
              loaderModalClose();
            }
          });
      } else {
        setisValidatedTrustee2Nic(false);
        NotificationManager.warning(
          "Trustee 2's NIC format is invalid!",
          "Remember validations"
        );
      }
    }
  };

  return (
    <>
      <Modal
        title=""
        visible={loaderModalOpenV}
        footer={null}
        className="model_Loader"
        onCancel={null}
        closable={null}
        bodyStyle={null}
      >
        <div className="model_Loader_Model">
          <div className="model_Loader_Main">
            <div className="model_Loader_Detail">
              <Spin size="large" />
            </div>
          </div>
        </div>
      </Modal>

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
                  onKeyUp={customerNicValidation}
                  onChange={(e) => {
                    setNic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={7}>
                # Press Enter key after filled the NIC
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
                Primary Contact :
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={fname}
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
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
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
                  accept="image/*"
                  name=""
                  onChange={onImageChange}
                  className="image"
                  id="item_image"
                  hidden
                />
                <img
                  disabled={
                    nic.length === 0 || !isValidatedCustomerNic ? true : false
                  }
                  alt="Item upload"
                  // style={{
                  //   borderRadius: "30px",
                  //   height: "100px",
                  // }}
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
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Typography className="note_title" gutterBottom>
              Add Family related NIC Numbers
            </Typography>
            <Grid item xs={12} sm={2}>
              <hr className="titles_hr" />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Form name="dynamic_form" autoComplete="off">
                  <Form.List name="users">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          <Button
                            className="reltion_add"
                            onClick={() => {
                              add();
                            }}
                          >
                            Relations NIC
                            <PlusOutlined className="reltion_addIcon" />
                          </Button>
                          {fields.map((field) => (
                            <div>
                              <TextField
                                key={field.key}
                                className="txt_relation"
                                autoComplete="relation"
                                name="relation"
                                variant="outlined"
                                fullWidth
                                id="relation"
                                label="Relations"
                                size="small"
                              />

                              <MinusCircleOutlined
                                className="rmov_icon"
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </Form.List>
                </Form>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              className="btn_ClearCustomer"
              disabled={
                nic.length === 0 || !isValidatedCustomerNic ? true : false
              }
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
                setImageFile(null);
                setImageUrl(null);
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
                  onKeyUp={trustee1NicValidation}
                  onChange={(e) => {
                    setTrustee1Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={7}>
                # Press Enter key after filled the NIC
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
                Primary Contact :
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={trustee1Fname}
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee1Nic.length === 0 || !isValidatedTrustee1Nic
                      ? true
                      : false
                  }
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
                  onKeyUp={trustee2NicValidation}
                  onChange={(e) => {
                    setTrustee2Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={7}>
                # Press Enter key after filled the NIC
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
                Primary Contact :
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  value={trustee2Fname}
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
                  disabled={
                    trustee2Nic.length === 0 || !isValidatedTrustee2Nic
                      ? true
                      : false
                  }
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_MakeCustomer"
                  endIcon={<DoneIcon />}
                  onClick={submit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <NotificationContainer />
      </Container>
    </>
  );
}
