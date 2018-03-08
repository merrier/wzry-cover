import * as HOME_ACTION_TYPES from '../constants/actionTypes/home';

export const selection = (state = [], action) => {
  switch (action.type) {
    case HOME_ACTION_TYPES.SUCCESS_HOME_SELECTION_LIST:
      return action.response ? action.response.data : state;
    default:
      return state;
  }
};

export const table = (state = [], action) => {
    switch (action.type) {
        case HOME_ACTION_TYPES.SUCCESS_HOME_TABLE_SOURCE:
            return action.response ? action.response.data : state;
        default:
            return state;
    }
};