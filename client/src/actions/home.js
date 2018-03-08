import { CALL_API } from '../middleware/api';
import * as HOME_ACTION_TYPES from '../constants/actionTypes/home';

export const loadHomeSelectionList = () => (dispatch, getState) => dispatch({
  [CALL_API]: {
    types: [HOME_ACTION_TYPES.REQUEST_HOME_SELECTION_LIST, HOME_ACTION_TYPES.SUCCESS_HOME_SELECTION_LIST, HOME_ACTION_TYPES.FAILURE_HOME_SELECTION_LIST],
    endpoint: `/api/home/selection`,
    fetchOpts: {
      method: 'get'
    }
  }
});

export const loadHomeTableSource = () => (dispatch, getState) => dispatch({
    [CALL_API]: {
        types: [HOME_ACTION_TYPES.REQUEST_HOME_TABLE_SOURCE, HOME_ACTION_TYPES.SUCCESS_HOME_TABLE_SOURCE, HOME_ACTION_TYPES.FAILURE_HOME_TABLE_SOURCE],
        endpoint: `/api/home/table`,
        fetchOpts: {
            method: 'get'
        }
    }
});