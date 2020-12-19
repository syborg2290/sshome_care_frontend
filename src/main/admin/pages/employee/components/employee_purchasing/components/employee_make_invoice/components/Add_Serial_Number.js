// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Container,
//   Typography,
// } from "@material-ui/core";
// import { Spin } from "antd";

// import "react-notifications/lib/notifications.css";

// //icon
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// // styles
// import "./Add_Serial_Number.css";

// export default function Add_Serial_Number() {
//   const [inputsSerialNo, setInputsSerialNo] = useState({});
//   // eslint-disable-next-line
//  const [isLoadingSubmit, setLoadingSubmit] = useState(false);


//       const addInput = () => {
//     setInputsSerialNo({ ...inputsSerialNo, [Object.keys(inputsSerialNo).length]: "" });
//   };
//   const handleChangeAddSerialInputs = (e) => {
//     setInputsSerialNo({ ...inputsSerialNo, [e.target.id]: e.target.value });
//   };

//     return (
//         <Container component="main" className="main_container_root">
//        <Typography className="title_root" variant="h5" gutterBottom>
//        Add Serial Numbers
//       </Typography>
//       <Grid item xs={12} sm={2}>
//         <hr className="titles_hr_root" />
//         </Grid>
//             <div className="paper_root">
//                 <form className="form_root" noValidate>
//                   <Grid container spacing={2}>
//               <Grid item xs={12} sm={12}>
//                 <div>
//                   <Button className="reltion_add" onClick={addInput}>
//                    Add Numbers
//                     <PlusOutlined className="reltion_addIcon" />
//                   </Button>
//                   {Object.keys(inputsSerialNo).map((i) => (
//                     <div key={i + 1}>
//                       <TextField
//                         key={i + 2}
//                         id={i.toString()}
//                         className="txt_serials"
//                         autoComplete="serial"
//                         name="serial"
//                         variant="outlined"
//                         label="Serial Numbers"
//                         onChange={handleChangeAddSerialInputs}
//                         size="small"
//                       />

//                       {i >= Object.keys(inputsSerialNo).length - 1 ? (
//                         <MinusCircleOutlined
//                           key={i + 3}
//                           className="rmov_iconss"
//                           onClick={() => {
//                             delete inputsSerialNo[i];
//                             setInputsSerialNo({ ...inputsSerialNo });
//                           }}
//                         />
//                       ) : (
//                         ""
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </Grid>
//                     </Grid>
                    
//        {/* <p className="validate_updateRoot">{validation}</p> */}
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             className="btn_addSerial"
           
//           >
//             {isLoadingSubmit ? <Spin size="large" /> : "Done"}
//           </Button>
//         </Grid>
//       </Grid>
                    
//                  </form>
//              </div>
//          </Container>
//     )
// }
