import * as actions from '../actions/fhir';
import * as types from '../constants/action-types';
import fetchMock from 'fetch-mock';
import {API_FHIR} from '../constants/api-urls';

const API_FHIR_MATCHER = `begin:${API_FHIR}`;

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

    fetchMock.post(API_FHIR_MATCHER, 200);

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

    fetchMock.post(API_FHIR_MATCHER, 500);

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

    fetchMock.post(API_FHIR_MATCHER, {'throws': new Error('Failed to fetch')});

    await actions.createFile({}, dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(getActionsType(dispatch.mock.calls)).toEqual(expectedActionsType);
  });

  it('should post the given file even without dispatch method', async () => {
    fetchMock.post(API_FHIR_MATCHER, 200);

    await actions.createFile({});

    expect(fetchMock.called(API_FHIR_MATCHER)).toBe(true);
  });

  it('should get the json response for a given url', async () => {
    const url = 'http://example.com';
    const expectedResponse = {'ack': true};

    fetchMock.get(url, expectedResponse);

    const response = await actions.getApi(url);

    expect(response).toEqual(expectedResponse);
  });

  it('should return error if response is not a json for a given url', async () => {
    const url = 'http://example.com';
    const expectedResponse = 'not-a-json';

    fetchMock.get(url, expectedResponse);

    const response = await actions.getApi(url);

    expect(response.toString()).toMatch(/invalid json response/);
  });

  it('should even return response for a given url', async () => {
    const url = 'http://example.com';

    fetchMock.get(url, 500);

    const response = await actions.getApi(url);

    expect(response).toEqual(response);
  });

  it('should post the given files even without dispatch method', async () => {
    fetchMock.post(API_FHIR_MATCHER, 200);

    await actions.createFiles([{}, {}]);

    expect(fetchMock.called(API_FHIR_MATCHER)).toBe(true);
  });

  it('should dispatch actions to get the READ_HISTORY_SUCCESS success', async () => {
    const dispatch = jest.fn();
    const expectedActionsType = [
      types.READ_HISTORY_SUCCESS
    ];

    fetchMock.get(API_FHIR_MATCHER, 200);
    await actions.readHistory(dispatch);
    expect(dispatch.mock.calls.length).toBe(1);
    expect(getActionsType(dispatch.mock.calls)).toEqual(expectedActionsType);
  });

  it('should get the history even without dispatch method', async () => {
    fetchMock.get(API_FHIR_MATCHER, 200);

    await actions.readHistory();

    expect(fetchMock.called(API_FHIR_MATCHER)).toBe(true);
  });
});
