import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CASHIER_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CASHIER_FORM_FIND_STARTED',
      });

      axios.get(`/cashier/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'CASHIER_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CASHIER_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/cashier'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CASHIER_FORM_CREATE_STARTED',
      });

      axios.post('/cashier', { data: values }).then(res => {
        dispatch({
          type: 'CASHIER_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Cashier created' });
        dispatch(push('/admin/cashier'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CASHIER_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'CASHIER_FORM_UPDATE_STARTED',
      });

      await axios.put(`/cashier/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'CASHIER_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Cashier updated' });
        dispatch(push('/admin/cashier'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CASHIER_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
