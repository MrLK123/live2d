var path = require("path");
var fs = require("fs");

var pathName = path.join(__dirname, "./live2D");
var dirs = [];

fs.readdir(pathName, function (err, files) {
  (function iterator (i) {
    if (i == files.length) {
      console.log(dirs);
      fs.writeFileSync('./fileName.js',"var fileNameList="+JSON.stringify(dirs))
      return;
    }
    var pathName2 = path.join(pathName, files[i]);
    fs.readdir(pathName2, function (err, data) {
      var fileList = data.filter(name => path.extname(name) === '.json');
      fileList.forEach(file => {
        const data = fs.statSync(path.join(pathName2, file));
        if (data.isFile()) {
          dirs.push(path.join(files[i], '/',file));
        }
      })
      iterator(i + 1);
    });
  })(0);
});
