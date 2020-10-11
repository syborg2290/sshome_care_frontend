import React, { useState } from "react";
import { Form, Radio, Input, Layout, Button, Spin } from "antd";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "antd/dist/antd.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// styles
import "../components/Edit_model.css";

const { SeverApi } = require("../../../../../../config/settings.js");

const { Content } = Layout;
const { TextArea } = Input;

function EditModel({
  item_idProp,
  imageUrlProp,
  itemNameProp,
  brandProp,
  modelNoProp,
  chassisNoProp,
  colorProp,
  qtyProp,
  cashpriceProp,
  salepriceProp,
  noOfInstallmentsProp,
  amountPerInstallmentProp,
  downPaymentProp,
  guaranteePeriodProp,
  discountProp,
  descriptionProp,
  cInvoiceNoProp,
  GCardNoProp,
  guaranteeProp,
}) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [itemName, setItemName] = useState(itemNameProp);
  const [brand, setBrand] = useState(brandProp);
  const [modelNo, setModelNo] = useState(modelNoProp);
  const [chassisNo, setChassisNo] = useState(chassisNoProp);
  const [color, setColor] = useState(colorProp);
  const [qty, setQty] = useState(qtyProp);
  const [cashPrice, setCashPrice] = useState(cashpriceProp);
  const [salePrice, setSalePrice] = useState(salepriceProp);
  const [noOfInstallments, setNoOfInstallments] = useState(
    noOfInstallmentsProp
  );
  const [amountPerInstallment, setAmountPerInstallment] = useState(
    amountPerInstallmentProp
  );
  const [downPayment, setDownPayment] = useState(downPaymentProp);
  const [guaranteePeriod, setGuaranteePeriod] = useState(guaranteePeriodProp);
  const [discount, setDiscount] = useState(discountProp);
  const [description, setDescription] = useState(descriptionProp);
  const [cInvoiceNo, setCInvoiceNo] = useState(cInvoiceNoProp);
  const [GCardNo, setGCardNo] = useState(GCardNoProp);
  const [guarantee, setGuarantee] = useState({
    value: guaranteeProp,
  });

  const radioOnChange = (e) => {
    setGuarantee({
      value: e.target.value,
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    if (cashPrice < 0) {
      NotificationManager.info(
        "Check again the amount of cash price",
        "Remember validations"
      );
    } else {
      if (salePrice < 0) {
        NotificationManager.info(
          "Check again the amount of sale price",
          "Remember validations"
        );
      } else {
        if (noOfInstallments < 0) {
          NotificationManager.info(
            "Check again the value of installments value",
            "Remember validations"
          );
        } else {
          if (amountPerInstallment < 0) {
            NotificationManager.info(
              "Check again the amount per installment",
              "Remember validations"
            );
          } else {
            if (downPayment < 0) {
              NotificationManager.info(
                "Check again the amount of down payment",
                "Remember validations"
              );
            } else {
              if (guaranteePeriod < 0) {
                NotificationManager.info(
                  "Check again the value of gurantee period",
                  "Remember validations"
                );
              } else {
                if (discount < 0) {
                  NotificationManager.info(
                    "Check again the amount of discount",
                    "Remember validations"
                  );
                } else {
                  //Rest of code here
                  setLoadingSubmit(true);
                  let imageDownloadUrl = imageUrlProp;
                  if (imageFile !== null) {
                    const formData = new FormData();
                    const options = {
                      maxSizeMB: 1,
                      maxWidthOrHeight: 1920,
                      useWebWorker: true,
                    };
                    const compressedFile = await imageCompression(
                      imageFile,
                      options
                    );
                    formData.append("image", compressedFile);
                    const configFile = {
                      headers: {
                        "content-type": "multipart/form-data",
                      },
                    };

                    await axios
                      .post(
                        SeverApi + "imageUpload/uploadImage",
                        formData,
                        configFile
                      )
                      .then((response) => {
                        imageDownloadUrl = response.data.publicUrl;
                      });
                  }

                  let variable = {
                    item_id: item_idProp,
                    itemName: itemName,
                    brand: brand,
                    modelNo: modelNo,
                    chassisNo: chassisNo,
                    color: color,
                    qty: qty,
                    cashPrice: cashPrice,
                    salePrice: salePrice,
                    noOfInstallments: noOfInstallments,
                    amountPerInstallment: amountPerInstallment,
                    downPayment: downPayment,
                    guaranteePeriod: guaranteePeriod,
                    discount: discount,
                    description: description,
                    cInvoiceNo: cInvoiceNo,
                    GCardNo: GCardNo,
                    guarantee: guarantee,
                    itemDownImageUrl: imageDownloadUrl,
                  };
                  await axios
                    .post(SeverApi + "item/updateItem", variable)
                    .then((response) => {
                      if (response.status === 200) {
                        setLoadingSubmit(false);
                        NotificationManager.success("Item updated!", "Done");
                        setInterval(() => window.location.reload(), 1000);
                      } else {
                        setLoadingSubmit(false);
                        NotificationManager.warning(
                          "Failed to update the item!",
                          "Please try again"
                        );
                      }
                    });
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div>
      <Content>
        <Form className="form">
          <Form.Item label="* Item Name">
            <Input
              allowClear
              placeholder="xx Device"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Brand ">
            <Input
              allowClear
              placeholder="xx Brand "
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Model no ">
            <Input
              allowClear
              placeholder="xx 0091"
              value={modelNo}
              onChange={(e) => {
                setModelNo(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Chassis no ">
            <Input
              allowClear
              placeholder="xx 95091"
              value={chassisNo}
              onChange={(e) => {
                setChassisNo(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Color ">
            <Input
              allowClear
              placeholder="xx pink"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Qty ">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="120 "
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Cash price (LKR)">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder=" 15000.00"
              value={cashPrice}
              onChange={(e) => {
                setCashPrice(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Sale Price (LKR)">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="17000.00"
              value={salePrice}
              onChange={(e) => {
                setSalePrice(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* No Of Installments  ">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="20"
              value={noOfInstallments}
              onChange={(e) => {
                setNoOfInstallments(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Amount Per Installment  (LKR)">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="3000.00"
              value={amountPerInstallment}
              onChange={(e) => {
                setAmountPerInstallment(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Guarantee Months / Years  ">
            <Radio.Group onChange={radioOnChange} value={guarantee.value}>
              <Radio value={"Years"}>Years</Radio>
              <Radio value={"Months"}>Months</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="* Guarantee Period">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="6"
              value={guaranteePeriod}
              onChange={(e) => {
                setGuaranteePeriod(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="* Down Payment (LKR)">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="5000.00"
              value={downPayment}
              onChange={(e) => {
                setDownPayment(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Discount (LKR)">
            <Input
              type="number"
              min={1}
              allowClear
              placeholder="500.00"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Description ">
            <TextArea
              placeholder="About Item"
              autoSize={{ minRows: 3, maxRows: 5 }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Company Invoice No ">
            <Input
              allowClear
              placeholder="In-6101"
              value={cInvoiceNo}
              onChange={(e) => {
                setCInvoiceNo(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Guarantee Card No  ">
            <Input
              allowClear
              placeholder="00101"
              value={GCardNo}
              onChange={(e) => {
                setGCardNo(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Upload Image  ">
            <input
              type="file"
              accept="image/*"
              name=""
              onChange={onImageChange}
              className="image"
              id="item_image"
              hidden
            />
            <img
              alt="Item upload"
              onClick={() => {
                document.getElementById("item_image").click();
              }}
              src={
                imageUrl == null
                  ? imageUrlProp !== null
                    ? imageUrlProp
                    : require("../../../../../../assets/images_upload.png")
                  : imageUrl
              }
              className="image"
            />
          </Form.Item>

          <Button
            disabled={
              !loadingSubmit &&
              (itemName ||
                cashPrice ||
                salePrice ||
                downPayment ||
                qty ||
                guaranteePeriod !== "")
                ? false
                : true
            }
            className="btn"
            type="primary"
            onClick={updateItem}
          >
            {loadingSubmit ? (
              <Spin spinning={loadingSubmit} size="large" />
            ) : (
              "Update"
            )}
          </Button>
        </Form>

        <NotificationContainer />
      </Content>
    </div>
  );
}

export default EditModel;
