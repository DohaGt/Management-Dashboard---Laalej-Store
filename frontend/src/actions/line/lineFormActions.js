import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'LINE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'LINE_FORM_FIND_STARTED',
      });

      axios.get(`/line/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'LINE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LINE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/line'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'LINE_FORM_CREATE_STARTED',
      });

      axios.post('/line', { data: values }).then((res) => {
        dispatch({
          type: 'LINE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Line created' });
        dispatch(push('/admin/line'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LINE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'LINE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/line/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'LINE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Line updated' });
        dispatch(push('/admin/line'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LINE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
