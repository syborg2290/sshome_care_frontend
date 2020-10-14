import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import "./Make_invoice.css";

function Make_invoice() {
    const location = useLocation();
    // eslint-disable-next-line
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state.detail); // result: 'some_value'
  }, [location]);

    return <div className="make__invoice">
        
  </div>;
}

export default Make_invoice;
