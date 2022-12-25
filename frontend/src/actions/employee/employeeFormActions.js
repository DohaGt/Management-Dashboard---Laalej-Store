import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'EMPLOYEE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'EMPLOYEE_FORM_FIND_STARTED',
      });

      axios.get(`/employee/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'EMPLOYEE_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYEE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/employee'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'EMPLOYEE_FORM_CREATE_STARTED',
      });

      axios.post('/employee', { data: values }).then(res => {
        dispatch({
          type: 'EMPLOYEE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Employee created' });
        dispatch(push('/admin/employee'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYEE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'EMPLOYEE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/employee/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'EMPLOYEE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Employee updated' });
        dispatch(push('/admin/employee'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EMPLOYEE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
