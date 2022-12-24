import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ADMINISTRATOR_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADMINISTRATOR_FORM_FIND_STARTED',
      });

      axios.get(`/administrator/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ADMINISTRATOR_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINISTRATOR_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/administrator'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADMINISTRATOR_FORM_CREATE_STARTED',
      });

      axios.post('/administrator', { data: values }).then((res) => {
        dispatch({
          type: 'ADMINISTRATOR_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Administrator created' });
        dispatch(push('/admin/administrator'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINISTRATOR_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ADMINISTRATOR_FORM_UPDATE_STARTED',
      });

      await axios.put(`/administrator/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ADMINISTRATOR_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Administrator updated' });
        dispatch(push('/admin/administrator'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADMINISTRATOR_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
