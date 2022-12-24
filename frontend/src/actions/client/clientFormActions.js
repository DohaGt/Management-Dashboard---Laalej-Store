import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CLIENT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CLIENT_FORM_FIND_STARTED',
      });

      axios.get(`/client/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CLIENT_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CLIENT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/client'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CLIENT_FORM_CREATE_STARTED',
      });

      axios.post('/client', { data: values }).then((res) => {
        dispatch({
          type: 'CLIENT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Client created' });
        dispatch(push('/admin/client'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CLIENT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CLIENT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/client/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CLIENT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Client updated' });
        dispatch(push('/admin/client'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CLIENT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
