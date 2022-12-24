import list from 'reducers/employee/employeeListReducers';
import form from 'reducers/employee/employeeFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
