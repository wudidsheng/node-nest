const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./file"));
// 文件上传
var upload2 = multer({
  dest: __dirname + "/temp",
});
app.post("/upload", upload2.single("file"), function (req, res) {
  const [name, index, extra] = req.file.originalname.split(".");
  const oldPath = __dirname + "/temp/" + req.file.filename;
  const newPath = __dirname + "/temp/" + name + "/" + index;
  // 创建对应目录
  if (!fs.existsSync(__dirname + "/temp/" + name)) {
    fs.mkdirSync(__dirname + "/temp/" + name);
  }
  // 文件更名+文件移动
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      res.send(err).status(408);
    }
  });
  res.send("上传成功");
});
// 合并分块
app.post("/merge", (req, res) => {
  const { name } = req.body;
  const [file, extra] = name.split(".");
  // 读取
  const chunkDir=fs.readdirSync(__dirname + "/temp/" + file);
  // 合并
  chunkDir.sort((a,b)=>a-b).map((item)=>{
    fs.appendFileSync(__dirname + "/file/" + file+'.'+extra,fs.readFileSync(__dirname + "/temp/" + file+'/'+item));
    fs.unlinkSync(__dirname + "/temp/" + file+'/'+item)
  })
  fs.rmdirSync(__dirname + "/temp/" + file)
 res.send('http:127.0.0.1:3000/'+file+'.'+extra)
});
app.listen(3000, () => {
  console.log("127.0.0.1:3000");
});
