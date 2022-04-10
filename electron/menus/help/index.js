// import functions here
// const f = require('./functions');

const helpMenu = {
  label: 'Help',
  submenu:[
    {
      role: 'reload'
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'CmdOrCtrl+I',
      click(item, window){
        window.toggleDevTools();
      }
    }
  ]
};

module.exports = helpMenu;