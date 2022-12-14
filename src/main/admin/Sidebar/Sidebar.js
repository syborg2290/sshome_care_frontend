import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";

import {
  Tv as TvIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  MoneyOff as MoneyOffIcon,
  Build as BuildIcon,
  PersonAddDisabled as PersonAddDisabledIcon,
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
  BatteryStd as BatteryStdIcon,
  PermIdentity as PermIdentityIcon,
  EventBusy as EventBusyIcon,
  LocalShipping as LocalShippingIcon,
  GroupAdd as GroupAddIcon,
  Commute as CommuteIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  LocalAtm as LocalAtmIcon,
  Store as StoreIcon
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
  toggleSidebar
} from "../../../context/LayoutContext";

const structure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: <DashboardIcon className="icons" />
  },

  {
    id: 21,
    label: "Make Invoice",
    link: "/admin/ui/MakeInvoiceTable",
    icon: <ReceiptOutlinedIcon className="icons" />
  },

  {
    id: 1,
    label: "Items",
    link: "/admin/ui/ItemTable",
    icon: <TvIcon className="icons" />,
    children: [
      { label: "Item Table", link: "/admin/ui/ItemTable" },
      { label: "Add Item", link: "/admin/ui/AddItem" },
      { label: "Stock History", link: "/admin/ui/StockHistory" },
      { label: "Manage Stock", link: "/admin/ui/ManageStock" },
      { label: "Selling History", link: "/admin/ui/SellingHistory" }
    ]
  },
  {
    id: 4,
    label: "Customers",
    link: "/admin/ui/Customer",
    icon: <GroupIcon className="icons" />
  },

  {
    id: 11,
    label: "Invoice",
    link: "/admin/ui/InvoiceHistory",
    icon: <LibraryIcon className="icons" />
  },

  { id: 5, type: "divider" },

  {
    id: 10,
    label: "Arreas",
    link: "/admin/ui/arries",
    icon: <MoneyOffIcon className="icons" />
  },
  {
    id: 6,
    label: "Repairs",
    link: "/admin/ui/Repair",
    icon: <BuildIcon className="icons" />
  },
  {
    id: 13,
    label: "Gami Sarani",
    link: "/admin/ui/Gamisarani",
    icon: <LocalShippingIcon className="icons" />
  },

  {
    id: 27,
    label: "Gas",
    link: "/admin/ui/gass",
    icon: <BatteryStdIcon className="icons" />
  },
  {
    id: 16,
    label: "Loan",
    link: "/admin/ui/loan",
    icon: <LocalAtmIcon className="icons" />
  },
  {
    id: 17,
    label: "Employees",
    link: "/admin/ui/employee",
    icon: <GroupAddIcon className="icons" />
  },
  {
    id: 20,
    label: "Salary",
    link: "/admin/ui/salary",
    icon: <MonetizationOnOutlinedIcon className="icons" />
  },
  {
    id: 18,
    label: "Attendance",
    link: "/admin/ui/attendance",
    icon: <PlaylistAddCheckIcon className="icons" />
  },
  {
    id: 19,
    label: "Root",
    link: "/admin/ui/root",
    icon: <CommuteIcon className="icons" />
  },
  {
    id: 23,
    label: "Shop",
    link: "/admin/ui/shop",
    icon: <StoreIcon className="icons" />
  },
  { id: 2, type: "divider" },
  {
    id: 9,
    label: "Black list",
    link: "/admin/ui/BlackList",
    icon: <PersonAddDisabledIcon className="icons" />
  },
  {
    id: 12,
    label: "Seized Item",
    link: "/admin/ui/SeizedItems",
    icon: <EventBusyIcon className="icons" />
  },
  {
    id: 7,
    label: "Accounts",
    link: "/admin/ui/accounts",
    icon: <PermIdentityIcon className="icons" />
  },
  {
    id: 50,
    label: "Moved",
    children: [
      { label: "Gas", link: "/admin/pages/moved_gas" },
      { label: "Other items", link: "/admin/pages/moved_invoice" }
    ]
  }
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
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
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className="toolbar" />
      <div className="mobileBackButton">
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List className="sidebarList">
        {structure.map(link =>
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        )}
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
