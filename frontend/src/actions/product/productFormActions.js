import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PRODUCT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_FORM_FIND_STARTED',
      });

      axios.get(`/product/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PRODUCT_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/product'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_FORM_CREATE_STARTED',
      });

      axios.post('/product', { data: values }).then((res) => {
        dispatch({
          type: 'PRODUCT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Product created' });
        dispatch(push('/admin/product'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PRODUCT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/product/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PRODUCT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Product updated' });
        dispatch(push('/admin/product'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
