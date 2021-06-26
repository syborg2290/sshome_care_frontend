import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, Layout } from 'antd';
import Grid from '@material-ui/core/Grid';

import firebase from 'firebase';
import db from '../../../../../../config/firebase.js';

import 'antd/dist/antd.css';

// styles
import './SellModel.css';

const { Content } = Layout;



export default function SellModel({ invoice_no, model_no,serialNo }) {
    const [item, setItem] = useState({});
    const [cashPrice, setCashPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [noOfInstallments, setNoOfInstallments] = useState(0);
    const [amountPerInstallment, setAmountPerInstallment] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(0);

    useEffect(() => {
        getValuesFromDb();
        // eslint-disable-next-line
    }, []);

    const getValuesFromDb = async () => {
        db.collection('invoice')
            .where('invoice_number', '==', invoice_no)
            .get()
            .then((reVal) => {
                let index = reVal.docs[0]
                    .data()
                    .items.findIndex((ob) => ob.modelNo[0] === model_no);

                db.collection('invoice')
                    .doc(reVal.docs[0].data().items[index].item_id)
                    .get()
                    .then((reItem) => {
                        setItem(reItem.data())
                        setCashPrice(reItem.data().cashPrice);
                        setSalePrice(reItem.data().salePrice);
                        setNoOfInstallments(reItem.data().noOfInstallments);
                        setAmountPerInstallment(reItem.data().amountPerInstallment);
                        setDownPayment(reItem.data().downPayment);
                    });
            });
    };

    const updateItem = async () => {
        setLoadingSubmit(true);
        let modelNosList = [];
        let serialNosList = [];
        
        modelNosList.push(item.modelNoExtra);
        serialNosList.push(serialNo);
        
        let variable = {
            itemName: item.itemName,
            brand:item.brand,
            modelNo: modelNosList,
            modelNoExtra: item.modelNoExtra,
            serialNo: serialNosList,
            chassisNo: item.chassisNo,
            color: item.color,
            stock_type: 'main',
            purchasedPrice: item.purchasedPrice,
            qty: serialNosList.length,
            cashPrice: cashPrice === '' ? item.cashPrice : Math.round(cashPrice),
            salePrice: salePrice === '' ? item.salePrice : Math.round(salePrice),
            noOfInstallments: noOfInstallments === '' ? item.noOfInstallments : Math.round(noOfInstallments),
            amountPerInstallment:
                amountPerInstallment === '' ? item.amountPerInstallment : Math.round(amountPerInstallment),
            downPayment: downPayment === '' ? item.downPayment : Math.round(downPayment),
            guaranteePeriod: item.guaranteePeriod,
            discount: item.discount,
            description: item.description,
            cInvoiceNo: item.cInvoiceNo,
            GCardNo: item.GCardNo,
            guarantee: item.guarantee,
            seized: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection('item').add(variable).then((_) => {
            window.location.reload();
        });
    };
    


    return (
        <>
            <div>
                <Content>
                    <Form className="form">
                        <Form.Item label="* Cash price (LKR)">
                            <Input
                                type="number"
                                min={0}
                                allowClear
                                placeholder=" 15000.00"
                                value={cashPrice}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        setCashPrice(e.target.value);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="* Sale Price (LKR)">
                            <Input
                                type="number"
                                min={0}
                                allowClear
                                placeholder="17000.00"
                                value={salePrice}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        setSalePrice(e.target.value);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="* No Of Installments  ">
                            <Input
                                type="number"
                                min={0}
                                allowClear
                                placeholder="20"
                                value={noOfInstallments}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        setNoOfInstallments(e.target.value);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="* Amount Per Installment  (LKR)">
                            <Input
                                type="number"
                                min={0}
                                allowClear
                                placeholder="3000.00"
                                value={amountPerInstallment}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        setAmountPerInstallment(e.target.value);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="* Down Payment (LKR)">
                            <Input
                                type="number"
                                min={0}
                                allowClear
                                placeholder="5000.00"
                                value={downPayment}
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        setDownPayment(e.target.value);
                                    }
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
                            // disabled={!loadingSubmit ? false : true}
                            className="btn"
                            type="primary"
                            onClick={updateItem}
                            disabled={loadingSubmit}
                        >
                            {loadingSubmit ? (
                                <Spin spinning={loadingSubmit} size="default" />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Form>
                </Content>
            </div>
        </>
    );
}
