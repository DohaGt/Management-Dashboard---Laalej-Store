import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [adminhistory, setAdminhistory] = useState(0);
  const [administrator, setAdministrator] = useState(0);
  const [cashier, setCashier] = useState(0);
  const [client, setClient] = useState(0);
  const [employee, setEmployee] = useState(0);
  const [invoice, setInvoice] = useState(0);
  const [line, setLine] = useState(0);
  const [product, setProduct] = useState(0);
  const [salesperson, setSalesperson] = useState(0);
  const [supplier, setSupplier] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [
      setUsers,
      setAdminhistory,
      setAdministrator,
      setCashier,
      setClient,
      setEmployee,
      setInvoice,
      setLine,
      setProduct,
      setSalesperson,
      setSupplier,
    ];

    const responseUsers = await axios.get(`/users`);
    const responseAdminhistory = await axios.get(`/adminhistory`);
    const responseAdministrator = await axios.get(`/administrator`);
    const responseCashier = await axios.get(`/cashier`);
    const responseClient = await axios.get(`/client`);
    const responseEmployee = await axios.get(`/employee`);
    const responseInvoice = await axios.get(`/invoice`);
    const responseLine = await axios.get(`/line`);
    const responseProduct = await axios.get(`/product`);
    const responseSalesperson = await axios.get(`/salesperson`);
    const responseSupplier = await axios.get(`/supplier`);
    Promise.all([
      responseUsers,
      responseAdminhistory,
      responseAdministrator,
      responseCashier,
      responseClient,
      responseEmployee,
      responseInvoice,
      responseLine,
      responseProduct,
      responseSalesperson,
      responseSupplier,
    ])
      .then((res) => res.map((el) => el.data))
      .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
            <Widget title={'Users'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Users:{' '}
                  <span className={classes.widgetTextCount}>{users}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/adminhistory'} style={{ textDecoration: 'none' }}>
            <Widget title={'Adminhistory'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Adminhistory:{' '}
                  <span className={classes.widgetTextCount}>
                    {adminhistory}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/administrator'} style={{ textDecoration: 'none' }}>
            <Widget title={'Administrator'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Administrator:{' '}
                  <span className={classes.widgetTextCount}>
                    {administrator}
                  </span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/cashier'} style={{ textDecoration: 'none' }}>
            <Widget title={'Cashier'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Cashier:{' '}
                  <span className={classes.widgetTextCount}>{cashier}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/client'} style={{ textDecoration: 'none' }}>
            <Widget title={'Client'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Client:{' '}
                  <span className={classes.widgetTextCount}>{client}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/employee'} style={{ textDecoration: 'none' }}>
            <Widget title={'Employee'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Employee:{' '}
                  <span className={classes.widgetTextCount}>{employee}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/invoice'} style={{ textDecoration: 'none' }}>
            <Widget title={'Invoice'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Invoice:{' '}
                  <span className={classes.widgetTextCount}>{invoice}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/line'} style={{ textDecoration: 'none' }}>
            <Widget title={'Line'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Line: <span className={classes.widgetTextCount}>{line}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/product'} style={{ textDecoration: 'none' }}>
            <Widget title={'Product'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Product:{' '}
                  <span className={classes.widgetTextCount}>{product}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/salesperson'} style={{ textDecoration: 'none' }}>
            <Widget title={'Salesperson'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Salesperson:{' '}
                  <span className={classes.widgetTextCount}>{salesperson}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <Link to={'/admin/supplier'} style={{ textDecoration: 'none' }}>
            <Widget title={'Supplier'}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon color='primary' sx={{ mr: 1 }} />
                <p className={classes.widgetText}>
                  Supplier:{' '}
                  <span className={classes.widgetTextCount}>{supplier}</span>
                </p>
              </div>
            </Widget>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
