import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { Button } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://lh3.googleusercontent.com/proxy/EBcooO5h-i_PKkQMWKUTRbYn3PJRwF9heV8ijQYnEHT8fqwClFwF68vI4qSKbBKrmYV3r_4XTHOvtbB-nFEppNe4TF3MIBdSkIRZBIbWZYJM"
        alt=""
      />

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Salcscces</span>
          <span className="header__optionLineTwo">& Rentee</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Our</span>
          <span className="header__optionLineTwo">Services</span>
        </div>

        <div className="header__option">
          {/* <span className="header__optionLineOne">login</span> */}
          <Button className="header__optionLineOnecc" type="link">
            login
          </Button>
          <Button className="header__optionLineTwocc">& sign-up</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
