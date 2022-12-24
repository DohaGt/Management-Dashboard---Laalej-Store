import list from 'reducers/administrator/administratorListReducers';
import form from 'reducers/administrator/administratorFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
