import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Modal, Spin } from "antd";
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

import { useHistory } from "react-router-dom";

export default function Add_Customer() {
  const location = useLocation();

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

  const [loaderModalOpenV, setloaderModalOpen] = useState(false);
  const [inputsNic, setInputsNic] = useState({});
  const [customerId, setCustomerId] = useState(null);
  const [trustee1Id, setTrustee1Id] = useState(null);
  const [trustee2Id, setTrustee2Id] = useState(null);

  let history = useHistory();

  const loaderModalClose = () => {
    setloaderModalOpen(false);
  };

  const loaderModalOpen = () => {
    setloaderModalOpen(true);
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

                        var customerObj = {
                          customerId: customerId,
                          trustee1Id: trustee1Id,
                          trustee2Id: trustee2Id,
                          customerNic: nic.trim(),
                          customerFname: fname.trim(),
                          customerLname: lname.trim(),
                          customerAddress1: addres1.trim(),
                          customerAddress2: addres2.trim(),
                          customerRootToHome: root.trim(),
                          customerMobile1: mobile1.trim(),
                          customerMobile2: mobile2.trim(),
                          customerRelatedNics: inputsNic,
                          customerImageUrl: imageUrl,
                          customerImageFile: imageFile,
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
                          pathname: "/assistant/ui/makeInvoice",
                          search: "?query=abc",
                          state: { detail: passedObj },
                        };

                        history.push(moveWith);
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

  const customerNicValidation = async (e) => {
    var enterKey = 13; //Key Code for Enter Key
    var { value } = e.target;
    if (e.which === enterKey) {
      var result = nicValidation(e.target.value.trim());

      if (result) {
        loaderModalOpen();

        var relationsValidations = false;

        await db
          .collection("invoice")
          .where("status_of_payandgo", "==", "onGoing")
          .get()
          .then((inDoc) => {
            inDoc.docs.forEach((inEachDoc) => {
              db.collection("customer")
                .doc(inEachDoc.data().customer_id)
                .get()
                .then((cusDoc) => {
                  for (
                    var s = 0;
                    s < Object.keys(cusDoc.data().relations_nics).length;
                    s++
                  ) {
                    if (cusDoc.data().relations_nics[s] === nic) {
                      relationsValidations = true;
                      break;
                    }
                  }
                });
            });
          });
        await db
          .collection("customer")
          .where("status", "==", "arrears")
          .get()
          .then((custArr) => {
            custArr.docs.forEach((inEachDoc) => {
              for (
                var q = 0;
                q < Object.keys(inEachDoc.data().relations_nics).length;
                q++
              ) {
                if (inEachDoc.data().relations_nics[q] === nic) {
                  relationsValidations = true;
                  break;
                }
              }
            });
          });

        await db
          .collection("customer")
          .where("status", "==", "blacklist")
          .get()
          .then((custArr) => {
            custArr.docs.forEach((inEachDoc) => {
              for (
                var n = 0;
                n < Object.keys(inEachDoc.data().relations_nics).length;
                n++
              ) {
                if (inEachDoc.data().relations_nics[n] === nic) {
                  relationsValidations = true;
                  break;
                }
              }
            });
          });

        if (relationsValidations) {
          loaderModalClose();
          NotificationManager.warning(
            "Entered customer have some relations with ongoing 'pay and go' list!",
            "Attention!"
          );
        } else {
          db.collection("customer")
            .where("nic", "==", value.trim())
            .get()
            .then((doc) => {
              if (doc.docs.length > 0) {
                db.collection("blacklist")
                  .where("customer_id", "==", doc.docs[0].id)
                  .get()
                  .then((blackDoc) => {
                    if (blackDoc.docs.length > 0) {
                      loaderModalClose();
                      NotificationManager.warning(
                        "Entered customer in the blacklist !",
                        "Attention!"
                      );
                    } else {
                      db.collection("arrears")
                        .where("customer_id", "==", doc.docs[0].id)
                        .get()
                        .then((arrsDoc) => {
                          if (arrsDoc.docs.length > 0) {
                            loaderModalClose();
                            NotificationManager.warning(
                              "Entered customer not payed and closed arrears as a customer !",
                              "Can not proceed with this customer, until pay and close the previous arrears as a customer"
                            );
                          } else {
                            db.collection("invoice")
                              .where("status_of_payandgo", "==", "onGoing")
                              .where("customer_id", "==", doc.docs[0].id)
                              .get()
                              .then((doc2) => {
                                if (doc2.docs.length > 0) {
                                  loaderModalClose();
                                  NotificationManager.warning(
                                    "Entered customer already on status of 'pay an go' !",
                                    "Please complete the previous 'pay and go'"
                                  );
                                } else {
                                  setCustomerId(doc.docs[0].id);
                                  setFirstName(doc.docs[0].data().fname);
                                  setLastName(doc.docs[0].data().lname);
                                  setAddres1(doc.docs[0].data().address1);
                                  setAddres2(doc.docs[0].data().address2);
                                  setMobile1(doc.docs[0].data().mobile1);
                                  setMobile2(doc.docs[0].data().mobile2);
                                  setRoot(doc.docs[0].data().root);
                                  setImageUrl(doc.docs[0].data().imgUrl);

                                  loaderModalClose();
                                }
                              });
                          }
                        });
                    }
                  });
              } else {
                loaderModalClose();
              }
            });
        }
      } else {
        NotificationManager.warning(
          "Customer's NIC format is invalid!",
          "Remember validations"
        );
      }
    }
  };

  const trustee1NicValidation = (e) => {
    var enterKey = 13; //Key Code for Enter Key
    var { value } = e.target;
    if (e.which === enterKey) {
      var result = nicValidation(e.target.value);

      if (result) {
        loaderModalOpen();
        db.collection("customer")
          .where("nic", "==", value.trim())
          .get()
          .then((docCust) => {
            if (docCust.docs.length > 0) {
              db.collection("blacklist")
                .where("customer_id", "==", docCust.docs[0].id)
                .get()
                .then((blackDoc) => {
                  if (blackDoc.docs.length > 0) {
                    loaderModalClose();
                    NotificationManager.warning(
                      "Entered trustee in the blacklist !",
                      "Can not proceed with this trustee, please try with another trustee"
                    );
                  } else {
                    db.collection("arrears")
                      .where("customer_id", "==", docCust.docs[0].id)
                      .get()
                      .then((arrDoc) => {
                        if (arrDoc.docs.length > 0) {
                          loaderModalClose();
                          NotificationManager.warning(
                            "Entered trustee not payed and closed arrears as a customer !",
                            "Can not proceed with this trustee, until pay and close the previous arrears as a customer"
                          );
                        } else {
                          db.collection("invoice")
                            .where("status_of_payandgo", "==", "onGoing")
                            .where("customer_id", "==", docCust.docs[0].id)
                            .get()
                            .then((custRe) => {
                              if (custRe.docs.length > 0) {
                                loaderModalClose();
                                NotificationManager.warning(
                                  "Entered trustee already on status of 'pay an go' as a customer !",
                                  "Can not proceed with this trustee, until complete the previous 'pay and go' as a customer"
                                );
                              } else {
                                db.collection("trustee")
                                  .where("nic", "==", value.trim())
                                  .get()
                                  .then((doc) => {
                                    if (doc.docs.length > 0) {
                                      db.collection("invoice")
                                        .where(
                                          "invoice_number",
                                          "==",
                                          doc.docs[0].data().invoice_number
                                        )
                                        .where(
                                          "status_of_payandgo",
                                          "==",
                                          "onGoing"
                                        )
                                        .get()
                                        .then((doc2) => {
                                          if (doc2.docs.length > 0) {
                                            loaderModalClose();
                                            NotificationManager.warning(
                                              "Entered trustee already on status of 'pay an go' as a trustee !",
                                              "Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                                            );
                                          } else {
                                            setTrustee1Id(doc.docs[0].id);
                                            setTrustee1Fname(
                                              doc.docs[0].data().fname
                                            );
                                            setTrustee1Lname(
                                              doc.docs[0].data().lname
                                            );
                                            setTrustee1Addres1(
                                              doc.docs[0].data().address1
                                            );
                                            setTrustee1Addres2(
                                              doc.docs[0].data().address2
                                            );
                                            setTrustee1Mobile1(
                                              doc.docs[0].data().mobile1
                                            );
                                            setTrustee1Mobile2(
                                              doc.docs[0].data().mobile2
                                            );

                                            loaderModalClose();
                                          }
                                        });
                                    } else {
                                      loaderModalClose();
                                    }
                                  });
                              }
                            });
                        }
                      });
                  }
                });
            } else {
              db.collection("trustee")
                .where("nic", "==", value.trim())
                .get()
                .then((doc) => {
                  if (doc.docs.length > 0) {
                    db.collection("invoice")
                      .where(
                        "invoice_number",
                        "==",
                        doc.docs[0].data().invoice_number
                      )
                      .where("status_of_payandgo", "==", "onGoing")
                      .get()
                      .then((doc2) => {
                        if (doc2.docs.length > 0) {
                          loaderModalClose();
                          NotificationManager.warning(
                            "Entered trustee already on status of 'pay an go' as a trustee !",
                            "Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                          );
                        } else {
                          setTrustee1Id(doc.docs[0].id);
                          setTrustee1Fname(doc.docs[0].data().fname);
                          setTrustee1Lname(doc.docs[0].data().lname);
                          setTrustee1Addres1(doc.docs[0].data().address1);
                          setTrustee1Addres2(doc.docs[0].data().address2);
                          setTrustee1Mobile1(doc.docs[0].data().mobile1);
                          setTrustee1Mobile2(doc.docs[0].data().mobile2);

                          loaderModalClose();
                        }
                      });
                  } else {
                    loaderModalClose();
                  }
                });
            }
          });
      } else {
        NotificationManager.warning(
          "Trustee 1's NIC format is invalid!",
          "Remember validations"
        );
      }
    }
  };

  const trustee2NicValidation = (e) => {
    var enterKey = 13; //Key Code for Enter Key
    var { value } = e.target;
    if (e.which === enterKey) {
      var result = nicValidation(e.target.value);

      if (result) {
        loaderModalOpen();
        db.collection("customer")
          .where("nic", "==", value.trim())
          .get()
          .then((docCust) => {
            if (docCust.docs.length > 0) {
              db.collection("blacklist")
                .where("customer_id", "==", docCust.docs[0].id)
                .get()
                .then((blackDoc) => {
                  if (blackDoc.docs.length > 0) {
                    loaderModalClose();
                    NotificationManager.warning(
                      "Entered trustee in the blacklist !",
                      "Can not proceed with this trustee, please try with another trustee"
                    );
                  } else {
                    db.collection("arrears")
                      .where("customer_id", "==", docCust.docs[0].id)
                      .get()
                      .then((arrDoc) => {
                        if (arrDoc.docs.length > 0) {
                          loaderModalClose();
                          NotificationManager.warning(
                            "Entered trustee not payed and closed arrears as a customer !",
                            "Can not proceed with this trustee, until pay and close the previous arrears as a customer"
                          );
                        } else {
                          db.collection("invoice")
                            .where("status_of_payandgo", "==", "onGoing")
                            .where("customer_id", "==", docCust.docs[0].id)
                            .get()
                            .then((custRe) => {
                              if (custRe.docs.length > 0) {
                                loaderModalClose();
                                NotificationManager.warning(
                                  "Entered trustee already on status of 'pay an go' as a customer !",
                                  "Can not proceed with this trustee, until complete the previous 'pay and go' as a customer"
                                );
                              } else {
                                db.collection("trustee")
                                  .where("nic", "==", value.trim())
                                  .get()
                                  .then((doc) => {
                                    if (doc.docs.length > 0) {
                                      db.collection("invoice")
                                        .where(
                                          "invoice_number",
                                          "==",
                                          doc.docs[0].data().invoice_number
                                        )
                                        .where(
                                          "status_of_payandgo",
                                          "==",
                                          "onGoing"
                                        )
                                        .get()
                                        .then((doc2) => {
                                          if (doc2.docs.length > 0) {
                                            loaderModalClose();
                                            NotificationManager.warning(
                                              "Entered trustee already on status of 'pay an go' as a trustee !",
                                              "Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                                            );
                                          } else {
                                            setTrustee2Id(doc.docs[0].id);
                                            setTrustee2Fname(
                                              doc.docs[0].data().fname
                                            );
                                            setTrustee2Lname(
                                              doc.docs[0].data().lname
                                            );
                                            setTrustee2Address1(
                                              doc.docs[0].data().address1
                                            );
                                            setTrustee2Address2(
                                              doc.docs[0].data().address2
                                            );
                                            setTrustee2Mobile1(
                                              doc.docs[0].data().mobile1
                                            );
                                            setTrustee2Mobile2(
                                              doc.docs[0].data().mobile2
                                            );

                                            loaderModalClose();
                                          }
                                        });
                                    } else {
                                      loaderModalClose();
                                    }
                                  });
                              }
                            });
                        }
                      });
                  }
                });
            } else {
              db.collection("trustee")
                .where("nic", "==", value.trim())
                .get()
                .then((doc) => {
                  if (doc.docs.length > 0) {
                    db.collection("invoice")
                      .where(
                        "invoice_number",
                        "==",
                        doc.docs[0].data().invoice_number
                      )
                      .where("status_of_payandgo", "==", "onGoing")
                      .get()
                      .then((doc2) => {
                        if (doc2.docs.length > 0) {
                          loaderModalClose();
                          NotificationManager.warning(
                            "Entered trustee already on status of 'pay an go' as a trustee !",
                            "Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                          );
                        } else {
                          setTrustee2Id(doc.docs[0].id);
                          setTrustee2Fname(doc.docs[0].data().fname);
                          setTrustee2Lname(doc.docs[0].data().lname);
                          setTrustee2Address1(doc.docs[0].data().address1);
                          setTrustee2Address2(doc.docs[0].data().address2);
                          setTrustee2Mobile1(doc.docs[0].data().mobile1);
                          setTrustee2Mobile2(doc.docs[0].data().mobile2);

                          loaderModalClose();
                        }
                      });
                  } else {
                    loaderModalClose();
                  }
                });
            }
          });
      } else {
        NotificationManager.warning(
          "Trustee 2's NIC format is invalid!",
          "Remember validations"
        );
      }
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

                      <MinusCircleOutlined
                        key={i + 3}
                        className="rmov_icon"
                        onClick={() => {
                          delete inputsNic[i];
                          setInputsNic({ ...inputsNic });
                        }}
                      />
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
