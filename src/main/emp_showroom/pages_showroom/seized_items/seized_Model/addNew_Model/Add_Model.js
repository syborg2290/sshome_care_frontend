// import React, { useState } from "react";
// import {
//   Grid,
//   Container,
//   Typography,
//   TextField,
//   Button,
// } from "@material-ui/core";
// import { DatePicker, Space, Spin } from "antd";
// import firebase from "firebase";

// import db from "../../../../../../config/firebase.js";

// // styles
// import "./Add_Model.css";

// export default function Add_Model({ closeModel }) {
//   const [invoice, setInvoice] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onChange = (date, dateString) => {
//     setDate(dateString);
//   };

//   const addSeized = async () => {
//     setLoading(true);
//     db.collection("blacklist")
//       .where("InvoiceNo", "==", invoice.trim())
//       .get()
//       .then((checkBlackList) => {
//         if (checkBlackList.docs.length > 0) {
//           db.collection("seized")
//             .where("invoice_number", "==", invoice.trim())
//             .get()
//             .then((reSeizedCheck) => {
//               if (reSeizedCheck.docs.length <= 0) {
//                 db.collection("invoice")
//                   .where("invoice_number", "==", invoice.trim())
//                   .get()
//                   .then((reThen) => {
//                     if (reThen.docs.length > 0) {
//                       if (reThen.docs[0].data()?.customer_id !== null) {
//                         reThen.docs[0].data().items.forEach((reI) => {
//                           db.collection("item")
//                             .doc(reI.item_id)
//                             .get()
//                             .then((itRe) => {
//                               db.collection("seized")
//                                 .add({
//                                   invoice_number: invoice.trim(),
//                                   model_no: itRe.data().modelNo,
//                                   item_name: itRe.data().itemName,
//                                   nic: reThen.docs[0].data().nic,
//                                   date: date,
//                                   addedDate: firebase.firestore.FieldValue.serverTimestamp(),
//                                 })
//                                 .then((_) => {
//                                   setLoading(false);
//                                   closeModel();
//                                   window.location.reload();
//                                 });
//                             });
//                         });
//                       } else {
//                         setLoading(false);
//                         setError(
//                           "Invoice number you entered is not 'pay and go' item!"
//                         );
//                       }
//                     } else {
//                       setLoading(false);
//                       setError("Invoice number you entered is not found!");
//                     }
//                   });
//               } else {
//                 setLoading(false);
//                 setError(
//                   "Invoice number you entered already in the seized list!"
//                 );
//               }
//             });
//         } else {
//           setLoading(false);
//           setError("Invoice number you entered not in the blacklist!");
//         }
//       });
//   };

//   return (
//     <Container component="main" className="conctainefr_main">
//       <Typography className="titleffs" variant="h5" gutterBottom>
//         Add Seized Item
//       </Typography>
//       <Grid item xs={12} sm={12}>
//         <hr className="titl_hr" />
//       </Grid>
//       <div className="paper">
//         <form className="form" noValidate>
//           <Grid container spacing={2}>
//             <Grid className="lbl_topi" item xs={12} sm={4}>
//               Invoice No
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               :
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="ino"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 label="Invoice No"
//                 size="small"
//                 value={invoice}
//                 onChange={(e) => {
//                   setInvoice(e.target.value);
//                 }}
//               />
//             </Grid>

//             <Grid className="lbl_topi" item xs={12} sm={4}>
//               Seized Date
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               :
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Space direction="vertical">
//                 <DatePicker onChange={onChange} />
//               </Space>
//             </Grid>
//           </Grid>
//           <p className="name_Msg">{error.length > 0 ? error : ""}</p>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={9}></Grid>
//             <Grid item xs={12} sm={3}>
//               <Button
//                 size="small"
//                 variant="contained"
//                 color="primary"
//                 className="btn_add"
//                 onClick={addSeized}
//                 disabled={
//                   loading || invoice.length === 0 || date.length === 0
//                     ? true
//                     : false
//                 }
//               >
//                 {loading ? <Spin /> : "Done"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </Container>
//   );
// }
