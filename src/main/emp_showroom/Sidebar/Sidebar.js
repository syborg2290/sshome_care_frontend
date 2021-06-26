import React, {useState, useEffect} from 'react';
import {Drawer, IconButton, List} from '@material-ui/core';

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
  // eslint-disable-next-line
  PermIdentity as PermIdentityIcon,
  EventBusy as EventBusyIcon,
  LocalShipping as LocalShippingIcon,
  // eslint-disable-next-line
  GroupAdd as GroupAddIcon,
  Commute as CommuteIcon,
  // eslint-disable-next-line
  PlaylistAddCheck as PlaylistAddCheckIcon,
  // eslint-disable-next-line
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  // eslint-disable-next-line
  ReceiptOutlined as ReceiptOutlinedIcon,
  // eslint-disable-next-line
  LocalAtm as LocalAtmIcon,
  // eslint-disable-next-line
  Store as StoreIcon,
} from '@material-ui/icons';

import {useTheme} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';
import './Sidebar.css';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../../context/LayoutContext';

const structure = [
  {
    id: 0,
    label: 'Dashboard',
    link: '/showroom/dashboard',
    icon: <DashboardIcon className="icons" />,
  },

  // {
  //   id: 21,
  //   label: 'Make Invoice',
  //   link: '/showroom/ui/MakeInvoiceTable',
  //   icon: <ReceiptOutlinedIcon className="icons" />,
  // },

  {
    id: 1,
    label: 'Items',
    link: '/showroom/ui/ItemTable',
    icon: <TvIcon className="icons" />,
    children: [
      {label: 'Item Table', link: '/showroom/ui/ItemTable'},
      {label: 'Add Item', link: '/showroom/ui/AddItem'},
      {label: 'Stock History', link: '/showroom/ui/StockHistory'},
      {label: 'Manage Stock', link: '/showroom/ui/ManageStock'},
      {label: 'Selling History', link: '/showroom/ui/SellingHistory'},
    ],
  },
  {
    id: 4,
    label: 'Customers',
    link: '/showroom/ui/Customer',
    icon: <GroupIcon className="icons" />,
  },

  {
    id: 11,
    label: 'Invoice',
    link: '/showroom/ui/InvoiceHistory',
    icon: <LibraryIcon className="icons" />,
  },

  {id: 5, type: 'divider'},

  {
    id: 10,
    label: 'Arreas',
    link: '/showroom/ui/arries',
    icon: <MoneyOffIcon className="icons" />,
  },
  {
    id: 6,
    label: 'Repairs',
    link: '/showroom/ui/Repair',
    icon: <BuildIcon className="icons" />,
  },
  {
    id: 13,
    label: 'Gami Sarani',
    link: '/showroom/ui/Gamisarani',
    icon: <LocalShippingIcon className="icons" />,
  },

  {
    id: 27,
    label: 'Gas',
    link: '/showroom/ui/gass',
    icon: <BatteryStdIcon className="icons" />,
  },
  // {
  //   id: 16,
  //   label: 'Loan',
  //   link: '/showroom/ui/loan',
  //   icon: <LocalAtmIcon className="icons" />,
  // },
  // {
  //   id: 17,
  //   label: 'Employees',
  //   link: '/showroom/ui/employee',
  //   icon: <GroupAddIcon className="icons" />,
  // },
  // {
  //   id: 20,
  //   label: 'Salary',
  //   link: '/showroom/ui/salary',
  //   icon: <MonetizationOnOutlinedIcon className="icons" />,
  // },
  // {
  //   id: 18,
  //   label: 'Attendance',
  //   link: '/showroom/ui/attendance',
  //   icon: <PlaylistAddCheckIcon className="icons" />,
  // },
  {
    id: 19,
    label: 'Root',
    link: '/showroom/ui/root',
    icon: <CommuteIcon className="icons" />,
  },
  // {
  //   id: 23,
  //   label: 'Shop',
  //   link: '/showroom/ui/shop',
  //   icon: <StoreIcon className="icons" />,
  // },
  {id: 2, type: 'divider'},
  {
    id: 9,
    label: 'Black list',
    link: '/showroom/ui/BlackList',
    icon: <PersonAddDisabledIcon className="icons" />,
  },
  {
    id: 12,
    label: 'Seized Item',
    link: '/showroom/ui/SeizedItems',
    icon: <EventBusyIcon className="icons" />,
  },
  // {
  //   id: 7,
  //   label: 'Accounts',
  //   link: '/showroom/ui/accounts',
  //   icon: <PermIdentityIcon className="icons" />,
  // },
];

function Sidebar({location}) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var {isSidebarOpened} = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
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
