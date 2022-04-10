const electron = require("electron");
const { ipcMain } = electron;
const fs = require("fs");
const treeViewLeadPayloadFromFileList = require("../../src/utils/treeViewLeafPayloadFromFileList");

ipcMain.on("openDirectory", (event, key, dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (!err) {
      const payload = treeViewLeadPayloadFromFileList(dirPath, files, key);
      event.reply("openDirectory", key, payload);
    }
  });
});

ipcMain.on("openFile", (event, filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (!err) {
      event.reply("openFile", data, filePath);
    }
  });
});

ipcMain.on("saveFile", (event, filePath, contents) => {
  if (filePath && contents) {
    fs.writeFile(filePath, contents, "utf-8", (err) => {
      if (err) console.log("Codeplay: Error saving file\n", err);
      mainWindow.webContents.send("saveFileStatus", filePath, false);
    });
  }
});
