import list from 'reducers/client/clientListReducers';
import form from 'reducers/client/clientFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
