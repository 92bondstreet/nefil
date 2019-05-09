import * as actions from '../actions/fhir';
import * as types from '../constants/action-types';
import fetchMock from 'fetch-mock';
import {API_FHIR} from '../constants/api-urls';

afterEach(() => {
  fetchMock.reset();
  fetchMock.restore();
});
/**
 * Get the action types from the mock calls
 * @param  {Array} calls
 * @return {Array}
 */
const getActionsType = calls => {
  return calls.map(call => {
    return call[0].type;
  });
};

describe('fhir actions', () => {
  it('should dispatch actions to get the CREATE_FILE success', async () => {
    const dispatch = jest.fn();
    const expectedActionsType = [
      types.CREATE_FILE_REQUEST,
      types.CREATE_FILE_SUCCESS
    ];

    fetchMock.post(API_FHIR, 200);

    await actions.createFile({}, dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(getActionsType(dispatch.mock.calls)).toEqual(expectedActionsType);
  });

  it('should dispatch actions to get the CREATE_FILE failure if the status is not ok', async () => {
    const dispatch = jest.fn();
    const expectedActionsType = [
      types.CREATE_FILE_REQUEST,
      types.CREATE_FILE_FAILURE
    ];

    fetchMock.post(API_FHIR, 500);

    await actions.createFile({}, dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(getActionsType(dispatch.mock.calls)).toEqual(expectedActionsType);
  });

  it('should dispatch actions to get the CREATE_FILE failure', async () => {
    const dispatch = jest.fn();
    const expectedActionsType = [
      types.CREATE_FILE_REQUEST,
      types.CREATE_FILE_FAILURE
    ];

    fetchMock.post(API_FHIR, {'throws': new Error('Failed to fetch')});

    await actions.createFile({}, dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(getActionsType(dispatch.mock.calls)).toEqual(expectedActionsType);
  });

  it('should post the given file even without dispatch method', async () => {
    fetchMock.post(API_FHIR, 200);

    await actions.createFile({});

    expect(fetchMock.called(API_FHIR)).toBe(true);
  });
});
