import React from 'react';
import API from '../SpreadsheetData';

export default class PortalHome extends React.Component {

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    const background = this.refs.background;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    background.width  = background.offsetWidth;
    background.height = background.offsetHeight;

    const ctx = canvas.getContext('2d');

    let Chaor = new Image();
    Chaor.src = API.base_image + "0B6oyUfwoM3u1LWtvNUZ2NVdjTGc";

    let Iflar = new Image();
    Iflar.src = API.base_image + "0B6oyUfwoM3u1bFVIclZscHlHTVE";

    let Illexia = new Image();
    Illexia.src = API.base_image + "0B6oyUfwoM3u1YzNhLUdSMHlmdFE";

    let Maxxor = new Image();
    Maxxor.src =  API.base_image + "0B6oyUfwoM3u1MVVqQlpqYldsVDQ";

    let loading = new Image();
    loading.src = API.base_image + "0B6oyUfwoM3u1cC1vaGVkU1J1ZzQ";

    let Forground = () => {
      Chaor.onload = (() => {
        ctx.drawImage(Chaor, 50, 350);
      });
      Iflar.onload = (() => {
        ctx.drawImage(Iflar, canvas.width - 300, 350);
      });
      Illexia.onload = (() => {
        ctx.drawImage(Illexia, canvas.width-350, 10);
      });
      Maxxor.onload = (() => {
        ctx.drawImage(Maxxor, 50, 10);
      });
      loading.onload = (() => {
        let width = canvas.width/2 - 33;
        let height = canvas.height/2 - 33;
        ctx.drawImage(loading, 0, 0, 66, 66, width, height, 66, 66);
      });
    }

    let Code = new Image();
    // Code.src = API.base_image + "0B6oyUfwoM3u1VXZOdV9QUXlCclU";
    Code.src = API.base_image + "1iu0GFaJQ0UsSN8yYWi77VY1cXsQpM4o7";
    Code.onload = (() => {
      //background.getContext('2d').drawImage(Code, 0, 0);
      // ctx.drawImage(Code, 0, 100, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      Forground();
    });
  }

  render() {
    const style = {position: 'absolute', height: '100%', width: '100%'};
    let background = style;
    let canvas = style;
    background.zIndex = 1;
    canvas.zIndex = 0;
    return (
      <div height="600px">
        <div style={{position: 'relative', height: '600px'}} >
          <canvas ref="background" style={background} />
          <canvas ref="canvas" style={canvas} />
        </div>
      </div>
    );
  }
}

