/*
  src/reducers/files.js
*/
import {
  UPDATE_FILE_EDIT_STATUS,
  SET_SELECTED_FILE_DATA,
  REMOVE_FILE,
  UPDATE_FILE_DATA,
} from '../constants/DevPane';
import nodePath from 'path';

const initialState = {
  selectedFile: {
    path: '',
    language: 'text',
    name: '',
    contents: '',
    isBeingEdited: false
  },
  files: []
  /**
   * files will have objects
   * {
   *    path: 'some path',
   *    name: '',
   *    content: '',
   *    language: '',
   *    saved: '',
   *    index: 0             // will be 0 in case of saved files
   * }
   */
}

export default (state = initialState, action) => {
  const {type, payload = {}} = action;

  switch (type) {

    case SET_SELECTED_FILE_DATA:
      const fileMetaData = {
        path: payload.path,
        contents: payload.contents,
        language: payload.language,
        saved: true,
        index: 0,
        name: payload.path ? nodePath.basename(payload.path) : payload.name,
        isBeingEdited: false,
        isLoadingInEditor: payload.isLoadingInEditor
      }

      let filesList = [...state.files];
      // updating the files as needed
      filesList.forEach(file => {
        if (payload.path && payload.path === file.path) {
          file.isLoadingInEditor = payload.isLoadingInEditor;
        }
      })

      return {
        ...state,
        selectedFile : {
          path: payload.path,
          contents: payload.contents,
          language: payload.language
        },
        files: payload.isOpenedFirstTime ? [...state.files, fileMetaData] : [...filesList]
      }

    case REMOVE_FILE:
      let updatedFilesList = [...state.files].filter(file => file.path !== payload.path);
      return {
        ...state,
        files: [...updatedFilesList]
      }

    case UPDATE_FILE_DATA: 
      let filesWithUpdatedData = [...state.files];
      let selectedFile = {}
      filesWithUpdatedData.forEach(file => {
        if (file.path === payload.path) {
          selectedFile = file;
          file.contents = payload.contents;
          if (file.isLoadingInEditor) {
            file.isLoadingInEditor = false;
          } else if (!file.isLoadingInEditor && !file.isBeingEdited) {
            file.isBeingEdited = true;
          }
        }
      })

      return {
        ...state,
        files: [...filesWithUpdatedData],
        selectedFile : {
          path: selectedFile.path,
          contents: selectedFile.contents,
          language: selectedFile.language
        },
      }

    case UPDATE_FILE_EDIT_STATUS:
      let filesWithUpdatedData_statusUpdate = [...state.files];
      filesWithUpdatedData_statusUpdate.forEach(file => {
        if (file.path === payload.path) {
          file.isBeingEdited = payload.status;
        }
      })

      return {
        ...state,
        files: [...filesWithUpdatedData_statusUpdate]
      }

    default:
      return state
  }
}