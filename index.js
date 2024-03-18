var fs = require("fs");
var path = require('path');
PNG = require("pngjs").PNG;
const sharp = require("sharp");

const promise = fs.promises.readFile(path.join('asd.png'));

Promise.resolve(promise).then(function(buffer){
     resizeImage(buffer)
});

let string = "";
async function resizeImage(buffer) {
    await sharp(buffer).resize(200).toFile("example.png");
    makeImg(string)

       fs.writeFileSync("out.txt", string, err => {
         console.log(err +"asd");
       });
}
function makeImg(string) {

  fs.createReadStream("example.png")
    .pipe(
      new PNG({
        filterType: 4,
      }),
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        string += "/n"
        for (var x = 0; x < this.width; x++) {
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

    });

}
