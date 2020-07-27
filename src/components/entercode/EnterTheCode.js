import React from 'react';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Interactive from 'react-interactive';
import DigitInput from 'react-digit-input';
import API from '../SpreadsheetData';
import { Loading } from '../Snippets';
import style from '../../styles/style';
import './packs.scss';

const s = Object.create(style);
s.input = {
  width: '1.2em',
  height: '1.4em',
  font: 'inherit',
  textAlign: 'center',
  margin: '0.05em',
  backgroundColor: "rgba(0,0,0,0)",
  color: "white",
}

s.inputGroup = {
  // display: 'flex',
  alignItems: 'center',
}

s.hyphen = {
  background: 'white',
  height: '0.1em',
  width: '.5em',
  display: 'inline-block',
}

@inject((stores, props, context) => props) @observer
export default class EnterTheCode extends React.Component {
  @observable code = "";
  message = observable({ contents: null }, { contents: observable.ref });
  @observable fan = null;

  render() {
    if (!this.fan) {
      API.getSpreadsheet(API.path("1hzSojB76Me-P1qppxYR0oiHSU56jyK59x3DKm660ntc"), (data) => {
        this.fan = data;
      });
      return (<Loading />);
    }

    let getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let validate = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (this.code.length < 12 || this.code.indexOf(" ") != -1) {
        this.message.contents = (
          <p style={{ 'color': 'red' }}>Please enter a 12 digit code</p>
        );
      }
      else {
        let card = this.fan[getRandomInt(0, this.fan.length)];
        let rgx = /.*.png|.*.jpg/i;
        let img = (rgx.test(card.gsx$image.$t) ? card.gsx$image.$t : API.base_image + card.gsx$image.$t);
        this.message.contents = (
          <div key={0}>
            <p> Congrats on your scan! </p><br />
            <p className="bigger"> {card.gsx$name.$t} </p><br />
            <img className="card" src={img} />
          </div>
        );
      }
    }

    return(
      <div>
        <Interactive as={Link} {...s.link}
         to={`/EnterTheCode/PackSimulator/`}>Pack Simulator</Interactive>
        <br /><br />
        <DigitInput
          acceptedCharacters={/^[0-9a-z]$/i}
          length={12}
          value={this.code}
          onChange={(value) => this.code = value}
        >
        {props => (
          <div style={s.inputGroup}>
            <input type="text" style={s.input} {...props[0]} />
            <input type="text" style={s.input} {...props[1]} />
            <input type="text" style={s.input} {...props[2]} />
            <input type="text" style={s.input} {...props[3]} />
            <span style={s.hyphen} />
            <input type="text" style={s.input} {...props[4]} />
            <input type="text" style={s.input} {...props[5]} />
            <input type="text" style={s.input} {...props[6]} />
            <input type="text" style={s.input} {...props[7]} />
            <span style={s.hyphen} />
            <input type="text" style={s.input} {...props[8]} />
            <input type="text" style={s.input} {...props[9]} />
            <input type="text" style={s.input} {...props[10]} />
            <input type="text" style={s.input} {...props[11]} />
          </div>
        )}
        </DigitInput>
        <br />
        <button onClick={validate}>Validate Code</button>
        <br /><br />
        {this.message.contents}
      </div>
    );
  }
}
