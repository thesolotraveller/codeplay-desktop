import {
  SET_SELECTED_FILE_DATA,
  SET_FOLDER_TREE_VIEW_JSON,
  REMOVE_FILE,
  UPDATE_FILE_DATA,
  UPDATE_FILE_EDIT_STATUS
} from '../constants/DevPane';

export const setSelectedFileData = (path, contents, language, isOpenedFirstTime, isLoadingInEditor = false) => {
  return {
    type: SET_SELECTED_FILE_DATA,
    payload: {
      path,
      contents,
      language,
      isOpenedFirstTime,
      isLoadingInEditor
    }
  }
}

export const setFolderViewJson = (key, folderViewJson) => {
  return {
    type: SET_FOLDER_TREE_VIEW_JSON,
    payload: {
      key,
      value: folderViewJson
    }
  }
}

export const clearFileData = (path) => {
  return {
    type: REMOVE_FILE,
    payload: {
      path
    }
  }
}

export const updateFileContentInEditor = (path, contents) => {
  return {
    type: UPDATE_FILE_DATA,
    payload: {
      path,
      contents
    }
  }
}

export const updateFileEditStatus = (path, status) => {
  return {
    type: UPDATE_FILE_EDIT_STATUS,
    payload: {
      path,
      status
    }
  }
}