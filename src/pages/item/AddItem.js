import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, message, Radio, Upload, Input, Layout, Button } from "antd";

import "antd/dist/antd.css";

// styles
import "./Add_Item/additem.css";

const { Content } = Layout;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

function AddItem() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [cashPrice, setCashPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [noOfInstallments, setNoOfInstallments] = useState("");
  const [amountPerInstallment, setAmountPerInstallment] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [guaranteePeriod, setGuaranteePeriod] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [cInvoiceNo, setCInvoiceNo] = useState("");
  const [GCardNo, setGCardNo] = useState("");

  const [guarantee, setGuarantee] = useState({
    value: "Years",
  });

  const radioOnChange = (e) => {
    setGuarantee({
      value: e.target.value,
    });
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Content style={{ margin: "24px 16px 0", backgroundColor: "#FFFFFF" }}>
        <div className="site-layout-background">
          <h2>Add New Item</h2>
          <hr className="line"></hr>
          <div className="xx">
            <Form className="form">
              <Form.Item label="Item Name">
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
                    console.log("ffff");
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
              <Form.Item label="Qty ">
                <Input
                  type="number"
                  allowClear
                  placeholder="120 "
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Cash price (LKR)">
                <Input
                  type="number"
                  allowClear
                  placeholder=" 15000.00"
                  value={cashPrice}
                  onChange={(e) => {
                    setCashPrice(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Sale Price (LKR)">
                <Input
                  type="number"
                  allowClear
                  placeholder="17000.00"
                  value={salePrice}
                  onChange={(e) => {
                    setSalePrice(e.target.value);
                    console.log("ffff");
                  }}
                />
              </Form.Item>
              <Form.Item label="No Of Installments  ">
                <Input
                  type="number"
                  allowClear
                  placeholder="20"
                  value={noOfInstallments}
                  onChange={(e) => {
                    setNoOfInstallments(e.target.value);
                    console.log("ffff");
                  }}
                />
              </Form.Item>
              <Form.Item label=" Amount Per Installment  (LKR)">
                <Input
                  type="number"
                  allowClear
                  placeholder="3000.00"
                  value={amountPerInstallment}
                  onChange={(e) => {
                    setAmountPerInstallment(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Guarantee Months / Years  ">
                <Radio.Group onChange={radioOnChange} value={guarantee.value}>
                  <Radio value={"Years"}>Years</Radio>
                  <Radio value={"Months"}>Months</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Down Payment (LKR)">
                <Input
                  type="number"
                  allowClear
                  placeholder="5000.00"
                  value={downPayment}
                  onChange={(e) => {
                    setDownPayment(e.target.value);
                    
                  }}
                />
              </Form.Item>
              <Form.Item label="Guarantee Period">
                <Input
                  type="number"
                  allowClear
                  placeholder="6"
                  value={guaranteePeriod}
                  onChange={(e) => {
                    setGuaranteePeriod(e.target.value);
                    
                  }}
                />
              </Form.Item>
              <Form.Item label="Discount (LKR)">
                <Input
                  type="number"
                  allowClear
                  placeholder="500.00"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                    console.log("ffff");
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
                    console.log("ffff");
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
                    console.log("ffff");
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
                    console.log("ffff");
                  }}
                />
              </Form.Item>
              <Form.Item label="Upload Image  ">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" className="image" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Button className="btn" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default AddItem;
