/*
  src/reducers/tabs.js
*/
import {
  ADD_TAB,
  REMOVE_FILE_TAB,
  SELECT_SAVED_FILE_TAB
} from '../constants/Tabs';

const initialState = {
  // tabsData: [{
  //   type: 'WELCOME',
  //   path: '',
  //   name: 'Welcome',
  //   saved: false,
  //   index: 0,
  //   active: true
  // }]
  tabsData: []
  /**
   * tab object will have objects with data payload of type
   * {
   *    type: 'FILE'
   *    path: 'some path',
   *    name: '',
   *    saved: '',
   *    index: 0           // will be 0 in case of saved files
   *    active: true
   * }
   */
}

export default (state = initialState, action) => {
  const {type, payload} = action;
  let oldTabState;

  switch (type) {

    case ADD_TAB:
      oldTabState = [...state.tabsData];
      oldTabState.forEach(tab => tab.active = false);
      return {
        ...state,
        tabsData: [...oldTabState, payload]
      }

    case SELECT_SAVED_FILE_TAB:
      oldTabState = [...state.tabsData];
      oldTabState.forEach(tab => tab.active = false);
      for (let i in oldTabState) {
        if (oldTabState[i].path === payload.path) {
          oldTabState[i].active = true;
          break;
        }
      }
      return {
        ...state,
        tabsData: [...oldTabState]
      }

    case REMOVE_FILE_TAB:
      oldTabState = [...state.tabsData].filter(tab => tab.path !== payload.path);
      let numTabs = oldTabState.length;
      if (numTabs >= 1) {
        oldTabState[numTabs-1].active = true;
      }
      return {
        ...state,
        tabsData: [...oldTabState]
      }

    default:
      return state
  }
}