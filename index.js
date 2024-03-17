const fs = require("fs");
const sharp = require("sharp");

PNG = require("pngjs").PNG;
//sharp("asd.png")
//  .resize({ width: 200 })
//  .toFile("example.png")
//  .then(function (newFileInfo) {
//    // newFileInfo holds the output file properties
//    console.log("Success");
//  })
//  .catch(function (err) {
//    console.log(err);
//  });
async function resizeImg(){
await sharp("asd.png")
  .resize({ width: 200 })
  .png()
  .toBuffer()
  .then((data) => {
    fs.writeFile("example.png", data)
      .then(() => {
        console.log("asd");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => console.log(err));
//while(!fs.existsSync("example.png")){

//  if(fs.existsSync("example.png")){break}
//}
}
resizeImg()
fs.createReadStream("example.png")
  .pipe(
    new PNG({
      filterType: 4,
    }),
  )
  .on("parsed", function () {
    let string = "";
    for (var y = 0; y < this.height; y++) {
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

    fs.writeFileSync("out.txt", string, function (err) {
      console.log(err);
    });
  });
