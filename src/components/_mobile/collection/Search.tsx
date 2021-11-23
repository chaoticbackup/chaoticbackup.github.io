import React, { FormEvent, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import API, { sets } from '../../SpreadsheetData/API';
import search_api from '../../collection/search/search';
import { Loading } from '../../Snippets';
import { Modal, Fab, Zoom, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const initInput = (() => {
  /* @ts-ignore */
  const cardSets: {[key in keyof typeof sets]: boolean} = {};
  for (const key in sets) cardSets[key.toLowerCase()] = false;

  return {
    name: "",
    text: "",
    subtypes: "",
    flavor: true,
    sets: cardSets,
    types: { attack: false, battlegear: false, creature: false, location: false, mugic: false },
    rarity: { common: false, uncommon: false, rare: false, 'super rare': false, 'ultra rare': false, promo: false },
    tribes: { danian: false, 'm\'arrillian': false, mipedian: false, overworld: false, underworld: false, generic: false },
    elements: { fire: false, air: false, earth: false, water: false, none: false, and: false },
    disciplines: { courage: '', power: '', wisdom: '', speed: '', max: false },
    energy: { min: '', max: '' },
    mcbp: { min: '', max: '' },
    mull: { unique: false, loyal: false, legendary: false, mixed: false },
    gender: { ambiguous: false, female: false, male: false }
  };
})();

const queryList = ["sets", "types", "rarity", "tribes", "elements", "mull", "gender"];

const parseQuery = (input: typeof initInput, location) => {
  const queryString = location.search.toLowerCase();

  const query = {} as any;
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  // query -> input
  queryList.forEach((d) => {
    if (query[d]) {
      query[d].split(',').map(item => {
        input[d][item] = true;
      });
    }
  });

  if (query.hasOwnProperty('name')) input.name = query.name;
  if (query.hasOwnProperty('text')) input.text = query.text;
  if (query.hasOwnProperty('subtypes')) input.subtypes = query.subtypes;
  if (query.hasOwnProperty('courage')) input.disciplines.courage = query.courage;
  if (query.hasOwnProperty('power')) input.disciplines.power = query.power;
  if (query.hasOwnProperty('wisdom')) input.disciplines.wisdom = query.wisdom;
  if (query.hasOwnProperty('speed')) input.disciplines.speed = query.speed;
  if (query.hasOwnProperty('disc_max')) input.disciplines.max = !!query.disc_max;
  if (query.hasOwnProperty('energy')) {
    const q = query.energy.split(',');
    if (q[0] >= 0) input.energy.min = q[0];
    if (q[1] >= 0) input.energy.max = q[1];
  }
  if (query.hasOwnProperty('mcbp')) {
    const q = query.mcbp.split(',');
    if (q[0] >= 0) input.mcbp.min = q[0];
    if (q[1] >= 0) input.mcbp.max = q[1];
  }

  return input;
};

const updateQuery = (input, history) => {
  let queryString = "";

  queryList.forEach(query => {
    let temp = "";
    Object.keys(input[query]).forEach((item) => {
      if (input[query][item] == true) temp += `${item},`;
    });
    if (temp.length > 0) {
      queryString += `${query}=${temp.replace(/\,$/, '&')}`;
    }
  });

  if (input.name) queryString += `name=${encodeURIComponent(input.name)}&`;
  if (input.text) queryString += `text=${encodeURIComponent(input.text)}&`;
  if (input.subtypes) queryString += `subtypes=${encodeURIComponent(input.subtypes)}&`;
  if (input.disciplines.courage > 0) queryString += `courage=${input.disciplines.courage}&`;
  if (input.disciplines.power > 0) queryString += `power=${input.disciplines.power}&`;
  if (input.disciplines.wisdom > 0) queryString += `wisdom=${input.disciplines.wisdom}&`;
  if (input.disciplines.speed > 0) queryString += `speed=${input.disciplines.speed}&`;
  if (input.disciplines.max) queryString += "disc_max=true&";
  if (input.energy.min != "" || input.energy.max != "") {
    queryString += "energy=";
    if (input.energy.min != "" && input.energy.min >= 0) queryString += input.energy.min;
    queryString += ",";
    if (input.energy.max != "" && input.energy.max >= 0) queryString += input.energy.max;
    queryString += "&";
  }
  if (input.mcbp.min != "" || input.mcbp.max != "") {
    queryString += "mcbp=";
    if (input.mcbp.min != "" && input.mcbp.min >= 0) queryString += input.mcbp.min;
    queryString += ",";
    if (input.mcbp.max != "" && input.mcbp.max >= 0) queryString += input.mcbp.max;
    queryString += "&";
  }

  // Strip trailing &
  queryString = queryString.replace(/\&$/, '');

  // Push to URL
  history.push(`/collection/?${queryString}`);
};

const inputReducer = (state: typeof initInput, newState: Partial<typeof initInput>) => {
  return { ...state, ...newState };
};

export default function Search ({ setContent, setInfo }) {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const prevLocation = useRef<any>(undefined);
  const [input, dispatchInput] = useReducer(inputReducer, initInput);
  // const [input, setInput] = useState(() => initInput());
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInfo({ 'text': 'Loading..' });
    API.LoadDB([{ 'cards': 'attacks' }, { 'cards': 'battlegear' }, { 'cards': 'creatures' }, { 'cards': 'locations' }, { 'cards': 'mugic' }])
    .then(() => {
      setLoaded(true);
      handleSearch();
    })
    .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location != prevLocation.current) {
      prevLocation.current = location;
      dispatchInput(parseQuery(input, location));
    }
  }, [input, location]);


  const cleanInput = () => {
    dispatchInput(initInput);
  };

  const handleSearch = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      updateQuery(input, history);
    }

    const results = search_api(input);

    setContent(results);
    if (results.length === 0) {
      setInfo({ 'text': 'No Results Found' });
    } else {
      setInfo({});
    }
  };

  const handleChange = (event: {target: HTMLInputElement}, obj?: string) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    dispatchInput({
      ...((!obj) ? { [input[name]]: value } : { [input[obj][name]]: value })
    });
  };

  const form = ((loaded == false) ? <></> : <>

  </>);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (<>
    <Modal
      open={open}
      onClose={handleClose}
    >
      {form}
    </Modal>
    <Zoom
      in={!open}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${!open ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab aria-label="search" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <SearchIcon />
      </Fab>
    </Zoom>
  </>);
}
