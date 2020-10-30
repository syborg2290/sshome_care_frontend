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
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
  EventBusy as EventBusyIcon,
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
    link: "/admin/dashboard",
    icon: <HomeIcon className="icons" />,
  },

  {
    id: 11,
    label: "Invoice",
    link: "/admin/ui/invoiceHistory",
    icon: <LibraryIcon className="icons" />,
  },
  {
    id: 1,
    label: "Items",
    link: "/admin/ui/item/itemTable",
    icon: <TvIcon className="icons" />,
    children: [
      { label: "Item Table", link: "/admin/ui/item/itemTable" },
      { label: "Add Item", link: "/admin/ui/item/add_item" },
    ],
  },

  {
    id: 4,
    label: "Customers",
    link: "/admin/ui/customers/customerTable",
    icon: <GroupIcon className="icons" />,
  },

  { id: 5, type: "divider" },
  {
    id: 10,
    label: "Arreas",
    link: "/admin/ui/arreas",
    icon: <MoneyOffIcon className="icons" />,
  },
  {
    id: 6,
    label: "Repairs",
    link: "/admin/ui/repairs",
    icon: <BuildIcon className="icons" />,
  },
  {
    id: 9,
    label: "Black list",
    link: "/admin/ui/blackList",
    icon: <PersonAddDisabledIcon className="icons" />,
  },
  { id: 2, type: "divider" },

  {
    id: 12,
    label: "Seized Item",
    link: "/admin/ui/seized",
    icon: <EventBusyIcon className="icons" />,
  },

  {
    id: 7,
    label: "Accounts",
    link: "/admin/ui/accounts",
    icon: <PermIdentityIcon className="icons" />,
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
