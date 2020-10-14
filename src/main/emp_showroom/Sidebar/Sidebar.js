import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Tv as TvIcon,
  Group as GroupIcon,
  MoneyOff as MoneyOffIcon,
  Build as BuildIcon,
  PersonAddDisabled as PersonAddDisabledIcon,
  PermIdentity as PermIdentityIcon,
  Settings as SettingsIcon,
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";
import "./Sidebar.css";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../context/LayoutContext";

const structure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <HomeIcon className="icons" />,
  },

  {
    id: 11,
    label: "Invoice",
    link: "",
    icon: <LibraryIcon className="icons" />,
  },
  {
    id: 1,
    label: "Items",
    link: "/app/ui",
    icon: <TvIcon className="icons" />,
    children: [
      { label: "Item Table", link: "/app/ui/item/itemTable" },
      { label: "Add Item", link: "/app/ui/item/add_item" },
    ],
  },

  {
    id: 4,
    label: "Customers",
    link: "/app/ui",
    icon: <GroupIcon className="icons" />,
    children: [
      { label: "Add Customer", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "View Customer", link: "/app/uioo/maps" },
    ],
  },

  { id: 5, type: "divider" },
  {
    id: 10,
    label: "Arreas",
    link: "",
    icon: <MoneyOffIcon className="icons" />,
  },
  { id: 6, label: "Repairs", link: "", icon: <BuildIcon className="icons" /> },
  {
    id: 9,
    label: "Black list",
    link: "",
    icon: <PersonAddDisabledIcon className="icons" />,
  },
  { id: 2, type: "divider" },

  {
    id: 7,
    label: "Accounts",
    link: "/app/ui/accounts",
    icon: <PermIdentityIcon className="icons" />,
  },
  {
    id: 8,
    label: "Settings",
    link: "/app/ui/settings",
    icon: <SettingsIcon className="icons" />,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className="toolbar" />
      <div className="mobileBackButton">
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className="sidebarList">
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
