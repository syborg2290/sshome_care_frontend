import React, { useState, useEffect } from "react";
import { List, Radio, Row, Col } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// styles
import "./SelectedItem_model.css";

export default function SelectedItem_Model({ itemListProps, closeModel }) {
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    var keepData = [];
    itemListProps.forEach((ele) => {
      keepData.push({
        id:ele.item.id,
        title: ele.item.data.itemName,
        price: ele.item.data.salePrice,
        qty:ele.qty,
      });
    });
    setItemsData(keepData);
  }, [itemListProps]);
  
  const removeItems = (itemId) => {
    itemsData.forEach(ele => { 
      if (ele.id === itemId) {
        itemsData.splice(itemsData.indexOf(x => x.id === itemId), 1)
        if (itemsData.length === 0) {
          closeModel();
        }
      }
    });
  }

  return (
    <List
      className="model_List"
      footer={
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="btn_ModelSelectedItem"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      }
      itemLayout="horizontal"
      dataSource={itemsData}
      renderItem={(item) => (
        <List.Item>
          <span className="icons_List">
            <ShoppingCartOutlined twoToneColor="#52c41a" />
          </span>
          <List.Item.Meta
            title={
              <Row>
                <Col span={8}> {item.title}</Col>
                <Col span={10}>
                  <Radio.Group
                    className="rattdio_btn"
                    defaultValue="a"
                    buttonStyle="solid"
                    size="small"
                  >
                    <Radio.Button className="btn_radio" value="a">
                      Pay and Go
                    </Radio.Button>
                    <Radio.Button className="btn_radio" value="b">
                      Full Payment
                    </Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={6}>
                  <span className="icons_Close">
                    <CloseOutlined onClick={()=>removeItems(item.id)}/>
                  </span>
                </Col>
              </Row>
            }
            description={<span>LKR {item.price}</span>}
          />
        </List.Item>
      )}
    />
  );
}
