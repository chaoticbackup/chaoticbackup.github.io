import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Interactive } from 'react-interactive';
import { setupDB, generate, blankCard } from "./generate";
import API from '../SpreadsheetData';
import { Loading } from '../Snippets';
import s from '../../styles/style';

export default function PackSimulator () {
  const [loaded, setLoaded] = useState(false);
  const [set, setSet] = useState("");
  const [setsInput, setSetsInput] = useState<JSX.Element[]>([]);
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [packs, setPacks] = useState(1);

  useEffect(() => {
    API.LoadDB([{ 'cards': 'attacks' }, { 'cards': 'battlegear' }, { 'cards': 'creatures' }, { 'cards': 'locations' }, { 'cards': 'mugic' }])
        .then(() => {
          setupDB();
          setLoaded(true);
        })
        .catch(() => {});

    const cards = [];
    for (let i = 0; i < 9; i++) {
      cards.push(blankCard(i));
    }
    setCards(cards);

    const setsInput = [];
    let i = 1;
    for (const set in API.sets) {
      setsInput.push(<option key={i++} value={set}>{API.sets[set]}</option>);
      if (set === "PE1") break;
    }
    setSetsInput(setsInput);
  }, []);

  if (loaded == false) {
    return (<Loading />);
  }

  const onPacksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) > 24) e.target.value = "24";
    setPacks(parseInt(e.target.value));
  };

  const onSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSet(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setCards(generate({ packs, set }));
  };

  return (
    <div className="packsim">
      <Interactive as={Link} {...s.link} to={`/EnterTheCode/`}>Enter The Code</Interactive>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <label>Packs:
          <input name="packs" type="number"
            value={packs}
            min="1" max="24"
            style={{ width: "32px", padding: '0px' }}
            onChange={onPacksChange} />
        </label>
        <select name="set" value={set} onChange={onSetChange}>
          <option defaultValue="selected" hidden style={{ fontStyle: 'italic' }}>Select a Set</option>
          {setsInput}
        </select>
        <br /><br />
        <input disabled={!set} type="submit" value="Open Packs" />
      </form>
      <br /><br />
      <div className="pack">{cards}</div>
    </div>
  );
}
