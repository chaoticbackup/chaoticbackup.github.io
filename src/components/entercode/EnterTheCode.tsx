import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Interactive } from 'react-interactive';
import API from '../SpreadsheetData';
import { Loading } from '../Snippets';
import style from '../../styles/style';
import useDigitInput from 'react-digit-input';

const s = Object.create(style);
s.input = {
  width: '1.2em',
  height: '1.4em',
  font: 'inherit',
  textAlign: 'center',
  margin: '0.05em',
  backgroundColor: "rgba(0,0,0,0)",
  color: "white",
};

s.inputGroup = {
  // display: 'flex',
  alignItems: 'center',
};

s.hyphen = {
  background: 'white',
  height: '0.1em',
  width: '.5em',
  display: 'inline-block',
};

const EnterTheCode = () => {
  const [value, onChange] = useState("");
  const [fanData, setFanData] = useState<any>(null);
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9a-z]$/i,
    length: 12,
    value,
    onChange
  });

  useEffect(() => {
    API.getSpreadsheet(API.path("1hzSojB76Me-P1qppxYR0oiHSU56jyK59x3DKm660ntc"), false, (data: any) => {
      setFanData(data);
    });
  }, []);

  if (fanData === null) {
    return (<Loading />);
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const validate = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (value.length < 12 || value.indexOf(" ") != -1) {
      setMessage(
        <p style={{ 'color': 'red' }}>Please enter a 12 digit code</p>
      );
    }
    else {
      const card = fanData[getRandomInt(0, fanData.length)];
      const rgx = /.*.png|.*.jpg/i;
      const img = (rgx.test(card.gsx$image.$t) ? card.gsx$image.$t : API.base_image + card.gsx$image.$t);
      setMessage(
        <>
          <p> Congrats on your scan! </p><br />
          <p className="bigger"> {card.gsx$name.$t} </p><br />
          <img className="card" src={img} />
        </>
      );
    }
  };

  return (<div className="enterthecode">
    <Interactive as={Link} {...s.link} to={`/EnterTheCode/PackSimulator/`}>Pack Simulator</Interactive>
    <br /><br />
    <div style={s.inputGroup}>
      <input type="text" style={s.input} {...digits[0]} />
      <input type="text" style={s.input} {...digits[1]} />
      <input type="text" style={s.input} {...digits[2]} />
      <input type="text" style={s.input} {...digits[3]} />
      <span style={s.hyphen} />
      <input type="text" style={s.input} {...digits[4]} />
      <input type="text" style={s.input} {...digits[5]} />
      <input type="text" style={s.input} {...digits[6]} />
      <input type="text" style={s.input} {...digits[7]} />
      <span style={s.hyphen} />
      <input type="text" style={s.input} {...digits[8]} />
      <input type="text" style={s.input} {...digits[9]} />
      <input type="text" style={s.input} {...digits[10]} />
      <input type="text" style={s.input} {...digits[11]} />
    </div>
    <br />
    <button onClick={validate}>Validate Code</button>
    <br /><br />
    <div>
      {message}
    </div>
  </div>);
};

export default EnterTheCode;
