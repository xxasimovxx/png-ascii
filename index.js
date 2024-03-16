var fs = require("fs"),
  PNG = require("pngjs").PNG;

fs.createReadStream("example.png")
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
          const brightness = (this.data[idx] + this.data[idx + 1] + this.data[idx+2])/3
          //const brightness =
          //  (this.data[idx] +
          //    this.data[idx + 1] +
          //    this.data[idx + 2] +
          //    this.data[idx + 3] +
          //    this.data[idx + 4] +
          //    this.data[idx + 5] +
          //    this.data[idx + this.width] +
          //    this.data[idx + 1 + this.width] +
          //    this.data[idx + 2 + this.width] +
          //    this.data[idx + 3 + this.width] +
          //    this.data[idx + 4 + this.width] +
          //    this.data[idx + 5 + this.width]) /
          //  12;

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

        // invert color
        //        this.data[idx] = 255 - this.data[idx];
        //        this.data[idx + 1] = 255 - this.data[idx + 1];
        //        this.data[idx + 2] = 255 - this.data[idx + 2];

        // and reduce opacity
        //this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    //}

    fs.writeFile("out.txt", string, function(err) {
      if (err) throw err;
    });
  });
