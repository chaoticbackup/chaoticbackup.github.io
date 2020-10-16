import React, { Fragment } from 'react';
import { observable } from "mobx";
import API from '../SpreadsheetData';

export default class Home extends React.Component {
  @observable coin = null;

  updateCanvas(canvas) {
    if (!canvas) return;

    // Make it visually fill the positioned parent
    canvas.style.width  = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');

    const Logo = new Image();
    Logo.src = "/src/img/portal.png";

    const Creatures = (() => {
      const Chaor = new Image();
      Chaor.src = API.base_image + "0B6oyUfwoM3u1LWtvNUZ2NVdjTGc";
      Chaor.onload = (() => { ctx.drawImage(Chaor, 50, 350) });

      const Iflar = new Image();
      Iflar.src = API.base_image + "0B6oyUfwoM3u1bFVIclZscHlHTVE";
      Iflar.onload = (() => { ctx.drawImage(Iflar, canvas.width - 300, 350) });

      const Illexia = new Image();
      Illexia.src = API.base_image + "0B6oyUfwoM3u1YzNhLUdSMHlmdFE";
      Illexia.onload = (() => { ctx.drawImage(Illexia, canvas.width - 350, Logo.height + 10) });

      const Maxxor = new Image();
      Maxxor.src =  API.base_image + "0B6oyUfwoM3u1MVVqQlpqYldsVDQ";
      Maxxor.onload = (() => { ctx.drawImage(Maxxor, 50, Logo.height + 10) });
    });

    const background = new Image();
    // background.src = API.base_image + "0B6oyUfwoM3u1VXZOdV9QUXlCclU"; // lighter
    background.src = API.base_image + "1iu0GFaJQ0UsSN8yYWi77VY1cXsQpM4o7"; //darker
    background.onload = (() => {
      ctx.drawImage(background, 0, 0);
      // ctx.drawImage(background, 0, 100, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      Creatures();
      ctx.drawImage(Logo, canvas.width/2-Logo.width/2, 0);
    });

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
        const s_width = that.width / w_frames;
        const s_height = that.height / h_frames;
        const c_width = canvas.width/2 - s_width/2;
        const c_height = canvas.height/2 - s_height/2;

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

    const coinLoop = () => {
      if (this.coin) {
        window.requestAnimationFrame(coinLoop);
        this.coin.update();
        this.coin.render();
      }
    };

    // Create sprite sheet
    const coinImage = new Image();

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
    coinImage.addEventListener("load", coinLoop);
    coinImage.src = API.base_image + "0B6oyUfwoM3u1cC1vaGVkU1J1ZzQ";
  }

  render() {
    return (
      <Fragment>
        <canvas ref={this.updateCanvas.bind(this)} height="600px" />
      </Fragment>
    );
  }
}

