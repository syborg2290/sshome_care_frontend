import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Spin } from "antd";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "react-notifications/lib/notifications.css";
import { useHistory } from "react-router-dom";
// styles
import "./Add_Customer.css";

import { nicValidation } from "../../../../../../config/validation.js";
import db, { storage } from "../../../../../../config/firebase.js";
import firebase from "firebase";

export default function Add_Customer({ close_model }) {
  const [nic, setNic] = useState("");
  const [mid, setMId] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [root, setRoot] = useState("");
  const [validation, setValidation] = useState("");
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  // image 1
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  // image 2
  const [imageFile2, setImageFile2] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
  });

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

  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile2(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl2(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submit = () => {
    setLoadingSubmit(true);
    var result = nicValidation(nic);

    if (result) {
      db.collection("gami_sarani")
        .where("nic", "==", nic)
        .get()
        .then((nicRe) => {
          if (nicRe.docs.length > 0) {
            setLoadingSubmit(false);
            setValidation("Customer already exists by NIC");
          } else {
            db.collection("gami_sarani")
              .where("mid", "==", mid)
              .get()
              .then(async (midRe) => {
                if (midRe.docs.length > 0) {
                  setLoadingSubmit(false);
                  setValidation("Customer already exists by MID");
                } else {
                  if (imageFile === null) {
                    db.collection("gami_sarani")
                      .add({
                        mid: mid,
                        nic: nic,
                        fname: fname,
                        lname: lname,
                        address1: addres1,
                        addres2: addres2,
                        mobile1: mobile1,
                        mobile2: mobile2,
                        root: root,
                        currentDeposit: 0,
                        front: null,
                        back: null,
                        date: firebase.firestore.FieldValue.serverTimestamp(),
                      })
                      .then((_) => {
                        setLoadingSubmit(false);
                        close_model();
                        window.location.reload();
                      });
                  } else {
                    let randomNumber =
                      Math.floor(Math.random() * 1000000000) + 1000;
                    await storage
                      .ref(`images/${imageFile.name}${randomNumber}`)
                      .put(imageFile);
                    await storage
                      .ref(`images/${imageFile2.name}${randomNumber}`)
                      .put(imageFile2);

                    storage
                      .ref("images")
                      .child(imageFile.name + randomNumber)
                      .getDownloadURL()
                      .then((front) => {
                        storage
                          .ref("images")
                          .child(imageFile2.name + randomNumber)
                          .getDownloadURL()
                          .then((back) => {
                            db.collection("gami_sarani")
                              .add({
                                mid: mid,
                                nic: nic,
                                fname: fname,
                                lname: lname,
                                address1: addres1,
                                addres2: addres2,
                                mobile1: mobile1,
                                mobile2: mobile2,
                                root: root,
                                currentDeposit: 0,
                                front: front,
                                back: back,
                                date: firebase.firestore.FieldValue.serverTimestamp(),
                              })
                              .then((_) => {
                                setLoadingSubmit(false);
                                close_model();
                                window.location.reload();
                              });
                          });
                      });
                  }
                }
              });
          }
        });
    } else {
      setLoadingSubmit(false);
      setValidation("Customer's NIC format is invalid!");
    }
  };

  return (
    <Container component="main" className="main_container_sarani">
      <Typography className="title_sarani" variant="h5" gutterBottom>
        Add Customer
      </Typography>
      <Grid item xs={12} sm={2}>
        <hr className="titles_hr_sarani" />
      </Grid>
      <div className="paper">
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              NIC Number :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
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
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Member ID :
            </Grid>
            <Grid className="txt_Note" item xs={12} sm={3}>
              <TextField
                className="txtt_mid"
                autoComplete="mid"
                name="mid"
                variant="outlined"
                required
                fullWidth
                id="mid"
                label="Member ID"
                size="small"
                value={mid}
                onChange={(e) => {
                  setMId(e.target.value.trim());
                }}
              />
            </Grid>

            <br />
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Name :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_fname"
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                size="small"
                value={fname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_lname"
                autoComplete="lname"
                name="lname"
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                size="small"
                value={lname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Address 1:
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                className="txtt_addrs1"
                autoComplete="addrs1"
                name="addrs1"
                variant="outlined"
                required
                fullWidth
                id="addrs1"
                label="Address 1"
                size="small"
                value={addres1}
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
                className="txtt_addrs2"
                autoComplete="addrs2"
                name="addrs2"
                variant="outlined"
                required
                fullWidth
                id="addrs2"
                label="Address 2"
                size="small"
                value={addres2}
                onChange={(e) => {
                  setAddres2(e.target.value);
                }}
              />
            </Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Mobile :
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_mobile1"
                autoComplete="mobile1"
                name="mobile1"
                variant="outlined"
                required
                fullWidth
                id="mobile1"
                label="Mobile 1"
                size="small"
                type="number"
                value={mobile1}
                onChange={(e) => {
                  setMobile1(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                className="txtt_mobile2"
                autoComplete="mobile2"
                name="mobile2"
                variant="outlined"
                required
                fullWidth
                id="mobile2"
                label="Mobile 2"
                size="small"
                type="number"
                value={mobile2}
                onChange={(e) => {
                  setMobile2(e.target.value.trim());
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Root to Home :
            </Grid>
            <Grid item xs={12} sm={8}>
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
                size="small"
                value={root}
                onChange={(e) => {
                  setRoot(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid className="txt_LabelsImg" item xs={12} sm={1}>
              Image :
            </Grid>
            <Grid item xs={12} sm={5}>
              <input
                type="file"
                accept="image/*"
                name=""
                onChange={onImageChange}
                className="image"
                id="item_image"
                hidden
              />
              <img
                alt="Item upload"
                onClick={() => {
                  document.getElementById("item_image").click();
                }}
                src={
                  imageUrl == null
                    ? require("../../../../../../assets/avatar1132.jpg")
                    : imageUrl
                }
                className="imageFront"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/*"
                name=""
                onChange={onImageChange2}
                className="image"
                id="back_image"
                hidden
              />
              <img
                alt="back"
                onClick={() => {
                  document.getElementById("back_image").click();
                }}
                src={
                  imageUrl2 == null
                    ? require("../../../../../../assets/avater232.jpg")
                    : imageUrl2
                }
                className="imageBack"
              />
            </Grid>
          </Grid>
          <p className="validate_Edit">{validation}</p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}></Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                className="btn_addCust"
                onClick={submit}
                disabled={
                  nic.length === 0 ||
                  mid.length === 0 ||
                  fname.length === 0 ||
                  lname.length === 0 ||
                  addres1.length === 0 ||
                  mobile1.length === 0
                }
              >
                {isLoadingSubmit ? <Spin size="large" /> : "Done"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
