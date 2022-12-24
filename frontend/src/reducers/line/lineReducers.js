import list from 'reducers/line/lineListReducers';
import form from 'reducers/line/lineFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
