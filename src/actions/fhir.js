import * as types from '../constants/action-types';
import {API_FHIR} from '../constants/api-urls';

/**
 * Upload file to FHIR server
 * @param {Object} body
 * @param {Function} dispatch
 */
export async function createFile (body, dispatch = () => {}) {
  const {uuid} = body;

  dispatch({'type': types.CREATE_FILE_REQUEST, uuid});

  try {
    const response = await fetch(API_FHIR, {body, 'method': 'POST'});

    dispatch({'type': types.CREATE_FILE_SUCCESS, uuid, response});
  } catch (error) {
    dispatch({'type': types.CREATE_FILE_FAILURE, uuid, error});
  }
}
