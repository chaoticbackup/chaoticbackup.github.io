import React from 'react';
import style from '../../styles/style';
import DigitInput from 'react-digit-input';
import API from '../SpreadsheetData';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';

const s = Object.create(style);
s.input = {
  width: '1em',
  height: '1em',
  font: 'inherit',
  textAlign: 'center',
  margin: '0.1em',
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
  @observable message = null;
  @observable fan = null;

  render() {
    if (!this.fan) {
      API.getSpreadsheet(API.path("1hzSojB76Me-P1qppxYR0oiHSU56jyK59x3DKm660ntc"), (data) => {
        this.fan = data;
      });
      return (<span>Loading...</span>);
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
      if (this.code == "" || this.code.indexOf(" ") === 1) {
        this.message = (
          <p style={{'color': 'red'}}>Please enter a 12 digit code</p>
        );
      }
      else {
        let card = this.fan[getRandomInt(0, this.fan.length)];
        this.message = (
          <div key="1">
            <p> Congrats on your scan! </p><br />
            <p> {card.gsx$name.$t} </p><br />
            <img className="card" src={API.base_image + card.gsx$image.$t} />
          </div>
        );
      }
    }

    return(
      <div>
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
        {this.message}
      </div>
    );
  }
}
