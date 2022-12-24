import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'INVOICE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'INVOICE_FORM_FIND_STARTED',
      });

      axios.get(`/invoice/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'INVOICE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INVOICE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/invoice'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'INVOICE_FORM_CREATE_STARTED',
      });

      axios.post('/invoice', { data: values }).then((res) => {
        dispatch({
          type: 'INVOICE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Invoice created' });
        dispatch(push('/admin/invoice'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INVOICE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'INVOICE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/invoice/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'INVOICE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Invoice updated' });
        dispatch(push('/admin/invoice'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INVOICE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
