import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { DatePicker, Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CurrencyFormat from "react-currency-format";

import db from "../../../../config/firebase.js";

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
  const [
    bankingInstallmentDiscription,
    setBankingInstallmentDiscription,
  ] = useState("");
  const [loans, setLoans] = useState(0);
  const [loanDiscription, setLoanDiscription] = useState("");

  const [rentDiscription, setRentDiscription] = useState("");
  const [rentCost, setRentCost] = useState(0);

  const [inputsSampath, setInputsSampath] = useState({});
  const [inputsMonika, setInputsMonika] = useState({});
  const [inputsSithu, setInputsSithu] = useState({});

  const [salaryInstallment, setSalaryInstallment] = useState(0);
  const [
    salaryInstallmentDiscription,
    setSalaryInstallmentDiscription,
  ] = useState("");

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

  //End Furl Text

  const [loading, setLoading] = useState(false);
  const [previousBalance, setPreviousBalance] = useState(0);
  const [totalFuel, setTotalFuel] = useState(0);
  const [totalRepair, setTotalRepair] = useState(0);
  const [totalSampath, setTotalSampath] = useState(0);
  const [totalMonika, setTotalMonika] = useState(0);
  const [totalSithu, setTotalSithu] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [totalTemp, setTotalTemp] = useState(0);
  const [totalOthers, setTotalOthers] = useState(0);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      history.push("/connection_lost");
    });

    db.collection("expences")
      .get()
      .then((reExpe) => {
        if (reExpe.docs.length <= 0) {
          setPreviousBalance(0);
        } else {
          setPreviousBalance(
            parseInt(reExpe.docs[reExpe.docs.length - 1].data().balance)
          );
        }
      });

    // eslint-disable-next-line
  }, []);

  const makeExpences = async () => {
    setLoading(true);

    var coco_oil = {
      description: oilDiscription,
      cost: oil,
    };
    var shortObj = {
      description: shortDiscription,
      cost: short,
    };
    var foodsObj = {
      description: foodDiscription,
      cost: food,
    };
    var workersObj = {
      description: workerDiscription,
      cost: worker,
    };

    var stationaryObj = {
      description: stationaryDiscription,
      cost: stationary,
    };

    var cards_reload_obj = {
      description: reloadDiscription,
      cost: reload,
    };
    var bocBankObj = {
      description: bocDiscription,
      cost: boc,
    };
    var unionBank = {
      description: unionDiscription,
      cost: union,
    };

    var loansObj = {
      description: loanDiscription,
      cost: loans,
    };

    var repairObj = {
      "F/B-DAA_9261": {
        description: fbDiscription,
        cost: fbCost,
      },
      "F/D-LI_5471": {
        description: fdDiscription,
        cost: fdCost,
      },
      "Boxer-W2_8626": {
        description: boxerDiscription,
        cost: boxerCost,
      },
      "CT_BPN_100-4581": {
        description: ctBpnDiscription,
        cost: ctBpnCost,
      },
      GK_7586: {
        description: gkDiscription,
        cost: gkCost,
      },
      otherRepair: {
        description: otherRepairDiscription,
        cost: otherRepairCost,
      },

      extra_inputs: inputsRepair,
    };

    var fuelObj = {
      "F/B-DAA_9261": {
        description: fbDiscriptionFuel,
        cost: fbCostFuel,
      },
      "F/D-LI_5471": {
        description: fdDiscriptionFuel,
        cost: fdCostFuel,
      },
      "Boxer-W2_8626": {
        description: boxerDiscriptionFuel,
        cost: boxerCostFuel,
      },
      "CT_BPN_100-4581": {
        description: ctBpnDiscriptionFuel,
        cost: ctBpnCostFuel,
      },
      GK_7586: {
        description: gkDiscriptionFuel,
        cost: gkCostFuel,
      },
      otherFuel: {
        description: otherFuelDiscription,
        cost: otherFuelCost,
      },

      extra_inputs: inputsFuel,
    };

    var rentObj = {
      description: rentDiscription,
      cost: rentCost,
    };

    var salaryDeductables = {
      description: salaryInstallmentDiscription,
      cost: salaryInstallment,
    };

    var bankingInstall = {
      description: bankingInstallmentDiscription,
      cost: bankingInstallment,
    };

    await db
      .collection("expences")
      .add({
        date: date,
        mainDescription: mainDiscription.trim(),
        mr_sampath: inputsSampath,
        mrs_monika: inputsMonika,
        sithu: inputsSithu,
        coconut_oil: coco_oil,
        shorts: shortObj,
        foods: foodsObj,
        pay_for_workers: workersObj,
        stationary: stationaryObj,
        cards_reload: cards_reload_obj,
        boc_bank: bocBankObj,
        unionBank: unionBank,
        bankingInstall: bankingInstall,
        loans_for: loansObj,
        vehicles_repairs: repairObj,
        total_repairs: totalRepair,
        vehicles_fuel: fuelObj,
        total_fuel: totalFuel,
        rentVehi: rentObj,
        salary: inputsSalary,
        advance: inputsAdvance,
        temp: inputsTemporary,
        salaryDeductables: salaryDeductables,
        other: inputsOther,
        totalSampath: totalSampath,
        totalMonika: totalMonika,
        totalSithu: totalSithu,
        totalSalary: totalSalary,
        totalAdvance: totalAdvance,
        totalTemp: totalTemp,
        totalOthers: totalOthers,
        total: expences,
        balance: expences + parseInt(previousBalance),
      })
      .then((_) => {
        setLoading(false);
        window.location.reload();
      });
  };

  const addInputSampath = () => {
    setInputsSampath({
      ...inputsSampath,
      [Object.keys(inputsSampath).length]: {
        description: "",
        cost: 0,
      },
    });
  };

  const addInputMonika = () => {
    setInputsMonika({
      ...inputsMonika,
      [Object.keys(inputsMonika).length]: {
        description: "",
        cost: 0,
      },
    });
  };

  const addInputSithu = () => {
    setInputsSithu({
      ...inputsSithu,
      [Object.keys(inputsSithu).length]: {
        description: "",
        cost: 0,
      },
    });
  };

  const addInputRepair = () => {
    setInputsRepair({
      ...inputsRepair,
      [Object.keys(inputsRepair).length]: {
        vehi_name: "",
        description: "",
        cost: 0,
      },
    });
  };
  const addInputFuel = () => {
    setInputsFuel({
      ...inputsFuel,
      [Object.keys(inputsFuel).length]: {
        vehi_name: "",
        description: "",
        cost: 0,
      },
    });
  };

  const addInputSalary = () => {
    setInputsSalary({
      ...inputsSalary,
      [Object.keys(inputsSalary).length]: {
        description: "",
        cost: 0,
      },
    });
  };
  const addInputAdvance = () => {
    setInputsAdvance({
      ...inputsAdvance,
      [Object.keys(inputsAdvance).length]: {
        description: "",
        cost: 0,
      },
    });
  };
  const addInputTemporary = () => {
    setInputsTemporary({
      ...inputsTemporary,
      [Object.keys(inputsTemporary).length]: {
        description: "",
        cost: 0,
      },
    });
  };

  const addInputOther = () => {
    setInputsOther({
      ...inputsOther,
      [Object.keys(inputsOther).length]: {
        description: "",
        cost: 0,
      },
    });
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
                    setDate(firebase.firestore.Timestamp.fromDate(e.toDate()));
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
                    value={inputsSampath[i].description}
                    onChange={(e) => {
                      setInputsSampath({
                        ...inputsSampath,
                        [i]: {
                          description: e.target.value,
                          cost: inputsSampath[i].cost,
                        },
                      });
                    }}
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
                    value={inputsSampath[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let previousCost = inputsSampath[i].cost;
                        setInputsSampath({
                          ...inputsSampath,
                          [i]: {
                            description: inputsSampath[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });

                        let val = parseInt(e.target.value.trim());
                        setExpences((exp) => exp - previousCost);
                        setTotalSampath((exp) => exp - previousCost);
                        setExpences((exp) => exp + val);
                        setTotalSampath((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="sampath_icon"
                    onClick={() => {
                      let costExp = inputsSampath[i].cost;
                      setExpences((exp) => exp - costExp);
                      setTotalSampath((exp) => exp - costExp);
                      delete inputsSampath[i];
                      setInputsSampath({ ...inputsSampath });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ))}
          <Grid item xs={12} sm={12}>
            <br />
          </Grid>
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
                    value={inputsMonika[i].description}
                    onChange={(e) => {
                      setInputsMonika({
                        ...inputsMonika,
                        [i]: {
                          description: e.target.value,
                          cost: inputsMonika[i].cost,
                        },
                      });
                    }}
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
                    value={inputsMonika[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let previousCost = inputsMonika[i].cost;
                        setInputsMonika({
                          ...inputsMonika,
                          [i]: {
                            description: inputsMonika[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        setExpences((exp) => exp - previousCost);
                        setTotalMonika((exp) => exp - previousCost);
                        setExpences((exp) => exp + val);
                        setTotalMonika((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="sampath_icon"
                    onClick={() => {
                      let cost = inputsMonika[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalMonika((exp) => exp - cost);
                      delete inputsMonika[i];
                      setInputsMonika({ ...inputsMonika });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ))}

          <Grid item xs={12} sm={12}>
            <br />
          </Grid>
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
                    value={inputsSithu[i].description}
                    onChange={(e) => {
                      setInputsSithu({
                        ...inputsSithu,
                        [i]: {
                          description: e.target.value,
                          cost: inputsSithu[i].cost,
                        },
                      });
                    }}
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
                    value={inputsSithu[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let costPrev = inputsSithu[i].cost;
                        setInputsSithu({
                          ...inputsSithu,
                          [i]: {
                            description: inputsSithu[i].cost,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        setExpences((exp) => exp - costPrev);
                        setTotalSithu((exp) => exp - costPrev);
                        setExpences((exp) => exp + val);
                        setTotalSithu((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="sampath_icon"
                    onClick={() => {
                      let cost = inputsSithu[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalSithu((exp) => exp - cost);
                      delete inputsSithu[i];
                      setInputsSithu({ ...inputsSithu });
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
                    let prev = oil;
                    setOil(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = short;
                    setShort(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prevFood = food;
                    setFood(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prevFood);
                    setExpences((exp) => exp + val);
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
                    let prev = worker;
                    setWorker(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = stationary;
                    setStationary(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = reload;
                    setReload(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = boc;
                    setBoc(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = union;
                    setUnion(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = bankingInstallment;
                    setBankingInstallment(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                    let prev = loans;
                    setLoans(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setExpences((exp) => exp + val);
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
                disabled={true}
                value={fbDaa}
                onChange={(e) => {
                  setFbDaa(parseInt(e.target.value));
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
                    let prev = fbCost;
                    setFbCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
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
                disabled={true}
                value={fdLi}
                onChange={(e) => {
                  setFdLi(parseInt(e.target.value));
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
                    let prev = fdCost;
                    setFdCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
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
                disabled={true}
                size="small"
                value={boxer}
                onChange={(e) => {
                  setBoxer(parseInt(e.target.value));
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
                    let prev = boxerCost;
                    setBoxerCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
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
                disabled={true}
                value={ctBpn}
                onChange={(e) => {
                  setCtBpn(parseInt(e.target.value));
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
                    let prev = ctBpnCost;
                    setCtBpnCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
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
                disabled={true}
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
                    let prev = gkCost;
                    setGkCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
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
                    value={inputsRepair[i].vehi_name}
                    onChange={(e) => {
                      setInputsRepair({
                        ...inputsRepair,
                        [i]: {
                          vehi_name: e.target.value,
                          description: inputsRepair[i].description,
                          cost: inputsRepair[i].cost,
                        },
                      });
                    }}
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
                    value={inputsRepair[i].description}
                    onChange={(e) => {
                      setInputsRepair({
                        ...inputsRepair,
                        [i]: {
                          vehi_name: inputsRepair[i].vehi_name,
                          description: e.target.value,
                          cost: inputsRepair[i].cost,
                        },
                      });
                    }}
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
                    value={inputsRepair[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let prev = inputsRepair[i].cost;
                        setInputsRepair({
                          ...inputsRepair,
                          [i]: {
                            vehi_name: inputsRepair[i].vehi_name,
                            description: inputsRepair[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        setExpences((exp) => exp - prev);
                        setTotalRepair((repir) => repir - prev);
                        setExpences((exp) => exp + val);
                        setTotalRepair((repir) => repir + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="rpr_icon"
                    onClick={() => {
                      let cost = inputsRepair[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalRepair((repir) => repir - cost);
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
                    let prev = otherRepairCost;
                    setOtherRepairCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalRepair((repir) => repir - prev);
                    setExpences((exp) => exp + val);
                    setTotalRepair((repir) => repir + val);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              {" "}
            </Grid>
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
                disabled={true}
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
                    let prev = fbCostFuel;
                    setFbCostFuel(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);
                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
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
                disabled={true}
                size="small"
                value={fdLiFuel}
                onChange={(e) => {
                  setFdLiFuel(e.target.value);
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
                  setFdDiscriptionFuel(e.target.value);
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
                    let prev = fdCostFuel;
                    setFdCostFuel(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());

                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);

                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
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
                disabled={true}
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
                  setBoxerDiscriptionFuel(e.target.value);
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
                    let prev = boxerCostFuel;
                    setBoxerCostFuel(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());

                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);

                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
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
                disabled={true}
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
                    let prev = ctBpnCostFuel;

                    setCtBpnCostFuel(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());

                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);

                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
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
                disabled={true}
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
                    let prev = gkCostFuel;

                    setGkCostFuel(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());

                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);

                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
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
                    value={inputsFuel[i].vehi_name}
                    onChange={(e) => {
                      setInputsFuel({
                        ...inputsFuel,
                        [i]: {
                          vehi_name: e.target.value,
                          description: inputsFuel[i].description,
                          cost: inputsFuel[i].cost,
                        },
                      });
                    }}
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
                    value={inputsFuel[i].description}
                    onChange={(e) => {
                      setInputsFuel({
                        ...inputsFuel,
                        [i]: {
                          vehi_name: inputsFuel[i].vehi_name,
                          description: e.target.value,
                          cost: inputsFuel[i].cost,
                        },
                      });
                    }}
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
                    value={inputsFuel[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        let prev = inputsFuel[i].cost;

                        setInputsFuel({
                          ...inputsFuel,
                          [i]: {
                            vehi_name: inputsFuel[i].vehi_name,
                            description: inputsFuel[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());

                        setExpences((exp) => exp - prev);
                        setTotalFuel((fuel) => fuel - prev);

                        setExpences((exp) => exp + val);
                        setTotalFuel((fuel) => fuel + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="rpr_icon"
                    onClick={() => {
                      let cost = inputsFuel[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalFuel((fuel) => fuel - cost);
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
                    let prev = otherFuelCost;
                    setOtherFuelCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    
                    setExpences((exp) => exp - prev);
                    setTotalFuel((fuel) => fuel - prev);

                    setExpences((exp) => exp + val);
                    setTotalFuel((fuel) => fuel + val);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              {" "}
            </Grid>
          </Grid>
          <Grid className="brre" item xs={12} sm={12}>
            <hr />
            <br />
          </Grid>
          <Grid container spacing={2}>
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
                    
                    let prev = rentCost;
                    
                    setRentCost(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    
                    setExpences((exp) => exp - prev);

                    setExpences((exp) => exp + val);
                  }
                }}
              />
            </Grid>
            <Grid className="txt_Labels" item xs={12} sm={3}></Grid>
            <Grid className="txt_Labels" item xs={12} sm={12}>
              <hr />
            </Grid>
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
                    value={inputsSalary[i].description}
                    onChange={(e) => {
                      setInputsSalary({
                        ...inputsSalary,
                        [i]: {
                          description: e.target.value,
                          cost: inputsSalary[i].cost,
                        },
                      });
                    }}
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
                    value={inputsSalary[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        
                        let prev = inputsSalary[i].cost;
                        
                        setInputsSalary({
                          ...inputsSalary,
                          [i]: {
                            description: inputsSalary[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        
                        setExpences((exp) => exp - prev);
                        setTotalSalary((exp) => exp - prev);

                        setExpences((exp) => exp + val);
                        setTotalSalary((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="othr_icon"
                    onClick={() => {
                      let cost = inputsSalary[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalSalary((exp) => exp - cost);
                      delete inputsSalary[i];
                      setInputsSalary({ ...inputsSalary });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ))}
          <Grid item xs={12} sm={12}>
            <br />
          </Grid>
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
                    value={inputsAdvance[i].description}
                    onChange={(e) => {
                      setInputsAdvance({
                        ...inputsAdvance,
                        [i]: {
                          description: e.target.value,
                          cost: inputsAdvance[i].cost,
                        },
                      });
                    }}
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
                    value={inputsAdvance[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        
                        let prev = inputsAdvance[i].cost;
                        
                        setInputsAdvance({
                          ...inputsAdvance,
                          [i]: {
                            description: inputsAdvance[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        
                         setExpences((exp) => exp - prev);
                         setTotalAdvance((exp) => exp - prev);

                        setExpences((exp) => exp + val);
                        setTotalAdvance((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="othr_icon"
                    onClick={() => {
                      let cost = inputsAdvance[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalAdvance((exp) => exp - cost);
                      delete inputsAdvance[i];
                      setInputsAdvance({ ...inputsAdvance });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          ))}
          <Grid item xs={12} sm={12}>
            <br />
          </Grid>
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
                    value={inputsTemporary[i].description}
                    onChange={(e) => {
                      setInputsTemporary({
                        ...inputsTemporary,
                        [i]: {
                          description: e.target.value,
                          cost: inputsTemporary[i].cost,
                        },
                      });
                    }}
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
                    value={inputsTemporary[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        
                        let prev = inputsTemporary[i].cost;
                        
                        setInputsTemporary({
                          ...inputsTemporary,
                          [i]: {
                            description: inputsTemporary[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        
                         setExpences((exp) => exp - prev);
                         setTotalTemp((exp) => exp - prev);

                        setExpences((exp) => exp + val);
                        setTotalTemp((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="othr_icon"
                    onClick={() => {
                      let cost = inputsTemporary[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalTemp((exp) => exp - cost);
                      delete inputsTemporary[i];
                      setInputsTemporary({ ...inputsTemporary });
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
                    let prev = salaryInstallment;
                    setSalaryInstallment(parseInt(e.target.value.trim()));
                    let val = parseInt(e.target.value.trim());
                    
                    setExpences((exp) => exp - prev);

                    setExpences((exp) => exp + val);
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
                    autoComplete="discription"
                    name="discription"
                    variant="outlined"
                    fullWidth
                    label="Discription"
                    size="small"
                    value={inputsOther[i].description}
                    onChange={(e) => {
                      setInputsOther({
                        ...inputsOther,
                        [i]: {
                          description: e.target.value,
                          cost: inputsOther[i].cost,
                        },
                      });
                    }}
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
                    value={inputsOther[i].cost}
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        
                        let prev = inputsOther[i].cost;
                        
                        setInputsOther({
                          ...inputsOther,
                          [i]: {
                            description: inputsOther[i].description,
                            cost: parseInt(e.target.value.trim()),
                          },
                        });
                        let val = parseInt(e.target.value.trim());
                        
                        setExpences((exp) => exp - prev);
                        setTotalOthers((exp) => exp - prev);

                        setExpences((exp) => exp + val);
                        setTotalOthers((exp) => exp + val);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MinusCircleOutlined
                    key={i + 4}
                    className="othr_icon"
                    onClick={() => {
                      let cost = inputsOther[i].cost;
                      setExpences((exp) => exp - cost);
                      setTotalOthers((exp) => exp - cost);
                      delete inputsOther[i];
                      setInputsOther({ ...inputsOther });
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
            <Grid item xs={12} sm={6}>
              <Card className="expences_card">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid className="txt_Labels" item xs={12} sm={4}>
                      Total Expences(LKR) :
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
                    <Grid item xs={12} sm={3}>
                      {" "}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <hr />{" "}
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <p className="txt_blnceEx">Balance(LKR) :</p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <p className="txt_blnceEx">
                        <CurrencyFormat
                          value={expences + previousBalance}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={" "}
                        />
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      {" "}
                    </Grid>
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
                onClick={makeExpences}
                disabled={loading || date === null ? true : false}
              >
                {loading ? <Spin size="small" /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
