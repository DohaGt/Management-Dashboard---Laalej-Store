import list from 'reducers/product/productListReducers';
import form from 'reducers/product/productFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
