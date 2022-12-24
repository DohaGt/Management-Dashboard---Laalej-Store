import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import AdminhistoryFormPage from 'pages/CRUD/Adminhistory/form/AdminhistoryFormPage';
import AdminhistoryTablePage from 'pages/CRUD/Adminhistory/table/AdminhistoryTablePage';

import AdministratorFormPage from 'pages/CRUD/Administrator/form/AdministratorFormPage';
import AdministratorTablePage from 'pages/CRUD/Administrator/table/AdministratorTablePage';

import CashierFormPage from 'pages/CRUD/Cashier/form/CashierFormPage';
import CashierTablePage from 'pages/CRUD/Cashier/table/CashierTablePage';

import ClientFormPage from 'pages/CRUD/Client/form/ClientFormPage';
import ClientTablePage from 'pages/CRUD/Client/table/ClientTablePage';

import EmployeeFormPage from 'pages/CRUD/Employee/form/EmployeeFormPage';
import EmployeeTablePage from 'pages/CRUD/Employee/table/EmployeeTablePage';

import InvoiceFormPage from 'pages/CRUD/Invoice/form/InvoiceFormPage';
import InvoiceTablePage from 'pages/CRUD/Invoice/table/InvoiceTablePage';

import LineFormPage from 'pages/CRUD/Line/form/LineFormPage';
import LineTablePage from 'pages/CRUD/Line/table/LineTablePage';

import ProductFormPage from 'pages/CRUD/Product/form/ProductFormPage';
import ProductTablePage from 'pages/CRUD/Product/table/ProductTablePage';

import SalespersonFormPage from 'pages/CRUD/Salesperson/form/SalespersonFormPage';
import SalespersonTablePage from 'pages/CRUD/Salesperson/table/SalespersonTablePage';

import SupplierFormPage from 'pages/CRUD/Supplier/form/SupplierFormPage';
import SupplierTablePage from 'pages/CRUD/Supplier/table/SupplierTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />

          <Route
            path={'/admin/adminhistory'}
            exact
            component={AdminhistoryTablePage}
          />
          <Route
            path={'/admin/adminhistory/new'}
            exact
            component={AdminhistoryFormPage}
          />
          <Route
            path={'/admin/adminhistory/:id/edit'}
            exact
            component={AdminhistoryFormPage}
          />

          <Route
            path={'/admin/administrator'}
            exact
            component={AdministratorTablePage}
          />
          <Route
            path={'/admin/administrator/new'}
            exact
            component={AdministratorFormPage}
          />
          <Route
            path={'/admin/administrator/:id/edit'}
            exact
            component={AdministratorFormPage}
          />

          <Route path={'/admin/cashier'} exact component={CashierTablePage} />
          <Route
            path={'/admin/cashier/new'}
            exact
            component={CashierFormPage}
          />
          <Route
            path={'/admin/cashier/:id/edit'}
            exact
            component={CashierFormPage}
          />

          <Route path={'/admin/client'} exact component={ClientTablePage} />
          <Route path={'/admin/client/new'} exact component={ClientFormPage} />
          <Route
            path={'/admin/client/:id/edit'}
            exact
            component={ClientFormPage}
          />

          <Route path={'/admin/employee'} exact component={EmployeeTablePage} />
          <Route
            path={'/admin/employee/new'}
            exact
            component={EmployeeFormPage}
          />
          <Route
            path={'/admin/employee/:id/edit'}
            exact
            component={EmployeeFormPage}
          />

          <Route path={'/admin/invoice'} exact component={InvoiceTablePage} />
          <Route
            path={'/admin/invoice/new'}
            exact
            component={InvoiceFormPage}
          />
          <Route
            path={'/admin/invoice/:id/edit'}
            exact
            component={InvoiceFormPage}
          />

          <Route path={'/admin/line'} exact component={LineTablePage} />
          <Route path={'/admin/line/new'} exact component={LineFormPage} />
          <Route path={'/admin/line/:id/edit'} exact component={LineFormPage} />

          <Route path={'/admin/product'} exact component={ProductTablePage} />
          <Route
            path={'/admin/product/new'}
            exact
            component={ProductFormPage}
          />
          <Route
            path={'/admin/product/:id/edit'}
            exact
            component={ProductFormPage}
          />

          <Route
            path={'/admin/salesperson'}
            exact
            component={SalespersonTablePage}
          />
          <Route
            path={'/admin/salesperson/new'}
            exact
            component={SalespersonFormPage}
          />
          <Route
            path={'/admin/salesperson/:id/edit'}
            exact
            component={SalespersonFormPage}
          />

          <Route path={'/admin/supplier'} exact component={SupplierTablePage} />
          <Route
            path={'/admin/supplier/new'}
            exact
            component={SupplierFormPage}
          />
          <Route
            path={'/admin/supplier/:id/edit'}
            exact
            component={SupplierFormPage}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/'}
              target={'_blank'}
              className={classes.link}
            >
              Flatlogic
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/about'}
              target={'_blank'}
              className={classes.link}
            >
              About Us
            </Link>
            <Link
              color={'primary'}
              href={'https://flatlogic.com/blog'}
              target={'_blank'}
              className={classes.link}
            >
              Blog
            </Link>
          </div>
          <div>
            <Link href={'https://www.facebook.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='facebook'>
                <FacebookIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://twitter.com/flatlogic'} target={'_blank'}>
              <IconButton aria-label='twitter'>
                <TwitterIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
            <Link href={'https://github.com/flatlogic'} target={'_blank'}>
              <IconButton
                aria-label='github'
                style={{ padding: '12px 0 12px 12px' }}
              >
                <GithubIcon style={{ color: '#6E6E6E99' }} />
              </IconButton>
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
