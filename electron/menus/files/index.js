// import functions here
const f = require('./functions');

const fileMenu = {
  label: 'File',
  submenu: [
    { label: 'Save File',
      accelerator: 'CmdOrCtrl+S',
      click () {
        f.saveFile();
      }
    },
    {
      label: 'Open File',
      accelerator: 'CmdOrCtrl+O',
      click () {
        f.openFile();
      }
    },
    {
      label: 'Open Folder',
      click () {
        f.openFolder()
      }
    }
  ]
};

module.exports = fileMenu;