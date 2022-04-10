try {
  require("electron-reloader")(module);
} catch (_) {}

const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;
const openAboutWindow = require("about-window").default;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let mainMenuTemplate;
mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      { label: "New Window", command: "application:new-window" },
      { label: "New File", command: "application:new-file" },
      {
        label: "New Microservice",
        submenu: [
          { label: "Pub/Sub Service", command: "application:create-conpro" },
          { label: "E-Commerce Service", command: "application:create-ecomm" },
          {
            label: "Google Book Service",
            command: "application:create-bookapi",
          },
          { label: "Custom GRPC Service", command: "application:create-grpc" },
        ],
      },
      { label: "Open…", command: "application:open" },
      {
        label: "Add Project Folder…",
        command: "application:add-project-folder",
      },
      {
        label: "Reopen Project",
        submenu: [
          {
            label: "Clear Project History",
            command: "application:clear-project-history",
          },
          { type: "separator" },
        ],
      },
      { label: "Reopen Last Item", command: "pane:reopen-closed-item" },
      { type: "separator" },
      { label: "Save", command: "core:save" },
      { label: "Save As…", command: "core:save-as" },
      { label: "Save All", command: "window:save-all" },
      { type: "separator" },
      { label: "Close Tab", command: "core:close" },
      { label: "Close Pane", command: "pane:close" },
      { label: "Close Window", command: "window:close" },
    ],
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        role: "undo",
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        role: "cut",
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        role: "copy",
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        role: "paste",
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        role: "selectall",
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close();
                }
              });
            }
            focusedWindow.reload();
          }
        },
      },
      {
        label: "Toggle Full Screen",
        accelerator: (function () {
          if (process.platform === "darwin") {
            return "Ctrl+Command+F";
          } else {
            return "F11";
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: "Toggle Developer Tools",
        accelerator: (function () {
          if (process.platform === "darwin") {
            return "Alt+Command+I";
          } else {
            return "Ctrl+Shift+I";
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
      },
    ],
  },
  {
    label: "Window",
    role: "window",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
      {
        type: "separator",
      },
      {
        label: "Reopen Window",
        accelerator: "CmdOrCtrl+Shift+T",
        enabled: false,
        key: "reopenMenuItem",
        click: function () {
          app.emit("activate");
        },
      },
    ],
  },
  {
    label: "Help",
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: function () {
          electron.shell.openExternal("https://www.shareabookindia.com/");
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  const name = "Codeplay"; // electron.app.name
  mainMenuTemplate.unshift({
    label: name,
    submenu: [
      {
        label: "About This App",
        click: () =>
          openAboutWindow({
            package_json_dir: __dirname,
            open_devtools: process.env.NODE_ENV !== "production",
          }),
      },
      {
        type: "separator",
      },
      {
        label: `Hide ${name}`,
        accelerator: "Command+H",
        role: "hide",
      },
      {
        label: "Hide Others",
        accelerator: "Command+Alt+H",
        role: "hideothers",
      },
      {
        label: "Show All",
        role: "unhide",
      },
      {
        type: "separator",
      },
      {
        label: `Quit ${name}`,
        accelerator: "Command+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  });
}
