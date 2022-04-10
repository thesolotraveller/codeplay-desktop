/*
  src/reducers/files.js
*/
import * as _ from "lodash";
import { SET_FOLDER_TREE_VIEW_JSON } from "../constants/DevPane";

const initialState = {
  structure: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FOLDER_TREE_VIEW_JSON:
      const { key, value } = payload,
        safeKey = key ? `structure.${key}` : "structure",
        updatedState = _.set(state, safeKey, value);

      return {
        ...state,
        updatedState,
      };
    default:
      return state;
  }
};
