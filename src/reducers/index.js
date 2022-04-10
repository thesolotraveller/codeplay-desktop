import { combineReducers } from "redux";

import files from './files';
import editorConfig from './editorconfig';
import fileexplorer from './fileexplorer';
import tabs from './tabs';

const rootReducer = combineReducers({
  editorConfig,
  fileexplorer,
  files,
  tabs
});

export default rootReducer;
