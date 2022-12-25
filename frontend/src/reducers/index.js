
import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import adminhistory from 'reducers/adminhistory/adminhistoryReducers';

import administrator from 'reducers/administrator/administratorReducers';

import cashier from 'reducers/cashier/cashierReducers';

import client from 'reducers/client/clientReducers';

import employee from 'reducers/employee/employeeReducers';

import invoice from 'reducers/invoice/invoiceReducers';

import line from 'reducers/line/lineReducers';

import product from 'reducers/product/productReducers';

import salesperson from 'reducers/salesperson/salespersonReducers';

import supplier from 'reducers/supplier/supplierReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    adminhistory,

    administrator,

    cashier,

    client,

    employee,

    invoice,

    line,

    product,

    salesperson,

    supplier,

  });

