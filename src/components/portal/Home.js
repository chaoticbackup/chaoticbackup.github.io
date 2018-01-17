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

    let Logo = new Image();
    Logo.src = "/src/img/portal.png";

    let Creatures = (() => {
      let Chaor = new Image();
      Chaor.src = API.base_image + "0B6oyUfwoM3u1LWtvNUZ2NVdjTGc";
      Chaor.onload = (() => { ctx.drawImage(Chaor, 50, 350); });

      let Iflar = new Image();
      Iflar.src = API.base_image + "0B6oyUfwoM3u1bFVIclZscHlHTVE";
      Iflar.onload = (() => { ctx.drawImage(Iflar, canvas.width - 300, 350); });

      let Illexia = new Image();
      Illexia.src = API.base_image + "0B6oyUfwoM3u1YzNhLUdSMHlmdFE";
      Illexia.onload = (() => { ctx.drawImage(Illexia, canvas.width-350, Logo.height + 10); });

      let Maxxor = new Image();
      Maxxor.src =  API.base_image + "0B6oyUfwoM3u1MVVqQlpqYldsVDQ";
      Maxxor.onload = (() => { ctx.drawImage(Maxxor, 50, Logo.height + 10); });
    });

    let background = new Image();
    // background.src = API.base_image + "0B6oyUfwoM3u1VXZOdV9QUXlCclU"; // lighter
    background.src = API.base_image + "1iu0GFaJQ0UsSN8yYWi77VY1cXsQpM4o7"; //darker
    background.onload = (() => {
      ctx.drawImage(background, 0, 0);
      // ctx.drawImage(background, 0, 100, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      Creatures();
      ctx.drawImage(Logo, canvas.width/2-Logo.width/2, 0);
    });


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
        let s_width = that.width / numberOfFrames;
        let s_height = that.height;
        let c_width = canvas.width/2 - 33;
        let c_height = canvas.height/2 - 33;

        // Clear the canvas
        that.context.clearRect(c_width, c_height, s_width, s_height);
        // ctx.drawImage(background, 0, 100, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        that.context.drawImage(background, c_width, c_height, s_width, s_height, c_width, c_height, s_width, s_height);

        // Draw the animation
        that.context.drawImage(
          that.image,
          frameIndex * s_width,
          0,
          s_width,
          s_height,
          c_width,
          c_height,
          s_width,
          s_height);
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

