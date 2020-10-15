import React from "react";
import { List, Switch } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { Grid } from "@material-ui/core";

// styles
import "./SelectedItem_model.css";

export default function SelectedItem_Model() {
  const data = [
    {
      title: "Gass Coocker",
    },

    {
      title: "Television",
    },
  ];

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <span className="icons_List">
            <ShoppingCartOutlined twoToneColor="#52c41a" />
          </span>
          <List.Item.Meta
            title={
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {item.title}
                </Grid>
                <Grid item xs={4}>
                  <span>
                    <Switch size="small" />
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <span className="icons_Close">
                    <CloseOutlined />
                  </span>
                </Grid>
              </Grid>
            }
            description="1499.00"
          />

          {/* <span className="icons_Close">
            <CloseCircleOutlined twoToneColor="#52c41a" />
          </span> */}
        </List.Item>
      )}
    />
  );
}
