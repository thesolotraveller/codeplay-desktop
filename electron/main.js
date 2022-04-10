try {
	require('electron-reloader')(module);
} catch (_) {}

const electron = require('electron');
const {app, BrowserWindow, Menu } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const appMenu = require('./menus/index');

require('./eventHandlers');

global.app = electron.app;
global.mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(appMenu);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
