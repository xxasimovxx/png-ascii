const fs = require("fs");
var im = require('imagemagick');

PNG = require("pngjs").PNG;
function Resize(){
 im.resize({
  srcPath:  'asd.png',
  dstPath:  'example.png',
  width:200
}, function(err, stdout, stderr){
  if (err) throw err
  console.log('resized')
});}

let promise = new Promise(function(resolve,reject){
  Resize()
  if(fs.existsSync("example.png")){
    resolve("data")
  }
  reject(new Error("adadasd"))

})

makeImg()
async function makeImg(){
await promise.then(fs.createReadStream("example.png")
  .pipe(
    new PNG({
      filterType: 4,
    }),
  )
  .on("parsed", function() {
    var string = "";
    for (var y = 0; y < this.height; y++) {
      string += "\n";
      for (var x = 0; x < this.width; x++) {
        //if (x % 2 == 0 && y % 2 == 0) {
        string += "  ";
        var idx = (this.width * y + x) << 2;
        const brightness =
          (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;

        if (brightness < 36) {
          string += "W";
        } else if (brightness < 72) {
          string += "w";
        } else if (brightness < 108) {
          string += "l";
        } else if (brightness < 144) {
          string += "i";
        } else if (brightness < 180) {
          string += ":";
        } else if (brightness < 216) {
          string += ",";
        } else {
          string += ".";
        }
      }

    }
    fs.writeFile("out.txt", string, function(err) {
      if (err) throw err;
    });
  }),error => console.log(error))}
