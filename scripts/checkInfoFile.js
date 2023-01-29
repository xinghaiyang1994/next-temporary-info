const path = require('path');
const fsExtra = require('fs-extra');

const targetPath = path.join(__dirname, '../info.txt');

// 判断文件是否存在
const isTargetExist = fsExtra.existsSync(targetPath);

// 不存在则生成
if (!isTargetExist) {
  const contentString = JSON.stringify([]);
  fsExtra.writeFile(targetPath, Buffer.from(contentString));
}
