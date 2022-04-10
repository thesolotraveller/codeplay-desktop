const path = require('path');
const fs = require('fs');

const treeViewLeafPayloadFromFileList = (folderPath, files, parentKey = '') => {
  const payload = {};
  payload.name = path.basename(folderPath);
  payload.fetched = true;
  payload.toggled = true;
  payload.key = parentKey;
  payload.children = files.map((name, i) => {
    const filePath = path.join(folderPath, name);
    const stats = fs.statSync(filePath);
    const nodeKey = parentKey ? `${parentKey}.children[${i}]` : `children[${i}]`;
    const fileMetaData = {
      key: nodeKey,
      path: filePath,
      name: name
    };
    // checking if item is file or directory
    if (stats.isDirectory()) fileMetaData.children = [];

    return fileMetaData;
  });

  return payload;
}

module.exports = treeViewLeafPayloadFromFileList;