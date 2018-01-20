import React from 'react';
import { Route } from 'react-router-dom';
import API from '../SpreadsheetData';

export function Routing(props) {
  console.log(props);
  const match = props.match;

  return (
    <div>
      <Route exact path={match.url} component={Home} />
      {/* <Route path={`${match.url}collection`} component={CollectionHome} /> */}
    </div>
  );
}

class Home extends React.Component {

  componentDidMount() {
    this.coin = null;
    this.updateCanvas();
  }

  componentWillUnmount() {
    this.coin = null;
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


    let gameLoop = () => {
      if (this.coin) {
        window.requestAnimationFrame(gameLoop);
        this.coin.update();
        this.coin.render();
      }
    }

    function sprite (options) {

      var that = {},
        w_frameIndex = 0,
        h_frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = (options.ticksPerFrame || 0),
        frames = (options.frames || 1),
        w_frames = (options.w_frames || 1),
        h_frames = (options.h_frames || 1);

      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.image = options.image;

      var frameCount = 0;

      that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

          tickCount = 0;
          frameCount++;

          // If the current horizontal frame index is in range
          if (w_frameIndex + 1 < w_frames) {
            // Go to the next frame
            w_frameIndex += 1;
          }
          else {
            // Go to next row
            w_frameIndex = 0;
            h_frameIndex += 1;
          }

          // If out of frames, reset
          if (frameCount + 1 > frames) {
            w_frameIndex = 0;
            h_frameIndex = 0;
            frameCount = 0;
          }
        }
      };

      that.render = function () {
        let s_width = that.width / w_frames;
        let s_height = that.height / h_frames;
        let c_width = canvas.width/2 - s_width/2;
        let c_height = canvas.height/2 - s_height/2;

        // Clear the canvas
        that.context.clearRect(c_width, c_height, s_width, s_height);
        that.context.drawImage(background, c_width, c_height, s_width, s_height, c_width, c_height, s_width, s_height);

        // Draw the animation
        that.context.drawImage(
          that.image,
          s_width * w_frameIndex,
          s_height * h_frameIndex,
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
    let coinImage = new Image();

    // Create sprite
    this.coin = sprite({
      context: canvas.getContext("2d"),
      width: 448,
      height: 448,
      image: coinImage,
      w_frames: 7,
      h_frames: 7,
      frames: 47,
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

