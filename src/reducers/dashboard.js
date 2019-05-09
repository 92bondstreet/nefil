import * as types from '../constants/action-types';
import * as dashboard from '../constants/dashboard';

/**
 * Reducer for the Dashboard
 *
 * @param  {Object} state current state
 * @param  {Object} action action to perform
 * @return {Object} nextState next state
 */
export default function DashboardReducer (state, action) {
  switch (action.type) {
  case types.DROP_FILE:
    return {
      ...state,
      'files': action.files.concat(state.files)
    };
  case types.CREATE_FILE_REQUEST:
    return {
      ...state,
      'files': state.files.map(file => {
        if (file.uuid === action.uuid) {
          file.status = dashboard.STATUS_WIP;
        }
        return file;
      })
    };
  case types.CREATE_FILE_SUCCESS:
    return {
      ...state,
      'files': state.files.map(file => {
        if (file.uuid === action.uuid) {
          file.status = dashboard.STATUS_UPLOADED;
        }
        return file;
      })
    };
  case types.CREATE_FILE_FAILURE:
    return {
      ...state,
      'files': state.files.map(file => {
        if (file.uuid === action.uuid) {
          file.status = dashboard.STATUS_FAILED;
        }
        return file;
      })
    };
  default:
    return state;
  }
}
