import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import {DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

// styles
import "./Expences.css";

export default function Expences() {
  const [date, setDate] = useState(null);
  const [inputsNic, setInputsNic] = useState({});
  const [inputsFuel, setInputsFuel] = useState({});
  const [inputsOther, setInputsOther] = useState({});
  const [sampath, setSampath] = useState(0);
  const [monika, setMonika] = useState(0);
  const [sithu, setSithu] = useState(0);
  const [oil, setOil] = useState(0);
  const [short, setShort] = useState(0);
  const [food, setFood] = useState(0);
  const [worker, setWorker] = useState(0);
  // const [installment, setInstallment] = useState(0);
  const [stationary, setStationary] = useState(0);
  const [expences, setExpences] = useState(0);
  const [reload, setReload] = useState(0);
  const [boc, setBoc] = useState(0);
  const [union, setUnion] = useState(0);
  const [sampathBnk, setSampathBnk] = useState(0);
  const [loans, setLoans] = useState(0);
  const [otherRepr, setOtherRepr] = useState(0);
  const [otherFuel, setOtherFuel] = useState(0);
  const [rent, setRent] = useState(0);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  let history = useHistory();

   useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);

 const addInput = () => {
    setInputsNic({ ...inputsNic, [Object.keys(inputsNic).length]: "" });
    };
    
    const addInputFuel = () => {
    setInputsFuel({ ...inputsFuel, [Object.keys(inputsFuel).length]: "" });
    };
     const addInputOther = () => {
    setInputsOther({ ...inputsOther, [Object.keys(inputsOther).length]: "" });
  };

    return (
        <Container component="main" className="main_container">
            <Typography className="titles" variant="h5" gutterBottom>
          Add Expences
        </Typography>
        <Grid item xs={12} sm={2}>
          <hr className="titles_hr" />
            </Grid>
            <div className="paper">
                <form className="form" noValidate>
                    <Grid container spacing={2}>
                        <Grid className="txt_Labels" item xs={12} sm={2}>
                         Date :
                        </Grid>
                <Grid item xs={12} sm={10}>
                    <DatePicker
                            onChange={(e) => {
                              if (e !== null) {
                                setDate(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )
                                );
                              } else {
                                setDate(null);
                              }
                            }}
                          />
                        </Grid>
                        <Grid className="txt_Labels" item xs={12} sm={12}>
                            <br />
                         </Grid>
               <Grid className="txt_Labels" item xs={12} sm={2}>
                Mr Sampath :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Mr Sampath"
                  autoFocus
                  size="small"
                  type="number"
                   InputProps={{ inputProps: { min: 0 } }}
                  value={sampath}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSampath(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                  </Grid>
                
               <Grid className="txt_Labels" item xs={12} sm={2}>
                Mrs Monika :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Mrs Monika"
                  autoFocus
                  size="small"
                  type="number"
                   InputProps={{ inputProps: { min: 0 } }}
                   value={monika}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setMonika(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                </Grid>
                        
              <Grid className="txt_Labels" item xs={12} sm={2}>
               Sithu :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Sithu"
                  autoFocus
                  size="small"
                  type="number"
                   InputProps={{ inputProps: { min: 0 } }}
                  value={sithu}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSithu(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                 </Grid>    

              <Grid className="txt_Labels" item xs={12} sm={6}></Grid>
              <Grid className="txt_Labels" item xs={12} sm={12}>
               <hr />
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
              Coconut Oil :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Coconut Oil"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={oil}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setOil(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                 </Grid>   

            <Grid className="txt_Labels" item xs={12} sm={2}>
              Short :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Short"
                  autoFocus
                  size="small"
                  type="number"
                   InputProps={{ inputProps: { min: 0 } }}
                   value={short}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setShort(parseInt(e.target.value.trim()));
                    }
                  }}
                />
               </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
              Food :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Food"
                  autoFocus
                  size="small"
                  type="number"
                   InputProps={{ inputProps: { min: 0 } }}
                  value={food}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setFood(parseInt(e.target.value.trim()));
                    }
                  }}
                />
               </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
              Pay for workers :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Pay for workers"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={worker}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setWorker(parseInt(e.target.value.trim()));
                    }
                  }}
                />
               </Grid>
           
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Stationary :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Stationary"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={stationary}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setStationary(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                </Grid>
             <Grid className="txt_Labels" item xs={12} sm={2}>
              Expences :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="expences"
                  name="expences"
                  variant="outlined"
                  required
                  fullWidth
                  id="expences"
                  label="Expences"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={expences}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setExpences(parseInt(e.target.value.trim()));
                    }
                  }}
                />
          </Grid>
         <Grid className="txt_Labels" item xs={12} sm={2}>
              Card & Reload :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="reload"
                  name="reload"
                  variant="outlined"
                  required
                  fullWidth
                  id="reload"
                  label="Reload"
                  autoFocus
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}
                  value={reload}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setReload(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
               <Grid item xs={12} sm={6}></Grid>
               {/* <Grid className="txt_Labels" item xs={12} sm={2}>
              Salary Installment :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="Salary Installment"
                  autoFocus
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}
                  value={installment}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setInstallment(parseInt(e.target.value.trim()));
                    }
                  }}
                />
             </Grid> */}
                 
                        <Grid item xs={12} sm={6}>
                            <p className="topiccssse">Banking & Loans</p>
                             <hr />
                        </Grid>
                         <Grid item xs={12} sm={6}></Grid>

            <Grid className="txt_Labels" item xs={12} sm={2}>
              BOC Bank :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="nic"
                  label="BOC Bank"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={boc}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setBoc(parseInt(e.target.value.trim()));
                    }
                  }}
                />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Union Bank :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="union"
                  label="Union Bank"
                  autoFocus
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}
                  value={union}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setUnion(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                 </Grid>
               <Grid className="txt_Labels" item xs={12} sm={2}>
              Sampath Bank :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="sampathBnk"
                  label=" Sampath Bank"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={sampathBnk}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSampathBnk(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
              <Grid className="txt_Labels" item xs={12} sm={2}>
              Loans :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  autoComplete="nic"
                  name="nic"
                  variant="outlined"
                  required
                  fullWidth
                  id="loans"
                  label="Loans"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={loans}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setLoans(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                </Grid>
             <Grid item xs={12} sm={6}>
                <p className="topiccssse">Vehicals & Rent</p>
                   <hr />
              </Grid>
            <Grid item xs={12} sm={6}></Grid>
             </Grid>

                <Button className="rpr_add" onClick={addInput}>
                   Repair
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsNic).map((i) => (
                      <div key={i + 1}>
                      <Grid className="tt_rprion" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Vehical Name"
                        size="small"
                       
                        
                      />
                        </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        key={i + 3}
                        id={i.toString()}
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                            size="small"
                             type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                        
                      />
                       </Grid>
                    <Grid item xs={12} sm={2}>
                      <MinusCircleOutlined
                        key={i + 4}
                        className="rpr_icon"
                        onClick={() => {
                          delete inputsNic[i];
                          setInputsNic({ ...inputsNic });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
            <Grid item xs={12} sm={12}>
              <br />
            </Grid>
            <Grid container spacing={2}>
             <Grid className="txt_Labelsoth" item xs={12} sm={2}>
              Other :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_oth"
                  autoComplete="other"
                  name="other"
                  variant="outlined"
                  required
                  fullWidth
                  id="other"
                  label="Other"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={otherRepr}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setOtherRepr(parseInt(e.target.value.trim()));
                    }
                  }}
                />
            </Grid>
              <Grid item xs={12} sm={6}></Grid>
              </Grid>
            <Grid className="brre" item xs={12} sm={12}>
              <hr />
              <br />
            
            </Grid>
            
             <Button className="rpr_add" onClick={addInputFuel}>
                   Fuel
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsFuel).map((i) => (
                      <div key={i + 1}>
                      <Grid className="tt_rprion" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Vehical Name"
                        size="small"
                            
                      />
                        </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        key={i + 3}
                        id={i.toString()}
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                            size="small"
                             type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                           
                      />
                       </Grid>
                    <Grid item xs={12} sm={2}>
                      <MinusCircleOutlined
                        key={i + 4}
                        className="rpr_icon"
                        onClick={() => {
                          delete inputsFuel[i];
                          setInputsFuel({ ...inputsFuel });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
              <Grid item xs={12} sm={12}>
              <br />
            </Grid>
            <Grid container spacing={2}>
             <Grid className="txt_Labelsoth" item xs={12} sm={2}>
              Other :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_oth"
                  autoComplete="other"
                  name="other"
                  variant="outlined"
                  required
                  fullWidth
                  id="other"
                  label="Other"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={otherFuel}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setOtherFuel(parseInt(e.target.value.trim()));
                    }
                  }}
                />
            </Grid>
              <Grid item xs={12} sm={6}></Grid>
              </Grid>
            <Grid className="brre" item xs={12} sm={12}>
              <hr />
              <br />
            
            </Grid>
            
           
            <Grid  container spacing={2}>
             <Grid className="txt_Labelsoth" item xs={12} sm={2}>
              Rent Vehical :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_oth"
                  autoComplete="rent"
                  name="rent"
                  variant="outlined"
                  required
                  fullWidth
                  id="rent"
                  label="Rent"
                  autoFocus
                  size="small"
                  type="number"
                InputProps={{ inputProps: { min: 0 } }}
                  value={rent}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setRent(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                 </Grid>
                  <Grid className="txt_Labels" item xs={12} sm={6}></Grid>
             <Grid className="txt_Labels" item xs={12} sm={12}><hr /></Grid>
                    </Grid>
                      <Button className="othr_add" onClick={addInputOther}>
                   Others
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsOther).map((i) => (
                      <div key={i + 1}>
                      <Grid className="txt_othrGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_othrtn"
                        autoComplete="discription"
                        name="discription"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                         
                      />
                        </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        key={i + 3}
                        id={i.toString()}
                        className="txt_othrtn"
                        autoComplete="cost"
                        name="cost"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                      />
                       </Grid>
                    <Grid item xs={12} sm={2}>
                      <MinusCircleOutlined
                        key={i + 4}
                        className="othr_icon"
                        onClick={() => {
                          delete inputsOther[i];
                          setInputsOther({ ...inputsOther });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
            <Grid item xs={12} sm={12}><br /></Grid>     
            
             <Grid container spacing={2}>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_MakeCustomer"
                  endIcon={<DoneIcon />}
                  // onClick={submit}
                    disabled={
                    loading ||
                    date === null
                      ? true
                      : false
                  }
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
                </form>
             </div>
         </Container>
    )
}
