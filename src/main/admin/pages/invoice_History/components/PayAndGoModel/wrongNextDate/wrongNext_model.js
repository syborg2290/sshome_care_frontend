import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Grid } from '@material-ui/core'
import { DatePicker } from 'antd'
import firebase from 'firebase'
import moment from 'moment'
import db from '../../../../../../../config/firebase.js'

// styles
import './WrongNext_model.css'

export default function Wrong_next () {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line
  const [currentIndx, setCurrentIndx] = useState(0)
  const [invoices, setInvoices] = useState([])
  // eslint-disable-next-line
  const [invoicesAll, setInvoicesAll] = useState([])

  const columns = [
    {
      name: 'InvoiceNo',
      options: {
        filter: true,
        setCellHeaderProps: value => ({
          style: { fontSize: '15px', color: 'black', fontWeight: '600' }
        })
      }
    },
    {
      name: 'Mid',
      options: {
        filter: true,
        setCellHeaderProps: value => ({
          style: { fontSize: '15px', color: 'black', fontWeight: '600' }
        })
      }
    },
    {
      name: 'NIC',
      options: {
        filter: true,
        setCellHeaderProps: value => ({
          style: { fontSize: '15px', color: 'black', fontWeight: '600' }
        })
      }
    },
    {
      name: 'Date',
      options: {
        filter: true,
        setCellHeaderProps: value => ({
          style: { fontSize: '15px', color: 'black', fontWeight: '600' }
        })
      }
    },
    {
      name: 'Next_date',
      options: {
        filter: true,
        setCellHeaderProps: value => ({
          style: { fontSize: '20px', color: 'red', fontWeight: '900' }
        })
      }
    },
    {
      name: 'Edit',
      options: {
        filter: false,
        setCellHeaderProps: value => ({
          style: { fontSize: '15px', color: 'black', fontWeight: '600' }
        })
      }
    }
  ]

  useEffect(() => {
    db.collection('invoice')
      .where('customer_id', '!=', null)
      .get()
      .then(custIn => {
        var rawData = []
        var rawAllData = []
        custIn.docs.forEach(siDoc => {
          if (
            new Date(siDoc.data().nextDate.seconds * 1000).getFullYear() >
            new Date().getFullYear() + 1
          ) {
            rawAllData.push({
              id: siDoc.id,
              data: siDoc.data()
            })
            rawData.push({
              InvoiceNo: siDoc.data().invoice_number,
              Mid: siDoc.data().mid,
              NIC: siDoc.data().nic,
              Date: moment(siDoc.data()?.date?.toDate()).format(
                'dddd, MMMM Do YYYY'
              ),
              Next_date: moment(siDoc.data()?.nextDate?.toDate()).format(
                'dddd, MMMM Do YYYY'
              ),
              Edit: (
                <DatePicker
                  onChange={e => {
                          if (e !== null) {
                        console.log(e.toDate())
                      db.collection('invoice')
                        .doc(siDoc.id)
                        .update({
                          Next_date: firebase.firestore.Timestamp.fromDate(
                            e.toDate()
                          )
                        })
                    } else {
                    }
                  }}
                />
              )
            })
          }
        })
        setInvoices(rawData)
        setInvoicesAll(rawAllData)
      })

    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Grid container spacing={4} className='mains_container'>
        <Grid item xs={12}>
          <MUIDataTable
            title={<span className='title_Span'>Wrong next dates</span>}
            className='installment_table'
            data={invoices}
            columns={columns}
            options={{
              // selectableRows: false,
              selectableRows: 'none',
              customToolbarSelect: () => {},
              filterType: 'textField',
              download: false,
              print: false,
              searchPlaceholder: 'Search using any column names',
              elevation: 4,
              sort: true,
              onRowClick: (rowData, rowMeta) => {
                setCurrentIndx(rowMeta.dataIndex)
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
