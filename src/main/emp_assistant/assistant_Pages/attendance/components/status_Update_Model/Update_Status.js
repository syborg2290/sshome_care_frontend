import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import {
  Button,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";

// styles
import "./Update_Status.css";
import db from "../../../../../../config/firebase.js";

export default function Update_Status({ nic, docId }) {
  let history = useHistory();
  // eslint-disable-next-line
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isFull, setIsFull] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    db.collection("attendance_history")
      .doc(docId)
      .onSnapshot((snap) => {
        if (snap.data().status === "full") {
          setIsFull(true);
        } else {
          setIsFull(false);
        }
      });

    db.collection("employee")
      .where("nic", "==", nic)
      .get()
      .then((reEmp) => {
        setFname(reEmp.docs[0].data().fname);
        setLname(reEmp.docs[0].data().lname);
      });
    // eslint-disable-next-line
  }, [nic]);

  const makeLeave = async () => {
    setLoadingSubmit(true);
    await db
      .collection("attendance_history")
      .doc(docId)
      .update({
        status: isFull ? "half" : "full",
      })
      .then(() => {
        setLoadingSubmit(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Container component="main" className="main_container_upStts">
        <Typography className="title_root" variant="h5" gutterBottom>
          Employee leaves
        </Typography>
        <Grid item xs={12} sm={2}>
          <hr className="titles_hr_root" />
        </Grid>
        <Row>
          <Col className="customer_details_sarani" span={8}>
            Full Name
          </Col>
          <Col className="customer_sarani" span={2}>
            :
          </Col>
          <Col className="customer_sarani" span={14}>
            {fname} <span  className="lnameSpan">{lname}</span> 
          </Col>
          <Col className="customer_details_sarani" span={8}>
            NIC
          </Col>
          <Col className="customer_sarani" span={2}>
            :
          </Col>
          <Col className="customer_sarani" span={14}>
            {nic}
          </Col>
        </Row>

        {/* <p className="validate_updateRoot">{validation}</p> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}></Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              className="btn_leave"
              onClick={makeLeave}
              disabled={isLoadingSubmit}
              size="small"
            >
              {isLoadingSubmit ? (
                <Spin size="small" />
              ) : isFull ? (
                "Make Short Leave"
              ) : (
                "Back to Full"
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
