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

const lastUpdated = '2019-05-09T21:09:03.020+00:00';
const responseBinary = {
  'resourceType': 'Bundle',
  'id': 'f3e09a0d-a765-4089-8de3-3020a9e5c36d',
  'meta': {
    'lastUpdated': '2019-05-09T21:09:03.020+00:00'
  },
  'type': 'history',
  'total': 1234,
  'link': [
    {
      'relation': 'self',
      'url':
        'http://hapi.fhir.org/baseDstu3/Binary/_history?_format=json&_pretty=true'
    },
    {
      'relation': 'next',
      'url':
        'http://hapi.fhir.org/baseDstu3?_getpages=f3e09a0d-a765-4089-8de3-3020a9e5c36d&_getpagesoffset=20&_count=20&_format=json&_pretty=true&_bundletype=history'
    }
  ],
  'entry': [
    {
      'fullUrl': 'http://hapi.fhir.org/baseDstu3/Binary/1921753',
      'resource': {
        'resourceType': 'Binary',
        'id': '1921753',
        'meta': {
          lastUpdated,
          'versionId': '1'
        },
        'contentType': 'application/pdf'
      },
      'request': {
        'method': 'POST',
        'url': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1'
      }
    }
  ]
};

const responseHistory = {
  'resourceType': 'Bundle',
  'id': 'f3e09a0d-a765-4089-8de3-3020a9e5c36d',
  'meta': {
    'lastUpdated': '2019-05-09T21:09:03.020+00:00'
  },
  'type': 'history',
  'total': 56789,
  'link': [
    {
      'relation': 'self',
      'url':
        'http://hapi.fhir.org/baseDstu3/Binary/_history?_format=json&_pretty=true'
    },
    {
      'relation': 'next',
      'url':
        'http://hapi.fhir.org/baseDstu3?_getpages=f3e09a0d-a765-4089-8de3-3020a9e5c36d&_getpagesoffset=20&_count=20&_format=json&_pretty=true&_bundletype=history'
    }
  ],
  'entry': [
    {
      'fullUrl': 'http://hapi.fhir.org/baseDstu3/Binary/1921753',
      'resource': {
        'resourceType': 'Binary',
        'id': '1921753',
        'meta': {
          lastUpdated,
          'versionId': '1'
        },
        'contentType': 'application/pdf'
      },
      'request': {
        'method': 'POST',
        'url': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1'
      }
    }
  ]
};

const response = new Response(
  {},
  {
    'headers': new Headers({
      'location': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1'
    })
  }
);

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
        response,
        'type': types.CREATE_FILE_SUCCESS,
        'uuid': '1db8a08e-64ac-45df-b6f8-21e144c29aa6'
      })
    ).toMatchObject({
      'files': [
        {
          'name': 'file-1.png',
          'location': 'http://hapi.fhir.org/baseDstu3/Binary/1921753/_history/1',
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
    ).toMatchObject({
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

  it('should set analytics if action is READ_HISTORY_SUCCESS', () => {
    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_SUCCESS,
          'response': [responseBinary, responseHistory]
        }
      )
    ).toEqual({
      'analytics': {
        'last-binary': new Date(lastUpdated),
        'ping': 'up',
        'total-all': 56789,
        'total-binary': 1234
      }
    });
  });

  it('should set analytics for "binary" only with READ_HISTORY_SUCCESS', () => {
    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_SUCCESS,
          'response': [responseBinary]
        }
      )
    ).toEqual({
      'analytics': {
        'last-binary': new Date(lastUpdated),
        'ping': 'up',
        'total-binary': 1234
      }
    });
  });

  it('should set analytics for "binary" even without latest bundle with READ_HISTORY_SUCCESS', () => {
    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_SUCCESS,
          'response': [{'total': 1234}]
        }
      )
    ).toEqual({
      'analytics': {
        'ping': 'up',
        'total-binary': 1234
      }
    });
  });

  it('should set analytics for "all" only with READ_HISTORY_SUCCESS', () => {
    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_SUCCESS,
          'response': [{}, responseHistory]
        }
      )
    ).toEqual({
      'analytics': {
        'ping': 'up',
        'total-all': 56789
      }
    });
  });

  it('should set analytics with down ping for down requests', () => {
    const resBinary = new Response();
    const resHistory = new Response();

    resBinary.ok = false;
    resHistory.ok = false;

    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_SUCCESS,
          'response': [resBinary, resHistory]
        }
      )
    ).toEqual({
      'analytics': {
        'ping': 'down'
      }
    });
  });

  it('should set analytics with down ping for READ_HISTORY_FAILURE', () => {
    expect(
      dashboard(
        {},
        {
          'type': types.READ_HISTORY_FAILURE
        }
      )
    ).toEqual({
      'analytics': {
        'ping': 'down'
      }
    });
  });
});
