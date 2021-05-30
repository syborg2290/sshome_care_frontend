import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, Grid, Checkbox } from '@material-ui/core'
import { Modal } from 'antd'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

// styles
import './Gass.css'

// icons
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AddIcon from '@material-ui/icons/Add'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HistoryIcon from '@material-ui/icons/History'

// components
import SelectGassModel from './components/selected_gas/selected_gas_modal'
import AddNewModel from './components/add_new_Gass/AddNew_Model'
import SellingHistory from './components/selling_history/Selling_History'
import GassHistoryModel from './components/gass_history/Gass_History'
import GasStockUpdate from './components/update_stocks/Update_gas_stocks'

import db from '../../../../config/firebase.js'

function createData (
  Weight,
  Qty,
  empty_tanks,
  type,
  cash_price,
  cashp_without_tank,
  sale_price,
  salep_without_tank,
  downpayment,
  Action
) {
  return {
    Weight,
    Qty,
    empty_tanks,
    type,
    cash_price,
    cashp_without_tank,
    sale_price,
    salep_without_tank,
    downpayment,
    Action
  }
}

export default function Gass () {
  // eslint-disable-next-line
  const [allTableData, setAllTableData] = useState([])
  const [tableData, setTableData] = useState([])
  // eslint-disable-next-line
  const [selectedGas, setSelectedGas] = useState([])
  const [selectedGasType, setSelectedGasType] = useState(null)
  const [gassModal, setGassModal] = useState(false) //models
  const [addNewGassModal, setAddNewGassModal] = useState(false) // Table models
  const [purchaseHistory, setPurchaseHistory] = useState(false) // Table models
  const [gassHistory, setGassHistory] = useState(false) //models
  const [gasStock, setGasStock] = useState(false) //models
  let history = useHistory()

  const showModalGass = () => {
    if (selectedGas.length <= 0) {
      NotificationManager.warning('Please select the gas')
    } else {
      setGassModal(true)
    }
  }

  const showModalAddGass = () => {
    setAddNewGassModal(true)
  }

  const closeModalAddGass = () => {
    setAddNewGassModal(false)
  }
  const PurchaseHistory = () => {
    setPurchaseHistory(true)
  }

  const GassHistory = () => {
    setGassHistory(true)
  }

  useEffect(() => {
    window.addEventListener('offline', function (e) {
      history.push('/connection_lost')
    })

    db.collection('gas').onSnapshot(snap => {
      var raw = []
      var rawAll = []

      snap.docs.forEach(each => {
        rawAll.push({
          id: each.id,
          data: each.data(),
          weight: each.data().weight
        })

        raw.push(
          createData(
            each.data().weight + ' Kg',
            each.data().qty,
            each.data().empty_tanks,
            each.data().stock_type,
            <CurrencyFormat
              value={each.data().price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' '}
            />,
            <CurrencyFormat
              value={each.data().withoutCprice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' '}
            />,
            <CurrencyFormat
              value={each.data().saleprice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' '}
            />,
            <CurrencyFormat
              value={each.data().withoutSaleprice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' '}
            />,
            <CurrencyFormat
              value={each.data().downpayment}
              displayType={'text'}
              thousandSeparator={true}
              prefix={' '}
            />
          )
        )
      })
      setAllTableData(rawAll)
      setTableData(raw)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Modal
        className='gassSell_model'
        visible={gassModal}
        footer={null}
        onCancel={() => {
          window.location.reload()
        }}
      >
        <div className='confoModel_body'>
          <SelectGassModel gasListProps={selectedGas} />
        </div>
      </Modal>

      {/* START add gass model */}

      <Modal
        className='confo_model'
        visible={addNewGassModal}
        footer={null}
        onCancel={() => {
          setAddNewGassModal(false)
        }}
      >
        <div className='confoModel_body'>
          <AddNewModel close_model={closeModalAddGass} />
        </div>
      </Modal>

      <Modal
        className='confo_model'
        visible={gasStock}
        footer={null}
        onCancel={() => {
          setGasStock(false)
        }}
      >
        <div className='confoModel_body'>
          <GasStockUpdate />
        </div>
      </Modal>

      {/* END add gass model */}

      {/* START add gass Purches History model */}

      <Modal
        className='purchesModel_model'
        visible={purchaseHistory}
        footer={null}
        onCancel={() => {
          setPurchaseHistory(false)
        }}
      >
        <div className='purchesModel_body'>
          <SellingHistory />
        </div>
      </Modal>

      {/* END add gass Purches History model */}

      {/* START  gass History model */}

      <Modal
        className='gassHistory_model'
        visible={gassHistory}
        footer={null}
        onCancel={() => {
          setGassHistory(false)
        }}
      >
        <div className='gassHistory-body'>
          <GassHistoryModel />
        </div>
      </Modal>

      {/* END  gass History model */}

      <Container component='main' className='main_containerr'>
        <Typography className='titles' variant='h5' gutterBottom>
          Gas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1}>
            <hr className='titles_hr' />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant='contained'
              onClick={showModalGass}
              endIcon={<ShoppingCartIcon />}
              color='primary'
              className='btn_gass'
            >
              All Gas Sell
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              onClick={PurchaseHistory}
              endIcon={<ShoppingBasketIcon />}
              color='primary'
              className='btn_pHistry'
            >
              All Gas Sold History
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              onClick={() => {
                let moveWith = {
                  pathname: '/admin/ui/gas_invoice_history',
                  search: '?query=abc',
                  state: {}
                }

                history.push(moveWith)
              }}
              endIcon={<ShoppingBasketIcon />}
              color='primary'
              className='btn_pHistry'
            >
              All Gas Invoice History
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              onClick={GassHistory}
              endIcon={<HistoryIcon />}
              color='primary'
              className='btn_gassHis'
            >
              Gas History
            </Button>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              onClick={showModalAddGass}
              endIcon={<AddIcon />}
              className='btn_gass_Add'
            >
              Add/Update Gas
            </Button>
          </Grid>
           <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              onClick={()=>{
                setGasStock(true)
              }}
              endIcon={<AddIcon />}
              className='btn_gass_Add'
            >
              Restock Gas
            </Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper} className='main_containerGass'>
          <Table
            className='gass_Table'
            size='medium'
            aria-label='a dense table'
          >
            <TableHead className='gass_Table_head'>
              <TableRow>
                <TableCell>Weight(kg)</TableCell>
                <TableCell align='right'>Full gas stock</TableCell>
                <TableCell align='right'>Empty gas stock</TableCell>
                <TableCell align='right'>Stock Type</TableCell>
                <TableCell align='right'>
                  Cash Price(With tank)&nbsp;(LKR)
                </TableCell>
                <TableCell align='right'>
                  Cash Price(Without tank)&nbsp;(LKR)
                </TableCell>
                <TableCell align='right'>
                  Sale Price(With tank)&nbsp;(LKR)
                </TableCell>
                <TableCell align='right'>
                  Sale Price(Without tank)&nbsp;(LKR)
                </TableCell>
                <TableCell align='right'>Downpayment&nbsp;(LKR)</TableCell>
                <TableCell align='right'>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map(row => (
                <TableRow key={row.Weight}>
                  <TableCell component='th' scope='row'>
                    {row.Weight}
                  </TableCell>
                  <TableCell align='right'>{row.Qty}</TableCell>
                  <TableCell align='right'>{row.empty_tanks}</TableCell>
                  <TableCell align='right'>{row.type}</TableCell>
                  <TableCell align='right'>{row.cash_price}</TableCell>
                  <TableCell align='right'>{row.cashp_without_tank}</TableCell>
                  <TableCell align='right'>{row.sale_price}</TableCell>
                  <TableCell align='right'>{row.salep_without_tank}</TableCell>
                  <TableCell align='right'>{row.downpayment}</TableCell>
                  <TableCell align='right'>
                    {' '}
                    <Checkbox
                      size='small'
                      className='checkboxAtt'
                      value={selectedGas.includes(row.Weight)}
                      onChange={e => {
                        if (
                          selectedGas.includes(row.Weight) &&
                          selectedGasType === row.type
                        ) {
                          selectedGas.splice(selectedGas.indexOf(row.Weight))
                        } else {
                          if (selectedGas.length === 0) {
                            let textWeight = row.Weight.substr(
                              0,
                              row.Weight.indexOf(' ')
                            )
                            db.collection('gas')
                              .where('weight', '==', textWeight)
                              .get()
                              .then(reG => {
                                if (reG.docs[0].data().qty === 0) {
                                  NotificationManager.warning('Out of stock')
                                } else {
                                  selectedGas.push(row.Weight)
                                  setSelectedGasType(row.type)
                                }
                              })
                          } else {
                            NotificationManager.warning(
                              'One weight for the one time'
                            )
                          }
                        }
                      }}
                    />
                  </TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NotificationContainer />
      </Container>
    </>
  )
}
