import * as types from '../constants/action-types';
import {API_FHIR} from '../constants/api-urls';

/**
 * Wrapper for fetch GET
 * @param  {String}  url
 * @return {Response | Object}
 */
export async function getApi (url) {
  let response;

  try {
    response = await fetch(url);

    if (! response.ok) {
      return response;
    }

    return await response.json();
  } catch (error) {
    return error;
  }
}

/**
 * Upload file to FHIR server
 * @param {Object} body
 * @param {Function} dispatch
 */
export async function createFile (body, dispatch = () => {}) {
  const url = `${API_FHIR}/Binary`;
  const {uuid} = body;

  dispatch({'type': types.CREATE_FILE_REQUEST, uuid});

  try {
    const response = await fetch(url, {body, 'method': 'POST'});

    if (! response.ok) {
      return dispatch({'type': types.CREATE_FILE_FAILURE, uuid, response});
    }

    return dispatch({'type': types.CREATE_FILE_SUCCESS, uuid, response});
  } catch (error) {
    return dispatch({'type': types.CREATE_FILE_FAILURE, uuid, error});
  }
}

/**
 * Upload files to FHIR server
 * @param {Array} files
 * @param {Function} dispatch
 */
export async function createFiles (files, dispatch = () => {}) {
  return await Promise.all(files.map(file => createFile(file, dispatch)));
}

/**
 * Get history for spectific resource
 * @param {Function} dispatch
 */
export async function readHistory (dispatch = () => {}) {
  const response = await Promise.all([
    getApi(`${API_FHIR}/Binary/_history?_pretty=true&_format=json`),
    getApi(`${API_FHIR}/_history?_pretty=true&_format=json`)
  ]);

  return dispatch({'type': types.READ_HISTORY_SUCCESS, response});
}
