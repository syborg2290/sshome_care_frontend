import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Modal, Spin } from "antd";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "react-notifications/lib/notifications.css";
import "./Check_Model.css";

import { nicValidation } from "../../../../../../../config/validation.js";
import db from "../../../../../../../config/firebase.js";

export default function Check_Model() {
  const [custNic, setCustNic] = useState("");
  const [trustee1Nic, setTrustee1Nic] = useState("");
  const [trustee2Nic, setTrustee2Nic] = useState("");
  const [validation, setValidation] = useState("");
  const [validationGreen, setValidationGreen] = useState("");
  const [loaderModalOpenV, setloaderModalOpen] = useState(false);
  const [isCustomerValidated, setCustomerValidation] = useState(false);
  const [isTrustee1Validated, setTrustee1Validation] = useState(false);
  const [isTrustee2Validated, setTrustee2Validation] = useState(false);

  const loaderModalClose = () => {
    setloaderModalOpen(false);
  };

  const loaderModalOpen = () => {
    setloaderModalOpen(true);
  };

  const checkCustomer = async (e) => {
    e.preventDefault();
    if (custNic === "") {
      setValidation("Customer's NIC is required!");
    } else {
      if (trustee1Nic === "") {
        setValidation("Trustee's 1 NIC is required!");
      } else {
        loaderModalOpen();
        customerNicValidation(custNic);
        trustee1NicValidation(trustee1Nic);
        if (trustee2Nic !== "") {
          trustee2NicValidation(trustee1Nic);
          if (
            isCustomerValidated &&
            isTrustee1Validated &&
            isTrustee2Validated
          ) {
            loaderModalClose();
            if (validation === "") {
              setValidationGreen("Okay, You can continue now");
            }
          }
        } else {
          if (isCustomerValidated && isTrustee1Validated) {
            loaderModalClose();
            if (validation === "") {
              setValidationGreen("Okay, You can continue now");
            }
          }
        }
      }
    }
  };

  const customerNicValidation = async () => {
    var { value } = custNic;

    var result = nicValidation(custNic.trim());

    if (result) {
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
                  if (cusDoc.data().relations_nics[s] === custNic) {
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
              if (inEachDoc.data().relations_nics[q] === custNic) {
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
              if (inEachDoc.data().relations_nics[n] === custNic) {
                relationsValidations = true;
                break;
              }
            }
          });
        });

      if (relationsValidations) {
        loaderModalClose();
        setValidation(
          "Attention!, Entered customer have some relations with ongoing 'pay and go' list!"
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
                    setValidation(
                      "Attention!, Entered customer in the blacklist !"
                    );
                  } else {
                    db.collection("arrears")
                      .where("customer_id", "==", doc.docs[0].id)
                      .get()
                      .then((arrsDoc) => {
                        if (arrsDoc.docs.length > 0) {
                          loaderModalClose();
                          setValidation(
                            "Entered customer not payed and closed arrears as a customer !, Can not proceed with this customer, until pay and close the previous arrears as a customer !"
                          );
                        } else {
                          db.collection("invoice")
                            .where("status_of_payandgo", "==", "onGoing")
                            .where("customer_id", "==", doc.docs[0].id)
                            .get()
                            .then((doc2) => {
                              if (doc2.docs.length > 0) {
                                loaderModalClose();
                                setValidation(
                                  "Entered customer already on status of 'pay and go' !, Please complete the previous 'pay and go'"
                                );
                              }
                            });
                        }
                      });
                  }
                });
            }
          });
      }
    } else {
      loaderModalClose();
      setValidation(
        "Remember validations !, Customer's NIC format is invalid!"
      );
    }
    setCustomerValidation(true);
  };

  const trustee1NicValidation = () => {
    var { value } = trustee1Nic;

    var result = nicValidation(trustee1Nic.trim());

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
                  setValidation(
                    "Entered trustee 1 in the blacklist !, Can not proceed with this trustee, please try with another trustee"
                  );
                } else {
                  db.collection("arrears")
                    .where("customer_id", "==", docCust.docs[0].id)
                    .get()
                    .then((arrDoc) => {
                      if (arrDoc.docs.length > 0) {
                        loaderModalClose();
                        setValidation(
                          "Entered trustee 1 not payed and closed arrears as a customer !"
                        );
                      } else {
                        db.collection("invoice")
                          .where("status_of_payandgo", "==", "onGoing")
                          .where("customer_id", "==", docCust.docs[0].id)
                          .get()
                          .then((custRe) => {
                            if (custRe.docs.length > 0) {
                              loaderModalClose();
                              setValidation(
                                "Entered trustee 1 already on status of 'pay and go' as a customer !, Can not proceed with this trustee, until complete the previous 'pay and go' as a customer"
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
                                          setValidation(
                                            "Entered trustee 1 already on status of 'pay and go' as a trustee !, Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                                          );
                                        }
                                      });
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
                        setValidation(
                          "Entered trustee 1 already on status of 'pay and go' as a trustee !, Can not proceed with this trustee, until complete the previous 'pay and go' as a trustee"
                        );
                      }
                    });
                }
              });
          }
        });
    } else {
      loaderModalClose();
      setValidation("Trustee 1's NIC format is invalid !, ");
    }
    setTrustee1Validation(true);
  };

  const trustee2NicValidation = () => {
    var { value } = trustee2Nic;

    var result = nicValidation(trustee2Nic.trim());

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
                  setValidation("Entered trustee 2 in the blacklist !");
                } else {
                  db.collection("arrears")
                    .where("customer_id", "==", docCust.docs[0].id)
                    .get()
                    .then((arrDoc) => {
                      if (arrDoc.docs.length > 0) {
                        loaderModalClose();
                        setValidation(
                          "Entered trustee 2 not payed and closed arrears as a customer !"
                        );
                      } else {
                        db.collection("invoice")
                          .where("status_of_payandgo", "==", "onGoing")
                          .where("customer_id", "==", docCust.docs[0].id)
                          .get()
                          .then((custRe) => {
                            if (custRe.docs.length > 0) {
                              loaderModalClose();
                              setValidation(
                                "Entered trustee 2 already on status of 'pay and go' as a customer !"
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

                                          setValidation(
                                            "Entered trustee 2 already on status of 'pay and go' as a trustee !"
                                          );
                                        }
                                      });
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
                        setValidation(
                          "Entered trustee 2 already on status of 'pay and go' as a trustee !"
                        );
                      }
                    });
                }
              });
          }
        });
    } else {
      loaderModalClose();
      setValidation("Trustee 2's NIC format is invalid!");
    }
    setTrustee2Validation(true);
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
              <h2>Checking the status</h2>
              <Spin size="large" />
            </div>
          </div>
        </div>
      </Modal>
      <Typography className="titles" variant="h5" gutterBottom>
        Check Customer & Trustees
      </Typography>
      <Grid item xs={12} sm={6}>
        <hr className="titles_hr" />
      </Grid>
      <Container component="main" className="main_container_check">
        <div className="paper_check">
          <form className="form_check" noValidate>
            <Grid container spacing={2}>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Customer NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={custNic}
                  className="txtt_nic"
                  autoComplete="custNic"
                  name="custNic"
                  variant="outlined"
                  required
                  fullWidth
                  id="custNic"
                  label=" Customer NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setCustNic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Trustee 1 NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={trustee1Nic}
                  className="txtt_nic"
                  autoComplete="t1nic"
                  name="t1nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="t1nic"
                  label=" Trustee 1 NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setTrustee1Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={4}>
                Trustee 2 NIC
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  value={trustee2Nic}
                  className="txtt_nic"
                  autoComplete="t2Nic"
                  name="t2Nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="t2Nic"
                  label=" Trustee 2 NIC"
                  autoFocus
                  size="small"
                  onChange={(e) => {
                    setTrustee2Nic(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="txt_Note" item xs={12} sm={1}></Grid>

              <p className="validate_check">{validation}</p>
              <p className="validate_check_green">{validationGreen}</p>

              <Grid className="txt_Note" item xs={12} sm={9}></Grid>
              <Grid className="btn_chk" item xs={12} sm={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_Check"
                  onClick={checkCustomer}
                >
                  Check
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
