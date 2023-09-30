const fs = require('fs');
const path = require('path');

const folderPath = './public/icon'; // 指定文件夹路径
const jsonPath = './public/db.json'; // 指定输出JSON文件路径

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const output = files.map((file) => {
    return { name: path.parse(file).name };
  });

  fs.writeFile(jsonPath, JSON.stringify(output), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('JSON file has been saved!');
  });
});
