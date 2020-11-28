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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CurrencyFormat from "react-currency-format";

// styles
import "./Expences.css";

export default function Expences() {
  const [date, setDate] = useState(null);
  const [mainDiscription, setMainDiscription] = useState("");
  const [inputsOther, setInputsOther] = useState({});
  const [inputsSalary, setInputsSalary] = useState({});
  const [inputsAdvance, setInputsAdvance] = useState({});
  const [inputsTemporary, setInputsTemporary] = useState({});
  const [oil, setOil] = useState(0);
  const [oilDiscription, setOilDiscription] = useState("");
  const [short, setShort] = useState(0);
  const [shortDiscription, setShortDiscription] = useState("");
  const [food, setFood] = useState(0);
  const [foodDiscription, setFoodDiscription] = useState("");
  const [worker, setWorker] = useState(0);
  const [workerDiscription, setWorkerDiscription] = useState("");
  const [stationary, setStationary] = useState(0);
  const [stationaryDiscription, setStationaryDiscription] = useState("");
  const [expences, setExpences] = useState(0);
  const [reload, setReload] = useState(0);
  const [reloadDiscription, setReloadDiscription] = useState("");

  const [boc, setBoc] = useState(0);
  const [bocDiscription, setBocDiscription] = useState("");
  const [union, setUnion] = useState(0);
  const [unionDiscription, setUnionDiscription] = useState("");
  const [bankingInstallment, setBankingInstallment] = useState(0);
  const [bankingInstallmentDiscription, setBankingInstallmentDiscription] = useState("");
  const [loans, setLoans] = useState(0);
  const [loanDiscription, setLoanDiscription] = useState("");


  const [rentDiscription, setRentDiscription] = useState(""); 
  const [rentCost, setRentCost] = useState(0);

  const [inputsSampath, setInputsSampath] = useState({});
  const [inputsMonika, setInputsMonika] = useState({});
  const [inputsSithu, setInputsSithu] = useState({});

  const [salaryInstallment, setSalaryInstallment] = useState(0);
  const [salaryInstallmentDiscription, setSalaryInstallmentDiscription] = useState("");

  //Start Repair Text 

  const [inputsRepair, setInputsRepair] = useState({});

  const [fbDaa, setFbDaa] = useState("F/B-DAA 9261");
  const [fbDiscription, setFbDiscription] = useState("");
  const [fbCost, setFbCost] = useState(0);

  const [fdLi, setFdLi] = useState("F/D-LI 5471");
  const [fdDiscription, setFdDiscription] = useState("");
  const [fdCost, setFdCost] = useState(0);

  const [boxer, setBoxer] = useState("Boxer-W2 8626");
  const [boxerDiscription, setBoxerDiscription] = useState("");
  const [boxerCost, setBoxerCost] = useState(0); 
  
  const [ctBpn, setCtBpn] = useState("CT BPN 100-4581");
  const [ctBpnDiscription, setCtBpnDiscription] = useState("");
  const [ctBpnCost, setCtBpnCost] = useState(0);

  const [gk, setGk] = useState("GK 7586");
  const [gkDiscription, setGkDiscription] = useState("");
  const [gkCost, setGkCost] = useState(0); 
  
  const [otherRepair, setOtherRepair] = useState("");
  const [otherRepairDiscription, setOtherRepairDiscription] = useState("");
  const [otherRepairCost, setOtherRepairCost] = useState(0);

  const [handleChangeRepairCostInputs, setHandleChangeRepairCostInputs] = useState(0); 

//End Repair Text 
  
//Start Fuel Text 

  const [inputsFuel, setInputsFuel] = useState({});

  const [fbDaaFuel, setFbDaaFuel] = useState("F/B-DAA 9261");
  const [fbDiscriptionFuel, setFbDiscriptionFuel] = useState("");
  const [fbCostFuel, setFbCostFuel] = useState(0);

  const [fdLiFuel, setFdLiFuel] = useState("F/D-LI 5471");
  const [fdDiscriptionFuel, setFdDiscriptionFuel] = useState("");
  const [fdCostFuel, setFdCostFuel] = useState(0);

  const [boxerFuel, setBoxerFuel] = useState("Boxer-W2 8626");
  const [boxerDiscriptionFuel, setBoxerDiscriptionFuel] = useState("");
  const [boxerCostFuel, setBoxerCostFuel] = useState(0); 
  
  const [ctBpnFuel, setCtBpnFuel] = useState("CT BPN 100-4581");
  const [ctBpnDiscriptionFuel, setCtBpnDiscriptionFuel] = useState("");
  const [ctBpnCostFuel, setCtBpnCostFuel] = useState(0);

  const [gkFuel, setGkFuel] = useState("GK 7586");
  const [gkDiscriptionFuel, setGkDiscriptionFuel] = useState("");
  const [gkCostFuel, setGkCostFuel] = useState(0); 
  
  const [otherFuel, setOtherFuel] = useState("");
  const [otherFuelDiscription, setOtherFuelDiscription] = useState("");
  const [otherFuelCost, setOtherFuelCost] = useState(0);

  const [handleChangeFuelCostInputs, setHandleChangeFuelCostInputs] = useState(0); 

 //End Furl Text 

// eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  let history = useHistory();

   useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });
    // eslint-disable-next-line
  }, []);


    const addInputSampath = () => {
    setInputsSampath({ ...inputsSampath, [Object.keys(inputsSampath).length]: "" });
  };
  
   const addInputMonika = () => {
    setInputsMonika({ ...inputsMonika, [Object.keys(inputsMonika).length]: "" });
  };
  
   const addInputSithu = () => {
    setInputsSithu({ ...inputsSithu, [Object.keys(inputsSithu).length]: "" });
    };

    const addInputRepair = () => {
    setInputsRepair({ ...inputsRepair, [Object.keys(inputsRepair).length]: "" });
    };
    const addInputFuel = () => {
    setInputsFuel({ ...inputsFuel, [Object.keys(inputsFuel).length]: "" });
    };

    const addInputSalary = () => {
    setInputsSalary({ ...inputsSalary, [Object.keys(inputsSalary).length]: "" });
  };
    const addInputAdvance = () => {
    setInputsAdvance({ ...inputsAdvance, [Object.keys(inputsAdvance).length]: "" });
  };
     const addInputTemporary = () => {
    setInputsTemporary({ ...inputsTemporary, [Object.keys(inputsTemporary).length]: "" });
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
                Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                  fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={mainDiscription}
                  onChange={(e) => {
                    setMainDiscription(e.target.value);
                  }}
                />
                  </Grid>
                 
              <Grid className="txt_Labels" item xs={12} sm={6}></Grid>
            </Grid>
           
                <Button className="sampath_add" onClick={addInputSampath}>
                   MR.Sampath
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsSampath).map((i) => (
                      <div key={i + 1}>
                      <Grid className="txt_sampathGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_sampath"
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
                        className="txt_sampath"
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
                        className="sampath_icon"
                        onClick={() => {
                          delete inputsSampath[i];
                          setInputsSampath({ ...inputsSampath });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
              <Grid item xs={12} sm={12}><br /></Grid>     
            <Button className="sampath_add" onClick={addInputMonika}>
                   MRs.Monika
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsMonika).map((i) => (
                      <div key={i + 1}>
                      <Grid className="txt_sampathGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_sampath"
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
                        className="txt_sampath"
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
                        className="sampath_icon"
                        onClick={() => {
                          delete inputsMonika[i];
                          setInputsMonika({ ...inputsMonika });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
          
                   <Grid item xs={12} sm={12}><br /></Grid>
                   <Button className="sampath_add" onClick={addInputSithu}>
                   Sithu
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsSithu).map((i) => (
                      <div key={i + 1}>
                      <Grid className="txt_sampathGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        key={i + 2}
                        id={i.toString()}
                        className="txt_sampath"
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
                        className="txt_sampath"
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
                        className="sampath_icon"
                        onClick={() => {
                          delete inputsSithu[i];
                          setInputsSithu({ ...inputsSithu });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
          
              <Grid item xs={12} sm={12}><br /></Grid>     
            
             <Grid container spacing={2}>
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
             Discription :
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
                  label="Discription"
                  autoFocus
                  size="small"
                  value={oilDiscription}
                   onChange={(e) => {
                    setOilDiscription(e.target.value);
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
             Discription :
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
                  label="Discription"
                  autoFocus
                  size="small"
                  value={shortDiscription}
                  onChange={(e) => {
                      setShortDiscription(e.target.value);
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
             Discription :
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
                  label="Discription"
                  autoFocus
                  size="small"
                 
                  value={foodDiscription}
                  onChange={(e) => {
                      setFoodDiscription(e.target.value);
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
             Discription :
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
                  label="Discription"
                  autoFocus
                  size="small"
                 
                  value={workerDiscription}
                  onChange={(e) => {
                      setWorkerDiscription(e.target.value);
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
             Discription :
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
                  label="Discription"
                  autoFocus
                  size="small"
                 
                  value={stationaryDiscription}
                  onChange={(e) => {
                      setStationaryDiscription(e.target.value);
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
               <Grid className="txt_Labels" item xs={12} sm={2}>
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                  fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={reloadDiscription}
                  onChange={(e) => {
                      setReloadDiscription(e.target.value);
                  }}
                />
                 </Grid>
                </Grid>
               <Grid container spacing={2}>
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
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                   fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={bocDiscription}
                  onChange={(e) => {
                      setBocDiscription(e.target.value);
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
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                   fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={unionDiscription}
                  onChange={(e) => {
                      setUnionDiscription(e.target.value);
                  }}
                />
                 </Grid>
               <Grid className="txt_Labels" item xs={12} sm={2}>
              Banking Installment :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                  fullWidth
                  label="Installment"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={bankingInstallment}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setBankingInstallment(parseInt(e.target.value.trim()));
                    }
                  }}
                />
              </Grid>
                   <Grid className="txt_Labels" item xs={12} sm={2}>
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                   fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={bankingInstallmentDiscription}
                  onChange={(e) => {
                      setBankingInstallmentDiscription(e.target.value);
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
                <Grid className="txt_Labels" item xs={12} sm={2}>
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                   fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={loanDiscription}
                  onChange={(e) => {
                      setLoanDiscription(e.target.value);
                  }}
                />
                 </Grid>
             <Grid item xs={12} sm={6}>
                <p className="topiccssse">Vehicals & Rent</p>
                   <hr />
              </Grid>
            <Grid item xs={12} sm={6}></Grid>
             </Grid>

                <Button className="rpr_add" onClick={addInputRepair}>
                   Repair
                <PlusOutlined className="reltion_addIcon" />
            </Button>
             <Grid className="tt_dfltGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="F/B-DAA 9261"
                        size="small"
                        value={fbDaa}
                        onChange={(e) => {
                        setFbDaa(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                  value={fbDiscription}
                    onChange={(e) => {
                    setFbDiscription(e.target.value);
                  }}
                       
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={fbCost}
                         onChange={(e) => {
                       if (e.target.value !== "") {
                            setFbCost(parseInt(e.target.value.trim()));
                          }
                        }}
                      />
                        </Grid>
                        <Grid item xs={12} sm={2}></Grid>
                         <Grid item xs={12} sm={2}></Grid>
                        <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="F/D-LI 5471"
                        size="small"
                        value={fdLi}
                        onChange={(e) => {
                        setFdLi(parseInt(e.target.value.trim()));
                  
                        }}    
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                <TextField
                  className="txt_deflt"
                  autoComplete="relation"
                  name="relation"
                  variant="outlined"
                  fullWidth
                  label="Discription"
                  size="small"
                  value={fdDiscription}
                    onChange={(e) => {
                    setFdDiscription(e.target.value);
                  }}
                
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={fdCost}
                         onChange={(e) => {
                       if (e.target.value !== "") {
                            setFdCost(parseInt(e.target.value.trim()));
                          }
                        }} 
                      />
                      </Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Boxer-W28626"
                        size="small"
                        value={boxer}
                        onChange={(e) => {
                        setBoxer(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={boxerDiscription}
                    onChange={(e) => {
                    setBoxerDiscription(e.target.value);
                  }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                         InputProps={{ inputProps: { min: 0 } }}  
                        value={boxerCost}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setBoxerCost(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
                      </Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="CT BPN 100-4581"
                        size="small" 
                        value={ctBpn}
                        onChange={(e) => {
                        setCtBpn(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={ctBpnDiscription}
                        onChange={(e) => {
                        setCtBpnDiscription(e.target.value);
                  }}
                        
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}  
                        value={ctBpnCost}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setCtBpnCost(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
              </Grid>
               <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="GK 7586"
                        size="small"
                        value={gk}
                        onChange={(e) => {
                        setGk(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={gkDiscription}
                    onChange={(e) => {
                    setGkDiscription(e.target.value);
                  }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}  
                        value={gkCost}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setGkCost(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
              </Grid>
               <Grid item xs={12} sm={2}></Grid>
                        </Grid>
                  {Object.keys(inputsRepair).map((i) => (
                      <div key={i + 1}>
                      <Grid className="tt_rprion" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
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
                        <Grid item xs={12} sm={3}>
                        <TextField
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"  
                       />
                       </Grid>
                    <Grid item xs={12} sm={2}>
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
                        // onChange={handleChangeRepairCostInputs}
                        value={handleChangeRepairCostInputs}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setHandleChangeRepairCostInputs(parseInt(e.target.value.trim()));
                          }
                        }} 
                        
                      />
                       </Grid>
                    <Grid item xs={12} sm={2}>
                      <MinusCircleOutlined
                        key={i + 4}
                        className="rpr_icon"
                        onClick={() => {
                          delete inputsRepair[i];
                          setInputsRepair({ ...inputsRepair });
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
              <Grid item xs={12} sm={3}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Vehical Name"
                  autoFocus
                  size="small"
                  value={otherRepair}
                  onChange={(e) => {
                    setOtherRepair(e.target.value);
                  }}
               
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={otherRepairDiscription}
                    onChange={(e) => {
                    setOtherRepairDiscription(e.target.value);
                  }}
                 
                />
              </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Cost"
                  autoFocus
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}  
                  value={otherRepairCost}
                    onChange={(e) => {
                 if (e.target.value !== "") {
                   setOtherRepairCost(parseInt(e.target.value.trim()));
                         }
                       }} 
                />
            </Grid>
              <Grid item xs={12} sm={2}> </Grid>
               
             
              </Grid>
            <Grid className="brre" item xs={12} sm={12}>
              <hr />
              <br />
            
            </Grid>
            
              <Button className="rpr_add" onClick={addInputFuel}>
                  Fuel
                <PlusOutlined className="reltion_addIcon" />
            </Button>
             <Grid className="tt_dfltGrid" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="F/B-DAA 9261"
                        size="small"
                        value={fbDaaFuel}
                        onChange={(e) => {
                        setFbDaaFuel(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={fbDiscriptionFuel}
                      
                    onChange={(e) => {
                    setFbDiscriptionFuel(e.target.value);
                  }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={fbCostFuel}
                         onChange={(e) => {
                       if (e.target.value !== "") {
                            setFbCostFuel(parseInt(e.target.value.trim()));
                          }
                        }}
                      />
                        </Grid>
                        <Grid item xs={12} sm={2}></Grid>
                         <Grid item xs={12} sm={2}></Grid>
                        <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="F/D-LI 5471"
                        size="small"
                        value={fdLiFuel}
                        onChange={(e) => {
                        setFdLiFuel(parseInt(e.target.value.trim()));
                  
                        }}    
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                <TextField
                  className="txt_deflt"
                  autoComplete="relation"
                  name="relation"
                  variant="outlined"
                  fullWidth
                  label="Discription"
                  size="small"
                  value={fdDiscriptionFuel}
                  onChange={(e) => {
                    setFdDiscriptionFuel(parseInt(e.target.value.trim()));
                  }} 
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={fdCostFuel}
                         onChange={(e) => {
                       if (e.target.value !== "") {
                            setFdCostFuel(parseInt(e.target.value.trim()));
                          }
                        }} 
                      />
                      </Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={3}>
                      <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Boxer-W28626"
                        size="small"
                        value={boxerFuel}
                        onChange={(e) => {
                        setBoxerFuel(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={boxerDiscriptionFuel}
                        onChange={(e) => {
                        setBoxerDiscriptionFuel(parseInt(e.target.value.trim()));
                        }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                        className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                         InputProps={{ inputProps: { min: 0 } }}  
                        value={boxerCostFuel}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setBoxerCostFuel(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
                      </Grid>
                      <Grid item xs={12} sm={2}></Grid>
                      <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="CT BPN 100-4581"
                        size="small" 
                        value={ctBpnFuel}
                        onChange={(e) => {
                        setCtBpnFuel(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={ctBpnDiscriptionFuel}
                    
                     onChange={(e) => {
                    setCtBpnDiscriptionFuel(e.target.value);
                  }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}  
                        value={ctBpnCostFuel}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setCtBpnCostFuel(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
              </Grid>
               <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="GK 7586"
                        size="small"
                        value={gkFuel}
                        onChange={(e) => {
                        setGkFuel(parseInt(e.target.value.trim()));
                  
                        }}  
                      />
                       </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"
                        value={gkDiscriptionFuel}
                   
                     onChange={(e) => {
                    setGkDiscriptionFuel(e.target.value);
                  }}
                       />
                       </Grid>
                       <Grid item xs={12} sm={2}>
                        <TextField
                         className="txt_deflt"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Cost"
                        size="small"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}  
                        value={gkCostFuel}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setGkCostFuel(parseInt(e.target.value.trim()));
                          }
                        }}   
                      />
              </Grid>
               <Grid item xs={12} sm={2}></Grid>
                        </Grid>
                  {Object.keys(inputsFuel).map((i) => (
                      <div key={i + 1}>
                      <Grid className="tt_rprion" container spacing={2}>
                     <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={3}>
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
                        <Grid item xs={12} sm={3}>
                        <TextField
                        className="txt_rprion"
                        autoComplete="relation"
                        name="relation"
                        variant="outlined"
                        fullWidth
                        label="Discription"
                        size="small"  
                       />
                       </Grid>
                    <Grid item xs={12} sm={2}>
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
                        // onChange={handleChangeFuelCostInputs}
                        value={handleChangeFuelCostInputs}
                        onChange={(e) => {
                        if (e.target.value !== "") {
                            setHandleChangeFuelCostInputs(parseInt(e.target.value.trim()));
                          }
                        }} 
                        
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
              <Grid item xs={12} sm={3}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Vehical Name"
                  autoFocus
                  size="small"
                  value={otherFuel}
                    onChange={(e) => {
                    setOtherFuel(e.target.value);
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={otherFuelDiscription}
                       onChange={(e) => {
                    setOtherFuelDiscription(e.target.value);
                  }}
                  
                />
              </Grid>
                <Grid item xs={12} sm={2}>
                <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Cost"
                  autoFocus
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}  
                  value={otherFuelCost}
                    onChange={(e) => {
                 if (e.target.value !== "") {
                   setOtherFuelCost(parseInt(e.target.value.trim()));
                         }
                       }} 
                />
            </Grid>
              <Grid item xs={12} sm={2}> </Grid>
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
                  variant="outlined"
                  required
                  fullWidth
                  label="Discription"
                  autoFocus
                  size="small"
                  value={rentDiscription}
                   onChange={(e) => {
                    setRentDiscription(e.target.value);
                  }}
                />
                 </Grid>
              <Grid className="txt_Labels" item xs={12} sm={3}>
                 <TextField
                  className="txtt_oth"
                  variant="outlined"
                  required
                  fullWidth
                  label="Cost"
                  autoFocus
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={rentCost}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setRentCost(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                  </Grid>
                   <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
                  <Grid className="txt_Labels" item xs={12} sm={12}><hr /></Grid>
                    </Grid>

                  <Grid item xs={12} sm={6}>
                            <p className="topiccssse">Salary ,Advance & Temporary</p>
                             <hr />
                        </Grid>
            <Grid item xs={12} sm={6}></Grid>

              <Button className="othr_add" onClick={addInputSalary}>
                   Salary
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsSalary).map((i) => (
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
                          delete inputsSalary[i];
                          setInputsSalary({ ...inputsSalary });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
          <Grid item xs={12} sm={12}><br /></Grid>
            <Button className="othr_add" onClick={addInputAdvance}>
                  Advance
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsAdvance).map((i) => (
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
                          delete inputsAdvance[i];
                          setInputsAdvance({ ...inputsAdvance });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
                  ))}
             <Grid item xs={12} sm={12}><br /></Grid>
            <Button className="othr_add" onClick={addInputTemporary}>
                 Temporary
                <PlusOutlined className="reltion_addIcon" />
                   </Button>
                  {Object.keys(inputsTemporary).map((i) => (
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
                          delete inputsTemporary[i];
                          setInputsTemporary({ ...inputsTemporary });
                        }}
                          />
                        </Grid>
                           </Grid>   
                    </div>
            
            ))}
            <Grid className="grid_deductibles" container spacing={2}>
            <Grid className="txt_Labels" item xs={12} sm={2}>
              Salary Deductibles :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                  fullWidth
                  label="Installment"
                  size="small"
                  type="number"
                 InputProps={{ inputProps: { min: 0 } }}
                  value={salaryInstallment}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setSalaryInstallment(parseInt(e.target.value.trim()));
                    }
                  }}
                />
                 </Grid>
                   <Grid className="txt_Labels" item xs={12} sm={2}>
             Discription :
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className="txtt_nic"
                  variant="outlined"
                  required
                   fullWidth
                  label="Discription"
                  size="small"
                  value={salaryInstallmentDiscription}
                  onChange={(e) => {
                      setSalaryInstallmentDiscription(e.target.value);
                  }}
                />
                 </Grid>
            </Grid>
             <Grid className="brre" item xs={12} sm={12}>
              <hr />
              <br />
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
           <Grid className="brre" item xs={12} sm={12}>
              <hr />
              <br />
            </Grid>
            
               <Grid container spacing={2}>
                <Grid item xs={12} sm={6}> 
                    <Card className="expences_card">
                    <CardContent>
                    <Grid  container spacing={2}>
                      <Grid className="txt_Labels" item xs={12} sm={4}>
              Expences(LKR) :
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  className="txtt_nic"
                  name="expences"
                  variant="outlined"
                  required
                  label="Total"
                          size="small"
                          fullWidth
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
                <Grid item xs={12} sm={3}> </Grid> 
                       <Grid item xs={12} sm={5}> 
                          <p className="txt_blnceEx">Balance(LKR) :</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <p className="txt_blnceEx">
                        <CurrencyFormat
                        value={35000}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" "}
                          />
                        </p>   
                        </Grid>  
                        <Grid item xs={12} sm={3}> </Grid>   
                        </Grid>
                    </CardContent>
                 </Card>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
              
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
