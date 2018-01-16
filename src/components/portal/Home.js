import React from 'react';
import API from '../SpreadsheetData';

export default class PortalHome extends React.Component {

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');

    let Chaor = new Image();
    Chaor.src = API.base_image + "0B6oyUfwoM3u1LWtvNUZ2NVdjTGc";

    let Iflar = new Image();
    Iflar.src = API.base_image + "0B6oyUfwoM3u1bFVIclZscHlHTVE";

    let Illexia = new Image();
    Illexia.src = API.base_image + "0B6oyUfwoM3u1YzNhLUdSMHlmdFE";

    let Maxxor = new Image();
    Maxxor.src =  API.base_image + "0B6oyUfwoM3u1MVVqQlpqYldsVDQ";

    let background = new Image();
    // background.src = API.base_image + "0B6oyUfwoM3u1VXZOdV9QUXlCclU"; // lighter
    background.src = API.base_image + "1iu0GFaJQ0UsSN8yYWi77VY1cXsQpM4o7"; //darker

    var coin, coinImage;

    function gameLoop () {

      window.requestAnimationFrame(gameLoop);

      coin.update();
      coin.render();
    }

    function sprite (options) {

      var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;

      that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

          tickCount = 0;

          // If the current frame index is in range
          if (frameIndex < numberOfFrames - 1) {
              // Go to the next frame
              frameIndex += 1;
          } else {
              frameIndex = 0;
          }
        }
      };

      that.render = function () {

        // Clear the canvas
        that.context.clearRect(0, 0, that.width, that.height);
        that.context.drawImage(background, 0, 0);
        // that.context.drawImage(background, 0, 100, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        that.context.drawImage(Chaor, 50, 350);
        that.context.drawImage(Iflar, canvas.width - 300, 350);
        that.context.drawImage(Illexia, canvas.width-350, 10);
        that.context.drawImage(Maxxor, 50, 10);
        that.context.font = "40px Comic Sans MS";
        that.context.fillStyle = "red";
        that.context.textAlign = "center";
        that.context.fillText("Portal      Perim", canvas.width/2, canvas.height/2+12);

        // Draw the animation
        that.context.drawImage(
          that.image,
          frameIndex * that.width / numberOfFrames,
          0,
          that.width / numberOfFrames,
          that.height,
          canvas.width/2 - 33,
          canvas.height/2 - 33,
          that.width / numberOfFrames,
          that.height);
      };

      return that;
    }

    // Create sprite sheet
    coinImage = new Image();

    // Create sprite
    coin = sprite({
      context: canvas.getContext("2d"),
      width: 450,
      height: 66,
      image: coinImage,
      numberOfFrames: 7,
      ticksPerFrame: 4
    });

    // Load sprite sheet
    coinImage.addEventListener("load", gameLoop);
    coinImage.src = API.base_image + "0B6oyUfwoM3u1cC1vaGVkU1J1ZzQ";
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" height="600px" />
      </div>
    );
  }
}

