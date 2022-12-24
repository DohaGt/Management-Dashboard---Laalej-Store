import list from 'reducers/cashier/cashierListReducers';
import form from 'reducers/cashier/cashierFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
