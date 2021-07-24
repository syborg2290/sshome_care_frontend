import { PrinterFilled } from '@ant-design/icons'
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
// icon
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import { Checkbox, DatePicker, Modal, Radio, Space, Spin } from 'antd'
import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { useHistory, useLocation } from 'react-router-dom'
import db, { storage } from '../../../../../../config/firebase.js'
import './gas_invoice.css'

// components
// import AddSerialNumber from "./components/Add_Serial_Number";

function Make_invoice() {
  const location = useLocation()
  const [allRoot, setAllRoot] = useState([])
  const [loadingsubmit, setLoadingSubmit] = useState(false)
  const [loadingNicsubmit, setLoadingNicSubmit] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [tablerows, setTableRows] = useState([])
  const [itemQty, setItemQty] = useState({})
  const [itemDP, setItemDP] = useState({})
  const [itemNOI, setItemNOI] = useState(0)
  const [itemAPI, setItemAPI] = useState(0)
  const [balance, setBalance] = useState(0)
  const [shortage, setShortage] = useState(0)
  const [dpayment, setDpayment] = useState(0)
  const [itemDiscount, setItemDiscount] = useState({})
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [gamisaraniInitialAmount, setGamisaraniInitialAmount] = useState(0)
  const [gamisaraniamount, setGamisaraniamount] = useState(0)
  const [gamisaraniId, setGamisaraniId] = useState('')
  const [gamisaraniNic, setGamisaraniNic] = useState('')
  const [days, setDays] = useState(new Date().getDay())
  const [dates, setDates] = useState(new Date().getDate())
  const [selectedType, setSelectedType] = useState('shop')
  const [rootVillage, setRootVillage] = useState('')
  const [gamisarani, setGamisarani] = useState(false)
  const [intialTimestamp, setInititialTimestamp] = useState(null)
  const [deadlineTimestamp, setDeadlineTimestamp] = useState(null)
  const [isFullPayment, setIsFullPayment] = useState(false)
  const [documentCharges, setDocumentCharges] = useState(0)
  const [invoiceStatus, setInvoiceStatus] = useState('new')
  // eslint-disable-next-line
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullname, setFullname] = useState('')
  const [nic, setNic] = useState('')

  let history = useHistory()
  let history2 = useHistory()
  const { confirm } = Modal

  const handleChange = event => {
    setSelectedType(event.target.value)
  }

  useEffect(() => {
    window.addEventListener('offline', function (e) {
      history2.push('/connection_lost')
    })

    window.addEventListener(
      'popstate',
      event => {
        if (event.state) {
          history.push('/showroom/ui/gass')
        }
      },
      false
    )

    window.history.pushState(
      { name: 'browserBack' },
      'on browser back click',
      window.location.href
    )
    window.history.pushState(
      { name: 'browserBack' },
      'on browser back click',
      window.location.href
    )

    setInvoiceNumber('IN-' + Math.floor(Math.random() * 1000000000 + 1))

    if (location.state != null) {
      var tableData = []
      var keepDataQTY = {}
      var keepDataDP = {}
      var keepDataDiscount = {}
      location.state.detail.forEach(obj => {
        db.collection('gas')
          .where('weight', '==', obj.data?.weight)
          .get()
          .then(reGasDow => {
            setDpayment(
              obj.gasType[obj.data?.weight] === 'fullgas'
                ? reGasDow.docs[0].data().downpayment
                : reGasDow.docs[0].data().emptydownpayment
            )
            setItemNOI(
              obj.gasType[obj.data?.weight] === 'fullgas'
                ? reGasDow.docs[0].data().noOfInstallments
                : reGasDow.docs[0].data().emptynoOfInstallments
            )
            setItemAPI(
              obj.gasType[obj.data?.weight] === 'fullgas'
                ? reGasDow.docs[0].data().amountPerIns
                : reGasDow.docs[0].data().emptyamountPerIns
            )
          })
        keepDataQTY[obj.data?.weight] = obj.qty
        keepDataDP[obj.data?.weight] =
          obj.paymentWay === 'PayandGo'
            ? obj.gasType[obj.data?.weight] === 'fullgas'
              ? obj.data?.saleprice
              : obj.data?.emptysaleprice
            : obj.gasType[obj.data?.weight] === 'fullgas'
              ? obj.data?.price
              : obj.data?.emptycashprice
        keepDataDiscount[obj.data?.weight] = 0
        obj.empty_weight = obj.data?.weight
        tableData.push(obj)
        setSelectedType(obj?.data.stock_type)
        if (obj.paymentWay === 'PayandGo') {
          setIsFullPayment(false)
        } else {
          setIsFullPayment(true)
        }

      })
      setItemDiscount(keepDataDiscount)
      setItemQty(keepDataQTY)
      setItemDP(keepDataDP)
      setTableRows(tableData)
    }

    db.collection('root')
      .get()
      .then(re => {
        var rawRoot = []
        re.docs.forEach(each => {
          rawRoot.push(each.data().root)
        })
        setAllRoot(rawRoot)
      })

    // eslint-disable-next-line
  }, [])

  const subTotalFunc = () => {
    var subTotalValue = 0
    for (var a = 0; a < tablerows.length; a++) {
      subTotalValue =
        subTotalValue +
        (itemDP[tablerows[a].data?.weight] -
          itemDiscount[tablerows[a].data?.weight]) *
        itemQty[tablerows[a].data?.weight]
    }
    let gamiam = gamisaraniamount === '' ? 0 : parseInt(gamisaraniamount)
    let fTotoS = subTotalValue - gamiam <= 0 ? 0 : subTotalValue - gamiam
    return fTotoS
  }

  const handleQTYChange = (e, weight, row) => {

    try {
      const { value } = e.target
      if (row.gasType[row.data?.weight] === 'fullgas') {

        if (
          Math.round(row.data.qty) >= (value === '' ? 1 : value)
        ) {
          setItemQty({
            ...itemQty,
            [row.data.weight]: value
          })
        } else {
          NotificationManager.warning('Out Of Stock')
        }
      } else {
        if (
          Math.round(row.data.empty_tanks) >=
          (value === '' ? 1 : value)
        ) {
          setItemQty({
            ...itemQty,
            [row.data.weight]: value
          })
        } else {
          NotificationManager.warning('Out Of Stock')
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  const showConfirm = () => {
    if (!isFullPayment) {
      if (deadlineTimestamp !== null) {
        if (balance === 0) {
          NotificationManager.warning('Balance amount is required ! )')
        } else {
          if (itemAPI === 0) {
            NotificationManager.warning(
              'Amount per installment amount is required ! )'
            )
          } else {
            if (itemNOI === 0) {
              NotificationManager.warning('No of installment is required ! )')
            } else {
              if (dpayment === 0) {
                NotificationManager.warning(
                  'Downpayment amount is required ! )'
                )
              } else {
                seFunc()
              }
            }
          }
        }
      } else {
        NotificationManager.warning('Deadline date is not selected ! )')
      }
    } else {
      seFunc()
    }
  }

  const seFunc = () => {
    if (subTotalFunc() - totalDiscount < 0) {
      NotificationManager.warning(
        'Issue with your calculations Pleace check again (May be Included minus values ! )'
      )
    } else {
      if (
        gamisarani &&
        (parseInt(gamisaraniamount) === '' ? 0 : parseInt(gamisaraniamount)) > 0
      ) {
        db.collection('gami_sarani')
          .doc(gamisaraniId)
          .get()
          .then(getRe => {
            let toto1 = gamisaraniamount === '' ? 0 : parseInt(gamisaraniamount)
            let totoF = getRe.data().currentDeposit - toto1
            db.collection('gami_sarani')
              .doc(gamisaraniId)
              .update({
                currentDeposit: totoF <= 0 ? 0 : totoF
              })
              .then(re => {
                let toto =
                  gamisaraniamount === '' ? 0 : parseInt(gamisaraniamount)
                db.collection('gami_sarani_withdrawhistory').add({
                  gami_nic: gamisaraniNic,
                  docId: gamisaraniId,
                  withdraw: toto,
                  balance: getRe.data().currentDeposit - toto,
                  date: intialTimestamp
                })

                confirm({
                  title: (
                    <h5 className='confo_title'>
                      Do you Want to Print an Invoice ?
                    </h5>
                  ),
                  icon: <PrinterFilled className='confo_icon' />,
                  okText: 'Yes',
                  cancelText: 'No',
                  async onOk() {
                    var arrayPassingItems = []

                    tablerows.forEach(one => {
                      let objItem = {
                        weight: one.data.weight,
                        qty: itemQty[one.data.weight],
                        gasType: one.gasType[one.data?.weight],
                        unit:
                          one.paymentWay === 'PayandGo'
                            ? one.withCylinder
                              ? one.data.saleprice
                              : one.data.withoutSaleprice
                            : one.withCylinder
                              ? one.data.price
                              : one.data.withoutCprice,
                        price: subTotalFunc() - totalDiscount
                      }
                      arrayPassingItems.push(objItem)
                    })

                    let moveWith = {
                      pathname:
                        '/showroom/gass/gass_Model/make_recipt/Gass_recipt',
                      search: '?query=abc',
                      state: {
                        detail: {
                          total: subTotalFunc() - totalDiscount,
                          list: arrayPassingItems
                        }
                      }
                    }
                    await invoiceIntoDb().then(() => {
                      history.push(moveWith)
                    })
                  },
                  async onCancel() {
                    await invoiceIntoDb().then(() => {
                      history.push('/showroom/ui/gass')
                    })
                  }
                })
              })
          })
      } else {
        confirm({
          title: (
            <h5 className='confo_title'>Do you Want to Print an Invoice?</h5>
          ),
          icon: <PrinterFilled className='confo_icon' />,
          okText: 'Yes',
          cancelText: 'No',
          async onOk() {
            var arrayPassingItems = []

            tablerows.forEach(one => {
              let objItem = {
                weight: one.data.weight,
                qty: itemQty[one.data.weight],
                gasType: one.gasType[one.data?.weight],
                unit:
                  one.paymentWay === 'PayandGo'
                    ? one.withCylinder
                      ? one.data.saleprice
                      : one.data.withoutSaleprice
                    : one.withCylinder
                      ? one.data.price
                      : one.data.withoutCprice,
                price: subTotalFunc() - totalDiscount
              }
              arrayPassingItems.push(objItem)
            })

            let moveWith = {
              pathname: '/showroom/gass/gass_Model/make_recipt/Gass_recipt',
              search: '?query=abc',
              state: {
                detail: {
                  total: subTotalFunc() - totalDiscount,
                  list: arrayPassingItems
                }
              }
            }
            await invoiceIntoDb().then(() => {
              history.push(moveWith)
            })
          },
          async onCancel() {
            await invoiceIntoDb().then(() => {
              history.push('/showroom/ui/gass')
            })
          }
        })
      }
    }
  }

  // eslint-disable-next-line
  const invoiceIntoDb = async () => {
    setLoadingSubmit(true)
    var times = new Date(
      new Date(intialTimestamp?.seconds * 1000).setMonth(
        new Date(intialTimestamp?.seconds * 1000).getMonth() + 1
      )
    ).setDate(parseInt(dates))
    if (tablerows.some(ob => ob.customer !== null)) {
      if (deadlineTimestamp !== null) {
        let randomNumber = Math.floor(Math.random() * 1000000000) + 1000
        //customerImageUrlFront
        if (tablerows[0]?.customer?.customerImageFileFront !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.customerImageFileFront?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.customerImageFileFront)
        }
        //customerImageUrlBack
        if (tablerows[0]?.customer?.customerImageFile2Back !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.customerImageFile2Back?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.customerImageFile2Back)
        }
        //trustee1ImageUrlFront
        if (tablerows[0]?.customer?.trustee1ImageFile1Front !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.trustee1ImageFile1Front?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.trustee1ImageFile1Front)
        }
        //trustee1ImageUrlBack
        if (tablerows[0]?.customer?.trustee1ImageFile2Back !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.trustee1ImageFile2Back?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.trustee1ImageFile2Back)
        }
        //trustee2ImageUrlFront
        if (tablerows[0]?.customer?.trustee2ImageFile1Front !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.trustee2ImageFile1Front?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.trustee2ImageFile1Front)
        }
        //trustee2ImageUrlBack
        if (tablerows[0]?.customer?.trustee2ImageFile2Back !== null) {
          await storage
            .ref(
              `images/${tablerows[0]?.customer?.trustee2ImageFile2Back?.name}${randomNumber}`
            )
            .put(tablerows[0]?.customer?.trustee2ImageFile2Back)
        }
        storage
          .ref('images')
          .child(
            tablerows[0]?.customer?.customerImageFileFront === null
              ? 'Avatar2.png'
              : tablerows[0]?.customer?.customerImageFileFront?.name +
              randomNumber
          )
          .getDownloadURL()
          .then(customerImageURLFront => {
            storage
              .ref('images')
              .child(
                tablerows[0]?.customer?.customerImageFile2Back === null
                  ? 'avatar1132.jpg'
                  : tablerows[0]?.customer?.customerImageFile2Back?.name +
                  randomNumber
              )
              .getDownloadURL()
              .then(customerImageURLBack => {
                storage
                  .ref('images')
                  .child(
                    tablerows[0]?.customer?.trustee1ImageFile1Front === null
                      ? 'Avatar2.png'
                      : tablerows[0]?.customer?.trustee1ImageFile1Front?.name +
                      randomNumber
                  )
                  .getDownloadURL()
                  .then(trustee1ImageURLFront => {
                    storage
                      .ref('images')
                      .child(
                        tablerows[0]?.customer?.trustee1ImageFile2Back === null
                          ? 'avatar1132.jpg'
                          : tablerows[0]?.customer?.trustee1ImageFile2Back
                            ?.name + randomNumber
                      )
                      .getDownloadURL()
                      .then(trustee1ImageURLBack => {
                        storage
                          .ref('images')
                          .child(
                            tablerows[0]?.customer?.trustee2ImageFile1Front ===
                              null
                              ? 'Avatar2.png'
                              : tablerows[0]?.customer?.trustee2ImageFile1Front
                                ?.name + randomNumber
                          )
                          .getDownloadURL()
                          .then(trustee2ImageURLFront => {
                            storage
                              .ref('images')
                              .child(
                                tablerows[0]?.customer
                                  ?.trustee2ImageFile2Back === null
                                  ? 'avatar1132.jpg'
                                  : tablerows[0]?.customer
                                    ?.trustee2ImageFile2Back?.name +
                                  randomNumber
                              )
                              .getDownloadURL()
                              .then(async trustee2ImageURLBack => {
                                //+++++++++++++++++++++++++++++++++++
                                if (tablerows[0].customer.customerId !== null) {
                                  let prevCust = await db
                                    .collection('gas_customer')
                                    .doc(tablerows[0].customer.customerId)
                                    .get()
                                  db.collection('gas_customer')
                                    .doc(tablerows[0].customer.customerId)
                                    .update({
                                      fname:
                                        tablerows[0].customer.customerFname,
                                      lname:
                                        tablerows[0].customer.customerLname,
                                      address1:
                                        tablerows[0].customer.customerAddress1,
                                      address2:
                                        tablerows[0].customer.customerAddress2,
                                      root_village: rootVillage,
                                      root:
                                        tablerows[0].customer
                                          .customerRootToHome,
                                      nic: tablerows[0].customer.customerNic,
                                      mid: prevCust.data().mid,
                                      relations_nics:
                                        tablerows[0].customer
                                          .customerRelatedNics,
                                      mobile1:
                                        tablerows[0].customer.customerMobile1,
                                      mobile2:
                                        tablerows[0].customer.customerMobile2,
                                      customerFrontURL: customerImageURLFront,
                                      customerBackURL: customerImageURLBack
                                    })
                                    .then(_ => {
                                      let arrayItems = []
                                      tablerows.forEach(one => {
                                        let objItem = {
                                          item_id: one.id,
                                          withCylinder: one.withCylinder,
                                          price:
                                            itemDP[one.weight] === ''
                                              ? 0
                                              : parseInt(itemDP[one.weight]),
                                          qty: parseInt(itemQty[one.weight]),
                                          discount:
                                            itemDiscount[one.weight] === ''
                                              ? 0
                                              : itemDiscount[one.weight],
                                          weight: one.weight,
                                          data: one.data,
                                          gasType: one.gasType[one.data.weight]
                                        }
                                        arrayItems.push(objItem)
                                      })
                                      db.collection('gas_selling_history').add({
                                        invoice_number: invoiceNumber,
                                        gas: arrayItems,
                                        gasType: '',
                                        paymentWay: isFullPayment
                                          ? 'FullPayment'
                                          : 'PayandGo',
                                        selectedType: selectedType,
                                        total:
                                          subTotalFunc() -
                                          (totalDiscount === ''
                                            ? 0
                                            : totalDiscount),
                                        date: intialTimestamp
                                      })
                                      db.collection('gas_invoice')
                                        .add({
                                          invoice_number: invoiceNumber,
                                          items: arrayItems,
                                          gasType: '',
                                          customer_id:
                                            tablerows[0].customer.customerId,
                                          nic:
                                            tablerows[0].customer.customerNic,
                                          mid: tablerows[0].customer.mid,
                                          installemtnDay: days,
                                          installemtnDate:
                                            dates === '' ? 1 : dates,
                                          gamisarani: gamisarani,
                                          gamisarani_amount:
                                            gamisaraniamount === ''
                                              ? 0
                                              : parseInt(gamisaraniamount),
                                          paymentWay: isFullPayment
                                            ? 'FullPayment'
                                            : 'PayandGo',
                                          downpayment: dpayment,
                                          noOfInstallment: itemNOI,
                                          amountPerInstallment: itemAPI,
                                          balance: balance,
                                          deadlineTimestamp: deadlineTimestamp,
                                          selectedType: selectedType,
                                          root_village: rootVillage,
                                          discount:
                                            totalDiscount === ''
                                              ? 0
                                              : totalDiscount,
                                          shortage:
                                            shortage === '' ? 0 : shortage,
                                          total:
                                            subTotalFunc() -
                                            (totalDiscount === ''
                                              ? 0
                                              : totalDiscount),
                                          status_of_payandgo: 'onGoing',
                                          date: intialTimestamp,
                                          document_charges: documentCharges,
                                          nextDate: firebase.firestore.Timestamp.fromDate(
                                            new Date(times)
                                          )
                                        })
                                        .then(_ => {
                                          db.collection('gas_trustee').add({
                                            fname:
                                              tablerows[0].customer
                                                .trustee1Fname,
                                            lname:
                                              tablerows[0].customer
                                                .trustee1Lname,
                                            nic:
                                              tablerows[0].customer.trustee1Nic,
                                            address1:
                                              tablerows[0].customer
                                                .trustee1Address1,
                                            address2:
                                              tablerows[0].customer
                                                .trustee1Address2,
                                            mobile1:
                                              tablerows[0].customer
                                                .trustee1Mobile1,
                                            mobile2:
                                              tablerows[0].customer
                                                .trustee1Mobile2,
                                            invoice_number: invoiceNumber,
                                            trusteeFrontURL: trustee1ImageURLFront,
                                            trusteeBackURL: trustee1ImageURLBack,
                                            date: firebase.firestore.FieldValue.serverTimestamp()
                                          })
                                          if (
                                            tablerows[0].customer.trustee2Nic &&
                                            tablerows[0].customer
                                              .trustee2Fname &&
                                            tablerows[0].customer
                                              .trustee2Lname &&
                                            tablerows[0].customer
                                              .trustee2Address1 &&
                                            tablerows[0].customer
                                              .trustee2Mobile1
                                          ) {
                                            db.collection('gas_trustee').add({
                                              fname:
                                                tablerows[0].customer
                                                  .trustee2Fname,
                                              lname:
                                                tablerows[0].customer
                                                  .trustee2Lname,
                                              nic:
                                                tablerows[0].customer
                                                  .trustee2Nic,
                                              address1:
                                                tablerows[0].customer
                                                  .trustee2Address1,
                                              address2:
                                                tablerows[0].customer
                                                  .trustee2Address2,
                                              mobile1:
                                                tablerows[0].customer
                                                  .trustee2Mobile1,
                                              mobile2:
                                                tablerows[0].customer
                                                  .trustee2Mobile2,
                                              invoice_number: invoiceNumber,
                                              trusteeFrontURL: trustee2ImageURLFront,
                                              trusteeBackURL: trustee2ImageURLBack,
                                              date: firebase.firestore.FieldValue.serverTimestamp()
                                            })
                                          }
                                          if (invoiceStatus === 'new') {
                                            tablerows.forEach(
                                              async itemUDoc => {
                                                let newArray = await db
                                                  .collection('gas')
                                                  .doc(itemUDoc.id)
                                                  .get()

                                                //++++++++++++++++++++++++++++++++++++++++++++
                                                if (invoiceStatus === 'new') {
                                                  if (
                                                    newArray.data().weight !==
                                                    itemUDoc.empty_weight
                                                  ) {
                                                    await db
                                                      .collection('gas')
                                                      .doc(itemUDoc.id)
                                                      .update({
                                                        qty:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                            : Math.round(
                                                              newArray.data()
                                                                .qty
                                                            )
                                                      })
                                                    db.collection('gas')
                                                      .where(
                                                        'stock_type',
                                                        '==',
                                                        itemUDoc.data.stock_type
                                                      )
                                                      .get()
                                                      .then(eachGaIn => {
                                                        eachGaIn.docs.forEach(
                                                          async eachFor => {
                                                            if (
                                                              eachFor.data
                                                                .weight ===
                                                              itemUDoc.empty_weight
                                                            ) {
                                                              await db
                                                                .collection(
                                                                  'gas'
                                                                )
                                                                .doc(eachFor.id)
                                                                .update({
                                                                  empty_tanks:
                                                                    Math.round(
                                                                      eachFor
                                                                        .data
                                                                        .empty_tanks
                                                                    ) +
                                                                    parseInt(
                                                                      !itemUDoc.withCylinder
                                                                        ? itemQty[
                                                                        itemUDoc
                                                                          .data
                                                                          .weight
                                                                        ]
                                                                        : 0
                                                                    )
                                                                })
                                                            }
                                                          }
                                                        )
                                                      })
                                                  } else {
                                                    await db
                                                      .collection('gas')
                                                      .doc(itemUDoc.id)
                                                      .update({
                                                        qty:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                            : Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ),
                                                        empty_tanks:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .empty_tanks
                                                            ) +
                                                            parseInt(
                                                              !itemUDoc.withCylinder
                                                                ? itemQty[
                                                                itemUDoc
                                                                  .data
                                                                  .weight
                                                                ]
                                                                : 0
                                                            )
                                                            : Math.round(
                                                              newArray.data()
                                                                .empty_tanks
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                      })
                                                  }
                                                }
                                              }
                                            )
                                          }
                                          setLoadingSubmit(false)
                                        })
                                    })
                                } else {
                                  db.collection('gas_customer')
                                    .add({
                                      fname:
                                        tablerows[0].customer.customerFname,
                                      lname:
                                        tablerows[0].customer.customerLname,
                                      address1:
                                        tablerows[0].customer.customerAddress1,
                                      address2:
                                        tablerows[0].customer.customerAddress2,
                                      root:
                                        tablerows[0].customer
                                          .customerRootToHome,
                                      root_village: rootVillage,
                                      nic: tablerows[0].customer.customerNic,
                                      mid: tablerows[0].customer.mid,
                                      relations_nics:
                                        tablerows[0].customer
                                          .customerRelatedNics,
                                      mobile1:
                                        tablerows[0].customer.customerMobile1,
                                      mobile2:
                                        tablerows[0].customer.customerMobile2,
                                      customerFrontURL: customerImageURLFront,
                                      customerBackURL: customerImageURLBack,
                                      status: 'normal',
                                      date: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                    .then(cust => {
                                      let arrayItems = []
                                      tablerows.forEach(one => {
                                        let objItem = {
                                          item_id: one.id,
                                          withCylinder: one.withCylinder,
                                          price:
                                            itemDP[one.data.weight] === ''
                                              ? 0
                                              : parseInt(
                                                itemDP[one.data.weight]
                                              ),
                                          qty: parseInt(
                                            itemQty[one.data.weight]
                                          ),
                                          discount:
                                            itemDiscount[one.data.weight] === ''
                                              ? 0
                                              : itemDiscount[one.data.weight],
                                          weight: one.data.weight,
                                          data: one.data,
                                          gasType: one.gasType[one.data.weight]
                                        }
                                        arrayItems.push(objItem)
                                      })
                                      db.collection('gas_selling_history').add({
                                        invoice_number: invoiceNumber,
                                        gas: arrayItems,
                                        gasType: '',
                                        paymentWay: isFullPayment
                                          ? 'FullPayment'
                                          : 'PayandGo',
                                        selectedType: selectedType,
                                        total:
                                          subTotalFunc() -
                                          (totalDiscount === ''
                                            ? 0
                                            : totalDiscount),
                                        date: intialTimestamp
                                      })
                                      db.collection('gas_invoice')
                                        .add({
                                          invoice_number: invoiceNumber,
                                          items: arrayItems,
                                          gasType: '',
                                          customer_id: cust.id,
                                          nic:
                                            tablerows[0].customer.customerNic,
                                          mid: tablerows[0].customer.mid,
                                          installemtnDay: days,
                                          installemtnDate:
                                            dates === '' ? 1 : dates,
                                          gamisarani: gamisarani,
                                          gamisarani_amount:
                                            gamisaraniamount === ''
                                              ? 0
                                              : parseInt(gamisaraniamount),
                                          paymentWay: isFullPayment
                                            ? 'FullPayment'
                                            : 'PayandGo',
                                          downpayment: dpayment,
                                          noOfInstallment: itemNOI,
                                          amountPerInstallment: itemAPI,
                                          balance: balance,
                                          deadlineTimestamp: deadlineTimestamp,
                                          selectedType: selectedType,
                                          root_village: rootVillage,
                                          discount:
                                            totalDiscount === ''
                                              ? 0
                                              : totalDiscount,
                                          shortage:
                                            shortage === '' ? 0 : shortage,
                                          total:
                                            subTotalFunc() -
                                            (totalDiscount === ''
                                              ? 0
                                              : totalDiscount),
                                          status_of_payandgo: 'onGoing',
                                          date: intialTimestamp,
                                          document_charges: documentCharges,
                                          nextDate: firebase.firestore.Timestamp.fromDate(
                                            new Date(times)
                                          )
                                        })
                                        .then(_ => {
                                          db.collection('gas_trustee').add({
                                            fname:
                                              tablerows[0].customer
                                                .trustee1Fname,
                                            lname:
                                              tablerows[0].customer
                                                .trustee1Lname,
                                            nic:
                                              tablerows[0].customer.trustee1Nic,
                                            address1:
                                              tablerows[0].customer
                                                .trustee1Address1,
                                            address2:
                                              tablerows[0].customer
                                                .trustee1Address2,
                                            mobile1:
                                              tablerows[0].customer
                                                .trustee1Mobile1,
                                            mobile2:
                                              tablerows[0].customer
                                                .trustee1Mobile2,
                                            invoice_number: invoiceNumber,
                                            trusteeFrontURL: trustee1ImageURLFront,
                                            trusteeBackURL: trustee1ImageURLBack,
                                            date: firebase.firestore.FieldValue.serverTimestamp()
                                          })
                                          if (
                                            tablerows[0].customer.trustee2Nic &&
                                            tablerows[0].customer
                                              .trustee2Fname &&
                                            tablerows[0].customer
                                              .trustee2Lname &&
                                            tablerows[0].customer
                                              .trustee2Address1 &&
                                            tablerows[0].customer
                                              .trustee2Mobile1
                                          ) {
                                            db.collection('gas_trustee').add({
                                              fname:
                                                tablerows[0].customer
                                                  .trustee2Fname,
                                              lname:
                                                tablerows[0].customer
                                                  .trustee2Lname,
                                              nic:
                                                tablerows[0].customer
                                                  .trustee2Nic,
                                              address1:
                                                tablerows[0].customer
                                                  .trustee2Address1,
                                              address2:
                                                tablerows[0].customer
                                                  .trustee2Address2,
                                              mobile1:
                                                tablerows[0].customer
                                                  .trustee2Mobile1,
                                              mobile2:
                                                tablerows[0].customer
                                                  .trustee2Mobile2,
                                              invoice_number: invoiceNumber,
                                              trusteeFrontURL: trustee2ImageURLFront,
                                              trusteeBackURL: trustee2ImageURLBack,
                                              date: firebase.firestore.FieldValue.serverTimestamp()
                                            })
                                          }
                                          if (invoiceStatus === 'new') {
                                            tablerows.forEach(
                                              async itemUDoc => {
                                                let newArray = await db
                                                  .collection('gas')
                                                  .doc(itemUDoc.id)
                                                  .get()

                                                //++++++++++++++++++++++++++++++++++++++++++++
                                                if (invoiceStatus === 'new') {
                                                  if (
                                                    newArray.data().weight !==
                                                    itemUDoc.empty_weight
                                                  ) {
                                                    await db
                                                      .collection('gas')
                                                      .doc(itemUDoc.id)
                                                      .update({
                                                        qty:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                            : Math.round(
                                                              newArray.data()
                                                                .qty
                                                            )
                                                      })
                                                    db.collection('gas')
                                                      .where(
                                                        'stock_type',
                                                        '==',
                                                        itemUDoc.data.stock_type
                                                      )
                                                      .get()
                                                      .then(eachGaIn => {
                                                        eachGaIn.docs.forEach(
                                                          async eachFor => {
                                                            if (
                                                              eachFor.data
                                                                .weight ===
                                                              itemUDoc.empty_weight
                                                            ) {
                                                              await db
                                                                .collection(
                                                                  'gas'
                                                                )
                                                                .doc(eachFor.id)
                                                                .update({
                                                                  empty_tanks:
                                                                    Math.round(
                                                                      eachFor
                                                                        .data
                                                                        .empty_tanks
                                                                    ) +
                                                                    parseInt(
                                                                      !itemUDoc.withCylinder
                                                                        ? itemQty[
                                                                        itemUDoc
                                                                          .data
                                                                          .weight
                                                                        ]
                                                                        : 0
                                                                    )
                                                                })
                                                            }
                                                          }
                                                        )
                                                      })
                                                  } else {
                                                    await db
                                                      .collection('gas')
                                                      .doc(itemUDoc.id)
                                                      .update({
                                                        qty:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                            : Math.round(
                                                              newArray.data()
                                                                .qty
                                                            ),
                                                        empty_tanks:
                                                          itemUDoc.gasType[itemUDoc.data
                                                            .weight] === 'fullgas'
                                                            ? Math.round(
                                                              newArray.data()
                                                                .empty_tanks
                                                            ) +
                                                            parseInt(
                                                              !itemUDoc.withCylinder
                                                                ? itemQty[
                                                                itemUDoc
                                                                  .data
                                                                  .weight
                                                                ]
                                                                : 0
                                                            )
                                                            : Math.round(
                                                              newArray.data()
                                                                .empty_tanks
                                                            ) -
                                                            itemQty[
                                                            itemUDoc.data
                                                              .weight
                                                            ]
                                                      })
                                                  }
                                                }
                                              }
                                            )
                                          }
                                          setLoadingSubmit(false)
                                        })
                                    })
                                }
                                //+++++++++++++++++++++++++++++++++++
                              })
                          })
                      })
                  })
              })
          })
      } else {
        NotificationManager.warning('Deadline date is not selected ! )')
      }
    } else {
      let arrayItems = []
      tablerows.forEach(one => {
        let objItem = {
          item_id: one.id,
          withCylinder: one.withCylinder,
          price:
            itemDP[one.data.weight] === ''
              ? 0
              : parseInt(itemDP[one.data.weight]),
          qty: parseInt(itemQty[one.data.weight]),
          discount:
            itemDiscount[one.data.weight] === ''
              ? 0
              : itemDiscount[one.data.weight],
          weight: one.data.weight,
          data: one.data,
          gasType: one.gasType[one.data.weight]
        }
        arrayItems.push(objItem)
        console.log(one)
      })
     
      db.collection('gas_selling_history').add({
        invoice_number: invoiceNumber,
        gas: arrayItems,
        gasType: '',
        paymentWay: isFullPayment ? 'FullPayment' : 'PayandGo',
        selectedType: selectedType,
        total: subTotalFunc() - (totalDiscount === '' ? 0 : totalDiscount),
        date: intialTimestamp
      })

      db.collection('gas_invoice').add({
        invoice_number: invoiceNumber,
        items: arrayItems,
        gasType: '',
        customer_id: null,
        mid: null,
        installemtnDay: null,
        installemtnDate: null,
        gamisarani: gamisarani,
        gamisarani_amount:
          gamisaraniamount === '' ? 0 : parseInt(gamisaraniamount),
        paymentWay: isFullPayment ? 'FullPayment' : 'PayandGo',
        downpayment: dpayment,
        noOfInstallment: itemNOI,
        amountPerInstallment: itemAPI,
        balance: balance,
        deadlineTimestamp: null,
        selectedType: selectedType,
        root_village: rootVillage,
        discount: totalDiscount === '' ? 0 : totalDiscount,
        shortage: shortage === '' ? 0 : shortage,
        total: subTotalFunc() - (totalDiscount === '' ? 0 : totalDiscount),
        status_of_payandgo: 'Done',
        date: intialTimestamp,
        document_charges: documentCharges,
        fullname: fullname,
        nic: nic,
        nextDate: null
      })

      if (invoiceStatus === 'new') {
        tablerows.forEach(async itemUDoc => {
          let newArray = await db
            .collection('gas')
            .doc(itemUDoc.id)
            .get()

          //++++++++++++++++++++++++++++++++++++++++++++
          if (invoiceStatus === 'new') {
            if (newArray.data().weight !== itemUDoc.empty_weight) {
              await db
                .collection('gas')
                .doc(itemUDoc.id)
                .update({
                  qty:
                    itemUDoc.gasType[itemUDoc.data
                      .weight] === 'fullgas'
                      ? Math.round(newArray.data().qty) -
                      itemQty[itemUDoc.data.weight]
                      : Math.round(newArray.data().qty)
                })
              db.collection('gas')
                .where('stock_type', '==', itemUDoc.data.stock_type)
                .get()
                .then(eachGaIn => {
                  eachGaIn.docs.forEach(async eachFor => {
                    if (eachFor.data.weight === itemUDoc.empty_weight) {
                      await db
                        .collection('gas')
                        .doc(eachFor.id)
                        .update({
                          empty_tanks:
                            Math.round(eachFor.data.empty_tanks) +
                            parseInt(
                              !itemUDoc.withCylinder
                                ? itemQty[itemUDoc.data.weight]
                                : 0
                            )
                        })
                    }
                  })
                })
            } else {
              await db
                .collection('gas')
                .doc(itemUDoc.id)
                .update({
                  qty:
                    itemUDoc.gasType[itemUDoc.data
                      .weight] === 'fullgas'
                      ? Math.round(newArray.data().qty) -
                      itemQty[itemUDoc.data.weight]
                      : Math.round(newArray.data().qty),
                  empty_tanks:
                    itemUDoc.gasType[itemUDoc.data
                      .weight] === 'fullgas'
                      ? Math.round(newArray.data().empty_tanks) +
                      parseInt(
                        !itemUDoc.withCylinder
                          ? itemQty[itemUDoc.data.weight]
                          : 0
                      )
                      : Math.round(newArray.data().empty_tanks) -
                      itemQty[itemUDoc.data.weight]
                })
            }
          }
        })
      }
      setLoadingSubmit(false)
    }
  }

  const getCurrentBalanceFromGami = () => {
    setLoadingNicSubmit(true)
    db.collection('gami_sarani')
      .where('nic', '==', gamisaraniNic)
      .get()
      .then(reGami => {
        if (reGami.docs.length > 0) {
          setGamisaraniId(reGami.docs[0].id)
          setGamisaraniInitialAmount(reGami.docs[0].data().currentDeposit)
          setGamisaraniamount(reGami.docs[0].data().currentDeposit)
          setLoadingNicSubmit(false)
          if (
            reGami.docs[0].data().currentDeposit -
            (subTotalFunc() - totalDiscount) <
            0
          ) {
            NotificationManager.warning(
              `Info gamisarani ${gamisaraniNic}, not enough balance for pay the total !`
            )
          }
        } else {
          setLoadingNicSubmit(false)
          NotificationManager.warning(
            'Any gamisarani customer not found from this NIC!'
          )
        }
      })
  }

  const handleEmptyWeight = (empty_weight, weight, row) => {
    db.collection('gas')
      .where('weight', '==', empty_weight)
      .get()
      .then(doc => {
        doc.docs.forEach(eachOne => {
          if (eachOne.data().stock_type === row.data.stock_type) {
            if (doc.docs.length > 0) {
              let index = tablerows.findIndex(
                // eslint-disable-next-line
                element => {
                  if (element?.id === row?.id) {
                    return true
                  }
                }
              )
              tablerows[index].empty_weight = empty_weight
            } else {
              NotificationManager.warning('Unavailable weight!')
            }
          }
        })
      })
  }

  return (
    <>
      {/*Start Serial Number Model */}

      {/* End Serial Number Model  */}

      <div className='main_In'>
        <Container className='container_In' component='main' maxWidth='xl'>
          <div className='paper_in'>
            <form className='form_in' noValidate>
              <Typography component='h1' variant='h5'>
                Invoice
              </Typography>
              <hr className='hr_invoice' />
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className='lbl_invoice'>Invoice#</div>
                </Grid>
                <Grid item xs={5}>
                  <h3>{invoiceNumber}</h3>
                </Grid>
                <Grid item xs={5}></Grid>

                <TableContainer className='tbl_Container' component={Paper}>
                  <Table className='table' aria-label='spanning table'>
                    <TableHead>
                      <TableRow>
                        <TableCell className='tbl_Cell'>Weight</TableCell>
                        <TableCell className='tbl_Cell'>Empty Weight</TableCell>
                        <TableCell
                          className='tbl_Cell'
                          align='right'
                          colSpan={1}
                        >
                          Qty
                        </TableCell>

                        <TableCell
                          className='tbl_Cell'
                          align='right'
                          colSpan={1}
                        >
                          Price(LKR)
                        </TableCell>
                        <TableCell
                          className='tbl_Cell'
                          align='right'
                          colSpan={1}
                        >
                          With cylinder
                        </TableCell>
                        <TableCell className='tbl_Cell' align='right'>
                          Discount(LKR)
                        </TableCell>
                        <TableCell className='tbl_Cell' align='right'>
                          Sum(LKR)
                        </TableCell>
                        <TableCell className='tbl_Cell_Ac' align='right'>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tablerows.map(row => (
                        <TableRow key={row.data.weight}>
                          <TableCell>{row.data.weight}</TableCell>
                          <TableCell align='right'>
                            {row.gasType[row.data.weight] === 'fullgas' && row.withCylinder !== true
                              ? <TextField
                                key={row.empty_weight}
                                id={row.empty_weight.toString()}
                                className='txt_qty'
                                variant='outlined'
                                size='small'
                                InputProps={{ inputProps: { min: 1 } }}
                                type='number'
                                fullWidth
                                value={row.empty_weight}
                                onChange={e => {
                                  if (e.target.value !== '') {

                                    handleEmptyWeight(e, row.data.weight, row)
                                  }
                                }}
                              /> : "None"
                            }
                          </TableCell>

                          <TableCell align='right'>
                            <TextField
                              key={row.data.weight}
                              id={row.data.weight.toString()}
                              className='txt_qty'
                              variant='outlined'
                              size='small'
                              InputProps={{ inputProps: { min: 1 } }}
                              type='number'
                              fullWidth
                              value={itemQty[row.data.weight]}
                              onChange={e => {
                                if (e.target.value !== '') {
                                  handleQTYChange(e, row.data.weight, row)
                                }
                              }}
                            />
                          </TableCell>

                          <TableCell align='right'>
                            {' '}
                            <TextField
                              className='txt_dpayment'
                              variant='outlined'
                              size='small'
                              InputProps={{ inputProps: { min: 0 } }}
                              type='number'
                              fullWidth
                              key={row.data.weight}
                              id={row.data.weight.toString()}
                              value={itemDP[row.data.weight]}
                              onChange={e => {
                                if (e.target.value !== '') {
                                  setItemDP({
                                    ...itemDP,
                                    [row.data.weight]: e.target.value
                                  })
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell align='right'>
                            {row.gasType[row.data.weight] === 'fullgas'
                              ? <Checkbox
                                defaultChecked={true}
                                onChange={e => {
                                  if (row.withCylinder) {
                                    let index = tablerows.indexOf(
                                      ob => ob.id === row.id
                                    )
                                    let currentTableObj = tablerows.filter(
                                      ob => ob.id === row.id
                                    )[0]
                                    let currentTableRowsAr = tablerows
                                    let currentDpObj = itemDP
                                    currentDpObj[row.data.weight] =
                                      row.paymentWay === 'PayandGo'
                                        ? row.data?.withoutSaleprice
                                        : row.data?.withoutCprice
                                    currentTableObj.withCylinder = false
                                    currentTableRowsAr[index] = currentTableObj
                                    setItemDP(currentDpObj)
                                    setTableRows([...currentTableRowsAr])
                                  } else {
                                    let index = tablerows.indexOf(
                                      ob => ob.id === row.id
                                    )
                                    let currentTableObj = tablerows.filter(
                                      ob => ob.id === row.id
                                    )[0]
                                    let currentTableRowsAr = tablerows
                                    let currentDpObj = itemDP
                                    currentDpObj[row.data.weight] =
                                      row.paymentWay === 'PayandGo'
                                        ? row.data?.saleprice
                                        : row.data?.price

                                    currentTableObj.withCylinder = true
                                    currentTableRowsAr[index] = currentTableObj
                                    setItemDP(currentDpObj)
                                    setTableRows([...currentTableRowsAr])
                                  }
                                }}
                              /> : "None"
                            }
                          </TableCell>

                          <TableCell align='right'>
                            {' '}
                            <TextField
                              className='txt_dpayment'
                              variant='outlined'
                              size='small'
                              InputProps={{ inputProps: { min: 0 } }}
                              type='number'
                              fullWidth
                              key={row.data.weight}
                              id={row.data.weight.toString()}
                              value={itemDiscount[row.data.weight]}
                              onChange={e => {
                                if (e.target.value !== '') {
                                  if (
                                    e.target.value < itemDP[row.data.weight]
                                  ) {
                                    setItemDiscount({
                                      ...itemDiscount,
                                      [row.data.weight]: e.target.value
                                    })
                                  }
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell
                            align='right'
                            key={row.data.weight}
                            id={row.data.weight.toString()}
                          >
                            {' '}
                            <CurrencyFormat
                              value={
                                parseInt(
                                  itemDP[row.data.weight] -
                                  itemDiscount[row.data.weight]
                                ) * itemQty[row.data.weight]
                              }
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={' Rs. '}
                            />
                          </TableCell>
                          <TableCell align='right'>
                            <CloseOutlinedIcon
                              className='iconcls_invTbl'
                              onClick={e => {
                                tablerows.forEach(itemRe => {
                                  if (itemRe.data.weight === row.data.weight) {
                                    let index = tablerows.findIndex(
                                      // eslint-disable-next-line
                                      element => {
                                        if (
                                          element.data.weight ===
                                          row.data.weight
                                        ) {
                                          return true
                                        }
                                      }
                                    )
                                    tablerows.splice(index, 1)
                                    setTableRows([...tablerows])
                                    if (tablerows.length === 0) {
                                      history.push('/showroom/ui/gass')
                                    }
                                    delete itemQty[row.data.weight]
                                    delete itemDP[row.data.weight]
                                    delete itemNOI[row.data.weight]
                                    delete itemAPI[row.data.weight]
                                    delete itemDiscount[row.data.weight]
                                  }
                                })
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell align='right' colSpan={4}>
                          Subtotal(LKR)
                        </TableCell>
                        <TableCell align='right' colSpan={1}>
                          <CurrencyFormat
                            value={subTotalFunc()}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={' Rs. '}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='right' colSpan={4}>
                          Discount(LKR)
                        </TableCell>
                        <TableCell className='cel' align='right' colSpan={1}>
                          <TextField
                            className='txt_distg'
                            variant='outlined'
                            size='small'
                            type='number'
                            InputProps={{ inputProps: { min: 0 } }}
                            fullWidth
                            disabled={true}
                            value={totalDiscount}
                            onChange={e => {
                              if (e.target.value !== '') {
                                if (e.target.value < subTotalFunc()) {
                                  setTotalDiscount(e.target.value)
                                }
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align='right' colSpan={4}>
                          Total(LKR)
                        </TableCell>
                        <TableCell align='right' colSpan={1}>
                          <CurrencyFormat
                            value={subTotalFunc() - totalDiscount}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={' Rs. '}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              {/* //     */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card className='gami_card'>
                    <Grid className='gami_card-grid' container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <p className='gami_cust'>
                          Choose Installment Repayment Plan:
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        NO. of Installments:
                      </Grid>
                      <Grid className='noi' item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          variant='outlined'
                          size='small'
                          InputProps={{ inputProps: { min: 0 } }}
                          type='number'
                          fullWidth
                          label='NOI'
                          disabled={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                          value={itemNOI}
                          onChange={e => {
                            if (e.target.value !== '') {
                              setItemNOI(parseInt(e.target.value.trim()))
                              setBalance(
                                parseInt(e.target.value.trim()) * itemAPI
                              )
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        Amount per Installments(LKR):
                      </Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          variant='outlined'
                          size='small'
                          InputProps={{ inputProps: { min: 0 } }}
                          type='number'
                          label=' API'
                          fullWidth
                          disabled={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                          value={itemAPI}
                          onChange={e => {
                            if (e.target.value !== '') {
                              setItemAPI(parseInt(e.target.value.trim()))
                              setBalance(
                                parseInt(e.target.value.trim()) * itemNOI
                              )
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>

                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        Down Payment(LKR):
                      </Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          variant='outlined'
                          size='small'
                          label='Down Payment'
                          InputProps={{ inputProps: { min: 0 } }}
                          type='number'
                          fullWidth
                          value={dpayment}
                          disabled={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                          onChange={e => {
                            if (e.target.value !== '') {
                              setDpayment(parseInt(e.target.value.trim()))
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>

                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        Balance(LKR):
                      </Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          variant='outlined'
                          size='small'
                          label='Balance'
                          InputProps={{ inputProps: { min: 0 } }}
                          type='number'
                          fullWidth
                          disabled={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                          value={balance}
                          onChange={e => {
                            if (e.target.value !== '') {
                              setBalance(parseInt(e.target.value.trim()))
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        Shortage(LKR):
                      </Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          disabled={false}
                          variant='outlined'
                          size='small'
                          label='Shortage'
                          InputProps={{ inputProps: { min: 0 } }}
                          type='number'
                          fullWidth
                          value={shortage}
                          onChange={e => {
                            if (e.target.value !== '') {
                              setShortage(parseInt(e.target.value.trim()))
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={6}>
                        Document Charges(LKR):
                      </Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        <TextField
                          type='number'
                          autoComplete='delayed'
                          variant='outlined'
                          required
                          fullWidth
                          label=' Document Charges'
                          size='small'
                          value={documentCharges}
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => {
                            if (e.target.value !== '') {
                              setDocumentCharges(
                                parseInt(e.target.value.trim())
                              )
                            }
                          }}
                        />
                      </Grid>
                      <Grid className='noi' item xs={12} sm={2}></Grid>
                      <Grid className='noi' item xs={12} sm={12}>
                        <hr />
                      </Grid>

                      <Grid className='lbl_MI' item xs={12} sm={3}>
                        Date :
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          className='txt_dpayment'
                          variant='outlined'
                          size='small'
                          disabled={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                          placeholder='date'
                          type='number'
                          InputProps={{ inputProps: { min: 1, max: 31 } }}
                          fullWidth
                          value={dates}
                          onChange={e => {
                            if (e.target.value <= 31 || e.target.value < 0) {
                              setDates(e.target.value.trim())
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}></Grid>

                      <Grid className='lbl_MI' item xs={12} sm={3}>
                        Day
                      </Grid>
                      <Grid className='radio_dayDate' item xs={12} sm={4}>
                        <FormControl size='small' className='select'>
                          <InputLabel
                            className='select_label'
                            id='demo-controlled-open-select-label'
                          >
                            Days
                          </InputLabel>
                          <Select
                            value={days}
                            disabled={
                              tablerows.some(ob => ob.paymentWay === 'PayandGo')
                                ? false
                                : true
                            }
                            onChange={e => {
                              setDays(e.target.value)
                            }}
                            native
                            variant='outlined'
                            label='day'
                            inputProps={{
                              name: 'day',
                              id: 'outlined-day-native-simple'
                            }}
                          >
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
                            <option value={0}>Sunday</option>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={5}></Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card className='gami_card'>
                    <Grid className='gami_card-grid' container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <p className='gami_cust'>Gamisarani Customers :</p>
                      </Grid>
                      <Grid item xs={12} sm={6}></Grid>
                      <Grid item xs={12} sm={4}>
                        Gamisarani
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Checkbox
                          checked={gamisarani}
                          onChange={e => {
                            if (gamisarani) {
                              setGamisarani(false)
                              setGamisaraniId('')
                              setGamisaraniInitialAmount(0)
                              setGamisaraniamount(0)
                              setGamisaraniNic('')
                            } else {
                              setGamisarani(true)
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        NIC
                      </Grid>
                      <Grid className='nIc' item xs={12} sm={4}>
                        <TextField
                          className='nic_'
                          variant='outlined'
                          required
                          fullWidth
                          label='NIC'
                          name='nic'
                          autoComplete='nic'
                          size='small'
                          disabled={!gamisarani ? true : false}
                          value={gamisaraniNic}
                          onChange={e => {
                            setGamisaraniNic(e.target.value.trim())
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={1}>
                        <Button
                          fullWidth
                          variant='contained'
                          color='primary'
                          disabled={
                            !gamisarani ||
                              loadingNicsubmit ||
                              gamisaraniNic.length === 0
                              ? true
                              : false
                          }
                          onClick={getCurrentBalanceFromGami}
                        >
                          {loadingNicsubmit ? <Spin size='large' /> : 'Fetch'}
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid className='lbl_MI' item xs={12} sm={4}>
                        Amount
                      </Grid>
                      <Grid className='amouNt' item xs={12} sm={4}>
                        <TextField
                          className='amouNT'
                          variant='outlined'
                          required
                          fullWidth
                          label='Amount'
                          name='amount'
                          autoComplete='amount'
                          size='small'
                          type='number'
                          disabled={
                            !gamisarani || gamisaraniInitialAmount === 0
                              ? true
                              : false
                          }
                          InputProps={{ inputProps: { min: 0 } }}
                          value={gamisaraniamount}
                          onChange={e => {
                            if (
                              gamisaraniInitialAmount >=
                              parseInt(e.target.value.trim())
                            ) {
                              setGamisaraniamount(
                                parseInt(e.target.value.trim())
                              )
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                  </Card>

                  <br />

                  <Grid container spacing={2}>
                    <Grid className='txt_ip_setting' item xs={12} sm={7}>
                      Invoice Status :
                    </Grid>
                    <Grid className='txt_ip_setting' item xs={12} sm={5}></Grid>
                    <Grid className='lbl_MI' item xs={12} sm={4}>
                      Invoice Status
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Radio.Group
                        defaultValue='new'
                        buttonStyle='solid'
                        onChange={e => {
                          setInvoiceStatus(e.target.value)
                        }}
                      >
                        <Radio.Button value='new'>New record</Radio.Button>
                        <Radio.Button value='old'>Old record</Radio.Button>
                      </Radio.Group>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <br />
                    </Grid>
                    <Grid className='lbl_MI' item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid className='txt_ip_setting' item xs={12} sm={12}>
                      <hr />
                    </Grid>
                    <Grid className='txt_ip_setting' item xs={12} sm={7}>
                      Invoice Dates :
                    </Grid>
                    <Grid className='txt_ip_setting' item xs={12} sm={5}></Grid>

                    <Grid className='txt_description' item xs={12} sm={4}>
                      Initial date
                      <br />
                      <div
                        hidden={
                          tablerows.some(ob => ob.paymentWay === 'PayandGo')
                            ? false
                            : true
                        }
                        className='deadline'
                      >
                        Installment deadline
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Space direction='vertical'>
                        <DatePicker
                          onChange={e => {
                            if (e !== null) {
                              setInititialTimestamp(
                                firebase.firestore.Timestamp.fromDate(
                                  e.toDate()
                                )
                              )
                              // setDates(
                              //   new Date(
                              //     firebase.firestore.Timestamp.fromDate(
                              //       e.toDate()
                              //     )?.seconds * 1000
                              //   ).getDate()
                              // );

                              // setDays(
                              //   new Date(
                              //     firebase.firestore.Timestamp.fromDate(
                              //       e.toDate()
                              //     )?.seconds * 1000
                              //   ).getDay()
                              // );
                            } else {
                              setInititialTimestamp(null)
                              // setDates(new Date().getDate());
                              // setDays(new Date().getDay());
                            }
                          }}
                        />

                        <br />
                        <div
                          hidden={
                            tablerows.some(ob => ob.paymentWay === 'PayandGo')
                              ? false
                              : true
                          }
                        >
                          <DatePicker
                            onChange={e => {
                              if (e !== null) {
                                setDeadlineTimestamp(
                                  firebase.firestore.Timestamp.fromDate(
                                    e.toDate()
                                  )
                                )
                              } else {
                                setDeadlineTimestamp(null)
                              }
                            }}
                          />
                        </div>
                      </Space>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid className='xxx' item xs={12} sm={4}>
                      Root Village
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        className='txt_Village'
                        variant='outlined'
                        size='small'
                        label='Root Village'
                        type='text'
                        fullWidth
                        value={rootVillage}
                        onChange={e => {
                          setRootVillage(e.target.value)
                        }}
                      />
                    </Grid>
                    {tablerows.some(
                      ob => ob.paymentWay === 'PayandGo'
                    ) ? null : (
                      <>
                        <Grid item xs={12} sm={4}></Grid>
                        <Grid className='xxx' item xs={12} sm={4}>
                          Full name
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            className='txt_fullname'
                            variant='outlined'
                            size='small'
                            label='Full name'
                            type='text'
                            fullWidth
                            value={fullname}
                            onChange={e => {
                              setFullname(e.target.value)
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}></Grid>
                        <Grid className='xxx' item xs={12} sm={4}>
                          NIC
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            className='txt_fullname'
                            variant='outlined'
                            size='small'
                            label='NIC'
                            type='text'
                            fullWidth
                            value={nic}
                            onChange={e => {
                              setNic(e.target.value)
                            }}
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}>
                      Select a type
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Space direction='vertical'>
                        <FormControl variant='outlined' className='fcontrol'>
                          <Select
                            className='roll_selector'
                            size='small'
                            native
                            onChange={handleChange}
                            value={selectedType}
                          >
                            <option onChange={handleChange} value={'main'}>
                              main
                            </option>
                            <option onChange={handleChange} value={'shop'}>
                              shop
                            </option>
                            {allRoot.map(each => (
                              <option
                                onChange={handleChange}
                                key={each}
                                value={each}
                              >
                                {each}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Space>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* //     */}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    className='btn_addCustomer'
                    disabled={
                      dates === '' ||
                        dates === 0 ||
                        loadingsubmit ||
                        itemDP.length === 0 ||
                        tablerows.length === 0 ||
                        intialTimestamp === null ||
                        rootVillage.length === 0
                        ? true
                        : false
                    }
                    onClick={showConfirm}
                    endIcon={<ArrowForwardIcon />}
                  >
                    {loadingsubmit ? <Spin size='large' /> : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
          <NotificationContainer />
        </Container>
      </div>
    </>
  )
}

export default Make_invoice
