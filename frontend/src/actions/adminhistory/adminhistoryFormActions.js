import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ADMINHISTORY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADMINHISTORY_FORM_FIND_STARTED',
      });

      axios.get(`/adminhistory/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'ADMINHISTORY_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINHISTORY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/adminhistory'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADMINHISTORY_FORM_CREATE_STARTED',
      });

      axios.post('/adminhistory', { data: values }).then(res => {
        dispatch({
          type: 'ADMINHISTORY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Adminhistory created' });
        dispatch(push('/admin/adminhistory'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINHISTORY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'ADMINHISTORY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/adminhistory/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'ADMINHISTORY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Adminhistory updated' });
        dispatch(push('/admin/adminhistory'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINHISTORY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
