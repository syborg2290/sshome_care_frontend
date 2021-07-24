import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Modal, Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { useLocation } from "react-router-dom";
import "./gas_customer.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import db from "../../../../../../config/firebase.js";

import { useHistory } from "react-router-dom";

export default function Add_Gas_Customer() {
  const location = useLocation();

  const [nic, setNic] = useState("");
  const [mid, setMid] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [root, setRoot] = useState("");
  // Customer Image 1st
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fromDbImage, setFromDbImage] = useState(null);
  // Customer Image 2nd
  const [imageFileCust2, setImageFileCust2] = useState(null);
  const [imageUrlCust2, setImageUrlCust2] = useState(null);
  const [fromDbImageCust2, setFromDbImageCust2] = useState(null);

  // Trustee1
  const [trustee1Nic, setTrustee1Nic] = useState("");
  const [trustee1Fname, setTrustee1Fname] = useState("");
  const [trustee1Lname, setTrustee1Lname] = useState("");
  const [trustee1Addres1, setTrustee1Addres1] = useState("");
  const [trustee1Addres2, setTrustee1Addres2] = useState("");
  const [trustee1Mobile1, setTrustee1Mobile1] = useState("");
  const [trustee1Mobile2, setTrustee1Mobile2] = useState("");
  // Trustee1 Image 1st
  const [imageFileT1, setImageFileT1] = useState(null);
  const [imageUrlT1, setImageUrlT1] = useState(null);
  const [fromDbImageT1, setFromDbImageT1] = useState(null);
  // Trustee1 Image 2nd
  const [imageFileT12, setImageFileT12] = useState(null);
  const [imageUrlT12, setImageUrlT12] = useState(null);
  const [fromDbImageT12, setFromDbImageT12] = useState(null);

  // Trustee2
  const [trustee2Nic, setTrustee2Nic] = useState("");
  const [trustee2Fname, setTrustee2Fname] = useState("");
  const [trustee2Lname, setTrustee2Lname] = useState("");
  const [trustee2Address1, setTrustee2Address1] = useState("");
  const [trustee2Address2, setTrustee2Address2] = useState("");
  const [trustee2Mobile1, setTrustee2Mobile1] = useState("");
  const [trustee2Mobile2, setTrustee2Mobile2] = useState("");
  // Trustee2 Image 1st
  const [imageFileT2, setImageFileT2] = useState(null);
  const [imageUrlT2, setImageUrlT2] = useState(null);
  const [fromDbImageT2, setFromDbImageT2] = useState(null);
  // Trustee2 Image 2nd
  const [imageFileT22, setImageFileT22] = useState(null);
  const [imageUrlT22, setImageUrlT22] = useState(null);
  const [fromDbImageT22, setFromDbImageT22] = useState(null);
  // eslint-disable-next-line
  const [loaderModalOpenV, setloaderModalOpen] = useState(false);
  const [inputsNic, setInputsNic] = useState({});
   // eslint-disable-next-line
  const [isItNull, setIsItNull] = useState(null);

  let history = useHistory();

  useEffect(() => {
    var passedObj = location.state?.detail;
    setIsItNull(passedObj);

    window.addEventListener("offline", function (e) {
      history.push("/admin/ui/gass");
    });
    // eslint-disable-next-line
  }, []);

  
  // Customer Image 1st
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImage(null);
    }
  };

  // Customer Image 2nd

  const onImageChangeCust2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFileCust2(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlCust2(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImageCust2(null);
    }
  };

  // Trustee1 Image 1st
  const onImageChangeT1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFileT1(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlT1(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImageT1(null);
    }
  };

  // Trustee1 Image 2nd
  const onImageChangeT12 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFileT12(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlT12(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImageT12(null);
    }
  };

  // Trustee2 Image 1st
  const onImageChangeT2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFileT2(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlT2(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImageT2(null);
    }
  };
  // Trustee2 Image 2nd
  const onImageChangeT22 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFileT22(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlT22(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setFromDbImageT22(null);
    }
  };

  const submit = () => {
    if (nic.length > 0) {
      if (mid.length > 0) {
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
                          db.collection("gas_trustee")
                            .where("nic", "==", trustee1Nic.trim())
                            .get()
                            .then((trustee1Doc) => {
                              db.collection("gas_trustee")
                                .where("nic", "==", trustee2Nic.trim())
                                .get()
                                .then((trustee2Doc) => {
                                  db.collection("gas_customer")
                                    .where("nic", "==", nic.trim())
                                    .get()
                                    .then((doc) => {
                                      var customerObj = {
                                        customerId:
                                          doc.docs.length === 0
                                            ? null
                                            : doc.docs[0].id,
                                        trustee1Id:
                                          trustee1Doc.docs.length === 0
                                            ? null
                                            : trustee1Doc.docs[0].id,
                                        trustee2Id:
                                          trustee2Doc.docs.length === 0
                                            ? null
                                            : trustee2Doc.docs[0].id,
                                        customerNic: nic.trim(),
                                        mid:
                                          doc.docs.length === 0
                                            ? mid.trim()
                                            : doc.docs[0].data().mid,
                                        customerFname: fname.trim(),
                                        customerLname: lname.trim(),
                                        customerAddress1: addres1.trim(),
                                        customerAddress2: addres2.trim(),
                                        customerRootToHome: root.trim(),
                                        customerMobile1: mobile1.trim(),
                                        customerMobile2: mobile2.trim(),
                                        customerRelatedNics: inputsNic,
                                        //++++++++++++++++++++++++++++++
                                        customerImageUrlFront: imageUrl,
                                        customerImageFileFront: imageFile,
                                        customerImageUrl2Back: imageUrlCust2,
                                        customerImageFile2Back: imageFileCust2,
                                        trustee1ImageFile1Front: imageFileT1,
                                        trustee1ImageUrl1Front: imageUrlT1,
                                        trustee1ImageFile2Back: imageFileT12,
                                        trustee1ImageUrl2Back: imageUrlT12,
                                        trustee2ImageFile1Front: imageFileT2,
                                        trustee2ImageUrl1Front: imageUrlT2,
                                        trustee2ImageFile2Back: imageFileT22,
                                        trustee2ImageUrl2Back: imageUrlT22,
                                        //++++++++++++++++++++++++++++++
                                        trustee1Nic: trustee1Nic.trim(),
                                        trustee1Fname: trustee1Fname.trim(),
                                        trustee1Lname: trustee1Lname.trim(),
                                        trustee1Address1: trustee1Addres1.trim(),
                                        trustee1Address2: trustee1Addres2.trim(),
                                        trustee1Mobile1: trustee1Mobile1.trim(),
                                        trustee1Mobile2: trustee1Mobile2.trim(),
                                        trustee2Nic: trustee2Nic.trim(),
                                        trustee2Fname: trustee2Fname.trim(),
                                        trustee2Lname: trustee2Lname.trim(),
                                        trustee2Address1: trustee2Address1.trim(),
                                        trustee2Address2: trustee2Address2.trim(),
                                        trustee2Mobile1: trustee2Mobile1.trim(),
                                        trustee2Mobile2: trustee2Mobile2.trim(),
                                      };

                                      var passedObj = location.state?.detail;

                                      passedObj[0].customer = customerObj;

                                      let moveWith = {
                                        pathname: "/admin/ui/Gass_invoice",
                                        search: "?query=abc",
                                        state: { detail: passedObj },
                                      };

                                      history.push(moveWith);
                                    });
                                });
                            });
                        } else {
                          NotificationManager.info(
                            "Trustee 1's contact number is required!"
                          );
                        }
                      } else {
                        NotificationManager.info(
                          "Trustee 1's address is required!"
                        );
                      }
                    } else {
                      NotificationManager.info(
                        "Trustee 1's last name is required!"
                      );
                    }
                  } else {
                    NotificationManager.info(
                      "Trustee 1's first name is required!"
                    );
                  }
                } else {
                  NotificationManager.info("Trustee 1's NIC is required!");
                }
              } else {
                NotificationManager.info(
                  "Customer's contact number is required!"
                );
              }
            } else {
              NotificationManager.info("Customer's address is required!");
            }
          } else {
            NotificationManager.info("Customer's last name is required!");
          }
        } else {
          NotificationManager.info("Customer's first name is required!");
        }
      } else {
        NotificationManager.info("Customer's MID is required!");
      }
    } else {
      NotificationManager.info("Customer's NIC is required!");
    }
  };

  const addInput = () => {
    setInputsNic({ ...inputsNic, [Object.keys(inputsNic).length]: "" });
  };
  const handleChangeAddNicInputs = (e) => {
    setInputsNic({ ...inputsNic, [e.target.id]: e.target.value });
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
              <h3>Checking the status...</h3>
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
                  id="niccustomer"
                  label="NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setNic(e.target.value.trim());
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={4}>
                # Press Enter key to check the customer
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={1}>
                Member ID :
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={2}>
                <TextField
                  disabled={nic.length === 0 ? true : false}
                  variant="outlined"
                  required
                  fullWidth
                  id="mid"
                  label="MID"
                  name="mid"
                  autoComplete="mid"
                  size="small"
                  value={mid}
                  onChange={(e) => {
                    setMid(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
                Customer Name :
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
                    setMobile1(e.target.value.trim());
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
                    setMobile2(e.target.value.trim());
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
                Root to Home :
              </Grid>
              <Grid item xs={12} sm={5}>
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
              <Grid item xs={12} sm={5}></Grid>
              {/* image 1 */}
              <Grid className="txt_LabelsImg" item xs={12} sm={1}>
                Image :
              </Grid>
              <Grid item xs={12} sm={5}>
                <input
                  type="file"
                  disabled={nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChange}
                  className="imagess"
                  id="item_image"
                  hidden
                />
                <img
                  disabled={nic.length === 0 ? true : false}
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("item_image").click();
                  }}
                  src={
                    imageUrl == null
                      ? fromDbImage !== null
                        ? fromDbImage
                        : require("../../../../../../assets/avatar1132.jpg")
                      : imageUrl
                  }
                  className="imageFrontAdd"
                />
                <br className="imagebr" />
                <p className="pTagImg">Image Front Side</p>
              </Grid>

              {/* image 2 */}

              <Grid item xs={12} sm={6}>
                <input
                  type="file"
                  disabled={nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChangeCust2}
                  className="imageBackAdd"
                  id="Cust2_image"
                  hidden
                />
                <img
                  disabled={nic.length === 0 ? true : false}
                  alt="Cust2 upload"
                  onClick={() => {
                    document.getElementById("Cust2_image").click();
                  }}
                  src={
                    imageUrlCust2 == null
                      ? fromDbImageCust2 !== null
                        ? fromDbImageCust2
                        : require("../../../../../../assets/avater232.jpg")
                      : imageUrlCust2
                  }
                  className="imageBackAdd"
                />
                <br className="imagebr" />
                <p className="pTagImg">Image Back Side</p>
              </Grid>
              {/* <Grid item xs={12} sm={5}></Grid> */}
            </Grid>
            <Typography className="note_title" gutterBottom>
              Add Family related NIC numbers
            </Typography>
            <Grid item xs={12} sm={2}>
              <hr className="titles_hr" />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <div>
                  <Button className="reltion_add" onClick={addInput}>
                    Relation's NIC
                    <PlusOutlined className="reltion_addIcon" />
                  </Button>
                  {Object.keys(inputsNic).map((i) => (
                    <div key={i + 1}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_relation"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Relations"
                        onChange={handleChangeAddNicInputs}
                        size="small"
                      />

                      {i >= Object.keys(inputsNic).length - 1 ? (
                        <MinusCircleOutlined
                          key={i + 3}
                          className="rmov_icon"
                          onClick={() => {
                            delete inputsNic[i];
                            setInputsNic({ ...inputsNic });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </Grid>
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
                setMid("");
                setImageFile(null);
                setImageUrl(null);
                setFromDbImage(null);
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
                  id="nic1trustee"
                  label="NIC"
                  size="small"
                  onChange={(e) => {
                    setTrustee1Nic(e.target.value.trim());
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
                  size="small"
                  onChange={(e) => {
                    setTrustee1Mobile1(e.target.value.trim());
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
                  size="small"
                  onChange={(e) => {
                    setTrustee1Mobile2(e.target.value.trim());
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              {/* image 1 */}
              <Grid className="txt_LabelsImg" item xs={12} sm={2}>
                Image :
              </Grid>
              <Grid item xs={12} sm={5}>
                <input
                  type="file"
                  disabled={trustee1Nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChangeT1}
                  className="imagess"
                  id="T1_image"
                  hidden
                />
                <img
                  disabled={trustee1Nic.length === 0 ? true : false}
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("T1_image").click();
                  }}
                  src={
                    imageUrlT1 == null
                      ? fromDbImageT1 !== null
                        ? fromDbImageT1
                        : require("../../../../../../assets/avatar1132.jpg")
                      : imageUrlT1
                  }
                  className="imageFrontAdd"
                />
                <br className="imagebr" />
                <p className="pTagImg">Image Front Side</p>
              </Grid>

              {/* image 2 */}

              <Grid item xs={12} sm={5}>
                <input
                  type="file"
                  disabled={trustee1Nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChangeT12}
                  className="image"
                  id="T12_image"
                  hidden
                />
                <img
                  disabled={trustee1Nic.length === 0 ? true : false}
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("T12_image").click();
                  }}
                  src={
                    imageUrlT12 == null
                      ? fromDbImageT12 !== null
                        ? fromDbImageT12
                        : require("../../../../../../assets/avater232.jpg")
                      : imageUrlT12
                  }
                  className="imageBackAdd"
                />
                <br className="imagebr" />
                <p className="pTagImg">Image Back Side</p>
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
                  id="nic2trustee"
                  label="NIC"
                  size="small"
                  onChange={(e) => {
                    setTrustee2Nic(e.target.value.trim());
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
                    setTrustee2Mobile1(e.target.value.trim());
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
                    setTrustee2Mobile2(e.target.value.trim());
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              {/* image 1 */}
              <Grid className="txt_LabelsImg" item xs={12} sm={2}>
                Image :
              </Grid>
              <Grid item xs={12} sm={5}>
                <input
                  type="file"
                  disabled={trustee2Nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChangeT2}
                  className="imagess"
                  id="T2_image"
                  hidden
                />
                <img
                  disabled={trustee2Nic.length === 0 ? true : false}
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("T2_image").click();
                  }}
                  src={
                    imageUrlT2 == null
                      ? fromDbImageT2 !== null
                        ? fromDbImageT2
                        : require("../../../../../../assets/avatar1132.jpg")
                      : imageUrlT2
                  }
                  className="imageFrontAdd"
                />
                <br />
                <p className="pTagImg">Image Front Side</p>
              </Grid>

              {/* image 2 */}

              <Grid item xs={12} sm={5}>
                <input
                  type="file"
                  disabled={trustee2Nic.length === 0 ? true : false}
                  accept="image/*"
                  name=""
                  onChange={onImageChangeT22}
                  className="image"
                  id="T22_image"
                  hidden
                />
                <img
                  disabled={trustee2Nic.length === 0 ? true : false}
                  alt="Item upload"
                  onClick={() => {
                    document.getElementById("T22_image").click();
                  }}
                  src={
                    imageUrlT22 == null
                      ? fromDbImageT22 !== null
                        ? fromDbImageT22
                        : require("../../../../../../assets/avater232.jpg")
                      : imageUrlT22
                  }
                  className="imageBackAdd"
                />
                <br className="imagebr" />
                <p className="pTagImg">Image Back Side</p>
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
