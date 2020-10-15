import React from "react";
import { List } from "antd";
import { FolderOpenFilled, CloseCircleOutlined } from "@ant-design/icons";

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
            <FolderOpenFilled twoToneColor="#52c41a" />
          </span>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <span className="icons_Close">
            <CloseCircleOutlined twoToneColor="#52c41a" />
          </span>
        </List.Item>
      )}
    />
  );
}
