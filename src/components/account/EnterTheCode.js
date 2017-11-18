import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import style from '../../styles/style';
import DigitInput from 'react-digit-input';
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
  @observable message = "";

  render() {
    let validate = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(this.message);
      this.message = "Sorry, this feature doesn't exist :(";
      console.log(this.message);
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
        <span style={{'color': 'red'}}>{this.message}</span>
      </div>
    );
  }
}
