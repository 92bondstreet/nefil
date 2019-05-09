import dashboard from './dashboard';
import * as types from '../constants/action-types';

const state = {
  'files': [
    {
      'name': 'file-1.png',
      'status': 'ready',
      'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
    },
    {
      'name': 'file-2.png',
      'status': 'uploaded',
      'uuid': 'f3fef468-827f-498d-88bb-e36b04c7ea87'
    }
  ]
};

describe('dashboard reducer', () => {
  it('should return the current state if action is whatever', () => {
    expect(dashboard(state, 'whatever')).toEqual(state);
  });

  it('should add dropped files if action is DROP_FILE', () => {
    expect(
      dashboard(state, {
        'type': types.DROP_FILE,
        'files': [
          {
            'name': 'file-3.png',
            'status': 'ready',
            'uuid': 'd2246816-c428-46f8-b340-c5b8e6f7ac7e'
          }
        ]
      })
    ).toEqual({
      'files': [
        {
          'name': 'file-3.png',
          'status': 'ready',
          'uuid': 'd2246816-c428-46f8-b340-c5b8e6f7ac7e'
        },
        {
          'name': 'file-1.png',
          'status': 'ready',
          'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
        },
        {
          'name': 'file-2.png',
          'status': 'uploaded',
          'uuid': 'f3fef468-827f-498d-88bb-e36b04c7ea87'
        }
      ]
    });
  });

  it('should set in-progress status if action is CREATE_FILE_REQUEST', () => {
    expect(
      dashboard(state, {
        'type': types.CREATE_FILE_REQUEST,
        'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
      })
    ).toEqual({
      'files': [
        {
          'name': 'file-1.png',
          'status': 'in-progress',
          'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
        },
        {
          'name': 'file-2.png',
          'status': 'uploaded',
          'uuid': 'f3fef468-827f-498d-88bb-e36b04c7ea87'
        }
      ]
    });
  });

  it('should set uploaded status if action is CREATE_FILE_SUCCESS', () => {
    expect(
      dashboard(state, {
        'type': types.CREATE_FILE_SUCCESS,
        'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
      })
    ).toEqual({
      'files': [
        {
          'name': 'file-1.png',
          'status': 'uploaded',
          'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
        },
        {
          'name': 'file-2.png',
          'status': 'uploaded',
          'uuid': 'f3fef468-827f-498d-88bb-e36b04c7ea87'
        }
      ]
    });
  });

  it('should set failed status if action is CREATE_FILE_FAILURE', () => {
    expect(
      dashboard(state, {
        'type': types.CREATE_FILE_FAILURE,
        'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
      })
    ).toEqual({
      'files': [
        {
          'name': 'file-1.png',
          'status': 'failed',
          'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
        },
        {
          'name': 'file-2.png',
          'status': 'uploaded',
          'uuid': 'f3fef468-827f-498d-88bb-e36b04c7ea87'
        }
      ]
    });
  });
});
