const { Octokit } = require("@octokit/rest");
const fs = require("fs");

// 创建Octokit实例
const octokit = new Octokit();

// 定义仓库信息
const owner = "walkxcode";
const repo = "dashboard-icons";
const path = "svg";

// 获取文件列表
octokit.repos
.getContent({
  owner,
  repo,
  path,
})
.then((response) => {
  // 过滤出文件名
  const fileNames = response.data
    .filter((item) => item.type === "file")
    .map((item) => item.name.split('.')[0]); // 去掉文件扩展名

  // 将文件名存储到JSON文件中
  const json = JSON.stringify(
    fileNames.map((name) => ({ name })),
    null,
    2
  );
  fs.writeFileSync("./public/db.json", json);
  console.log("File names saved to db.json");
})
.catch((error) => {
  console.log("Error:", error.message);
});