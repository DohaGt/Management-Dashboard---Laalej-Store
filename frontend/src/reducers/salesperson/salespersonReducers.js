import list from 'reducers/salesperson/salespersonListReducers';
import form from 'reducers/salesperson/salespersonFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
