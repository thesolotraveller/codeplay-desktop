const { dialog } = require('electron');
const fs = require('fs');
const treeViewLeadPayloadFromFileList = require('../../../src/utils/treeViewLeafPayloadFromFileList');

const openFile = () => {
  const path = dialog.showOpenDialogSync(mainWindow, {
    properties: ['openFile']
  })
  if (path && path[0]) {
    fs.readFile(path[0], 'utf8', (err, data) => {
      if (!err) {
        mainWindow.webContents.send('openFile', data, path[0]);
      }
    });
  }
};

const openFolder = () => {
  const dirPath = dialog.showOpenDialogSync(mainWindow, {
    properties: ['openDirectory']
  })
  if (dirPath && dirPath[0]) {
    fs.readdir(dirPath[0], (err, files) => {
      if (!err) {
        const payload = treeViewLeadPayloadFromFileList(dirPath[0], files);
        mainWindow.webContents.send('openFolder', payload);
      }
    })
  }
};

const saveFile = () => {
  mainWindow.webContents.send('saveFile');
}

module.exports = {
  openFile,
  openFolder,
  saveFile
}