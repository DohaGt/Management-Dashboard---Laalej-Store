import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SALESPERSON_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESPERSON_FORM_FIND_STARTED',
      });

      axios.get(`/salesperson/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'SALESPERSON_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESPERSON_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/salesperson'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESPERSON_FORM_CREATE_STARTED',
      });

      axios.post('/salesperson', { data: values }).then(res => {
        dispatch({
          type: 'SALESPERSON_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Salesperson created' });
        dispatch(push('/admin/salesperson'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESPERSON_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'SALESPERSON_FORM_UPDATE_STARTED',
      });

      await axios.put(`/salesperson/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'SALESPERSON_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Salesperson updated' });
        dispatch(push('/admin/salesperson'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESPERSON_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
