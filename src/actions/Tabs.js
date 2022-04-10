/*
  src/actions/Tabs.js
*/
import {
  ADD_TAB,
  REMOVE_FILE_TAB,
  SELECT_SAVED_FILE_TAB
} from '../constants/Tabs';
import nodePath from 'path';

export const addTab = (path, type, saved = true, index = 0) => {
  return {
    type: ADD_TAB,
    payload: {
      type: type,
      path: path,
      saved: saved,
      index: index,
      active: true,
      name: saved ? nodePath.basename(path) : `New File ${index + 1}`
    }
  }
}

export const selectFileTab = (path = '') => {
  return {
    type: SELECT_SAVED_FILE_TAB,
    payload: {
      path: path
    }
  }
}

export const removeFileTab = (path = '') => {
  return {
    type: REMOVE_FILE_TAB,
    payload: {
      path: path
    }
  }
}