import list from 'reducers/invoice/invoiceListReducers';
import form from 'reducers/invoice/invoiceFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
