import * as types from '../constants/action-types';
import * as dashboard from '../constants/dashboard';

/**
 * Parse history queries to generate the analytics
 * @param  {[Array]} response
 * @return {Object}
 */
const parseHistory = response => {
  const down = response.filter(
    item => item instanceof window.Response && item.ok === false
  );

  // it means that 2 history requests are down
  if (down.length === 2) {
    return {'ping': 'down'};
  }

  const analytics = {'ping': 'up'};
  const [binary, all] = response;

  if (binary && binary.total) {
    const [latest] = binary.entry || [];

    analytics['total-binary'] = binary.total;

    if (latest && latest.resource) {
      analytics['last-binary'] = new Date(latest.resource.meta.lastUpdated);
    }
  }

  if (all && all.total) {
    analytics['total-all'] = all.total;
  }

  return analytics;
};

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
  case types.CREATE_FILE_SUCCESS: {
    const location = action.response.headers.get('location');

    return {
      ...state,
      'files': state.files.map(file => {
        file.date = new Date();
        file.location = location;

        if (file.uuid === action.uuid) {
          file.status = dashboard.STATUS_UPLOADED;
        }
        return file;
      })
    };
  }
  case types.CREATE_FILE_FAILURE:
    return {
      ...state,
      'files': state.files.map(file => {
        file.date = new Date();

        if (file.uuid === action.uuid) {
          file.status = dashboard.STATUS_FAILED;
        }
        return file;
      })
    };
  case types.READ_HISTORY_SUCCESS: {
    const {response} = action;

    return {
      ...state,
      'analytics': {
        ...parseHistory(response)
      }
    };
  }
  case types.READ_HISTORY_FAILURE: {
    const ping = 'down';

    return {
      ...state,
      'analytics': {
        ...{ping}
      }
    };
  }
  default:
    return state;
  }
}
