import list from 'reducers/adminhistory/adminhistoryListReducers';
import form from 'reducers/adminhistory/adminhistoryFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
