import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Container,
  Typography,
  Button
} from '@material-ui/core'
import { Spin,Input,Layout,Form } from 'antd'
import firebase from 'firebase'

import db from '../../../../../../config/firebase.js'

// styles
import './Add_Model.css'

const {Content} = Layout;
const {TextArea} = Input;

export default function Add_Model ({ closeModel }) {
  const [itemName, setItemName] = useState('')
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [cashPrice, setCashPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [serialNo, setSerailNo] = useState('')
  const [modelNo, setModelNo] = useState('')
  const [loadingSubmit, setLoading] = useState(false)

  let history = useHistory()

  useEffect(() => {
    window.addEventListener('offline', function (e) {
      history.push('/connection_lost')
    })
  })

  const addSeized = async () => {
    setLoading(true)
    db.collection('seized')
      .add({
        status: '',
        itemName: itemName,
        brand: brand,
        color: color,
        price: cashPrice,
        description: description,
        serialNo: serialNo,
        modelNo: modelNo,
        addedDate: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(_ => {
        setLoading(false)
        closeModel()
        window.location.reload()
      })
  }

  return (
    <Container component='main' className='conctainefr_main'>
      <Typography className='titleffs' variant='h5' gutterBottom>
        Add Seized Item
      </Typography>
      <Grid item xs={12} sm={12}>
        <hr className='titl_hr' />
      </Grid>
      <>
        <div>
          <Content>
            <Form className='form'>
              <Form.Item label='* Item Name'>
                <Input
                  allowClear
                  placeholder='xx Device'
                  value={itemName}
                  onChange={e => {
                    setItemName(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item label='Brand '>
                <Input
                  allowClear
                  placeholder='xx Brand '
                  value={brand}
                  onChange={e => {
                    setBrand(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label='Color '>
                <Input
                  allowClear
                  placeholder='xx pink'
                  value={color}
                  onChange={e => {
                    setColor(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label='* price (LKR)'>
                <Input
                  type='number'
                  min={0}
                  allowClear
                  placeholder=' 15000.00'
                  value={cashPrice}
                  onChange={e => {
                    if (e.target.value !== '') {
                      setCashPrice(e.target.value)
                    }
                  }}
                />
              </Form.Item>

              <Form.Item label='Description '>
                <TextArea
                  placeholder='About Item'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label='Model no '>
                <Input
                  allowClear
                  placeholder='Model No'
                  value={modelNo}
                  onChange={e => {
                    setModelNo(e.target.value)
                  }}
                />
              </Form.Item>

              <Form.Item label='Serial no '>
                <Input
                  allowClear
                  placeholder='Serial No'
                  value={serialNo}
                  onChange={e => {
                    setSerailNo(e.target.value)
                  }}
                />
              </Form.Item>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <hr />
                </Grid>
              </Grid>
              <Grid container spacing={2}></Grid>

              <Button
                className='btn'
                type='primary'
                onClick={addSeized}
              >
                {loadingSubmit ? (
                  <Spin spinning={loadingSubmit} size='default' />
                ) : (
                  'Add'
                )}
              </Button>
            </Form>
          </Content>
        </div>
      </>
    </Container>
  )
}
