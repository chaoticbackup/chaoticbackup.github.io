/* eslint-disable react-hooks/exhaustive-deps */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { 
  Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox as MuiCheckbox, Dialog, DialogActions, DialogContent, 
  Fab, FormControlLabel as MuiFCL, FormGroup, InputAdornment, styled, TextField, ToggleButton, ToggleButtonGroup, 
  Typography, useMediaQuery, useTheme, Zoom 
} from '@mui/material';
import React, { FormEvent, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import search_api from '../../collection/search/search';
import { ElementIcon, TribeIcon } from '../../Snippets';
import API, { sets } from '../../SpreadsheetData/API';

const Accordion = styled(MuiAccordion)(() => ({
  "&.Mui-expanded": {
    margin: 0
  }
}));

const Checkbox = styled(MuiCheckbox)(() => ({
  padding: "4px"
}));

const FormControlLabel = styled(MuiFCL)(() => ({
  marginLeft: "-4px",
  marginRight: "8px"
}));

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

const initExpand = ({
  disciplines: true,
  energy: true,
  bpmc: true,
  types: true,
  rarity: false,
  sets: false
});

const queryList = ["sets", "types", "rarity", "tribes", "elements", "mull", "gender"];

const inputReducer = (state: typeof initInput, newState: Partial<typeof initInput>) => {
  return { ...state, ...newState };
};

const expandReducer = (state: typeof initExpand, newState: Partial<typeof initExpand>) => {
  return { ...state, ...newState };
};

function Search ({ setContent, setInfo }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const prevSearch = useRef(location.search);
  const [input, dispatchInput] = useReducer(inputReducer, initInput, (input) => parseQuery(input, location));
  const [expand, dispatchExpand] = useReducer(expandReducer, initExpand, parseExpand);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const fullscreen = useMediaQuery("@media (max-width:530px)");

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
    if (location.search != prevSearch.current) {
      prevSearch.current = location.search;
      dispatchInput(parseQuery(initInput, location));
    }
  }, [location.search]);

  const cleanInput = () => {
    dispatchInput({ ...initInput });
  };

  const handleSearch = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      
      const queryString = updateQuery(input);
      prevSearch.current = `?${queryString}`;
      navigate(`/collection/?${queryString}`);
      setOpen(false);
    }

    const results = search_api(input);

    setContent(results);
    if (results.length === 0) {
      setInfo({ 'text': 'No Results Found' });
    } else {
      setInfo({});
    }
  };

  const handleChange = (name: string, obj?: string) => (event: {target: HTMLInputElement | HTMLTextAreaElement}) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    dispatchInput({
      ...((!obj) ? { [name]: value } : { [obj]: { ...input[obj], [name]: value }})
    });
  };

  const handleExpand = (field: keyof typeof initExpand) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    dispatchExpand({ [field]: isExpanded });
    localStorage.setItem("collapsed", JSON.stringify({ ...expand, [field]: isExpanded }));
  };

  const handleOpen = () => {setOpen(true)};

  const handleClose = () => {setOpen(false)};

  const generate = (type: string, row: boolean, label: (item: string) => string | number | React.ReactElement) => {
    return Object.keys(input[type]).map((item, i) => (
      <FormControlLabel style={{ display: "inline" }} key={i} control={
        <Checkbox checked={input[type][item]} onChange={handleChange(item, type)} />
      } label={label(item)} />
    ));
  };

  const tribes = useMemo(() => (
    generate("tribes", true, (item) =>
      <TribeIcon size="icon20" tribe={item} />
    )
  ), [input.tribes]);

  const elements = useMemo(() => (
    generate("elements", true, (item) =>
      <ElementIcon size="icon20" element={item} value="5" />
    ).slice(0, -2)
  ), [input.elements]);

  const sets = useMemo(() => (
    generate("sets", false, (set) => 
      API.sets[set.toUpperCase()]
    )
  ), [input.sets]);

  const types = useMemo(() => (
    generate("types", false, (type) => 
      `${type.charAt(0).toUpperCase()}${type.slice(1)}`
    )
  ), [input.types]);

  const rarity = useMemo(() => (
    generate("rarity", false, (item) => 
      item.split(" ").map((st) => `${st.charAt(0).toUpperCase()}${st.slice(1)}`).join(" ")
    )
  ), [input.rarity]);

  const disciplines = useMemo(() => (
    Object.keys(input.disciplines).slice(0, 4).map((item) => (
      <TextField key={item}
        value={input.disciplines[item]}
        onChange={handleChange(item, "disciplines")}
        sx={{
          "@media (max-width:530px)": {
            width: "25%"
          },
          "@media (min-width:530px)": {
            width: "20%"
          },
          "& .MuiInputBase-input": { pt: 1, pb: 1 }
        }}
        InputProps={{
          inputProps: { min: 0 },
          startAdornment: (
            <InputAdornment position="start">
              <img className="icon20" style={{ verticalAlign: 'middle', padding: "0px 2px" }} src={`/public/img/icons/disciplines/${item}.png`} />
            </InputAdornment>
          ),
        }}
      />
    ))
  ), [input.disciplines]);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (<>
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullscreen}
    >
      {(loaded === true) && (<>
        <DialogContent>
          <Box component="form" 
            id='search-form'
            onSubmit={handleSearch}
          >
            <FormGroup>
              <TextField 
                label="Name"
                value={input.name}
                onChange={handleChange("name")}
              />
              <TextField
                label="Text"
                value={input.text}
                onChange={handleChange("text")}
              />
              <TextField
                label="Subtypes | Initiative"
                value={input.subtypes}    
                onChange={handleChange("subtypes")}
              />
              <FormControlLabel control={
                <Checkbox checked={!input.flavor} onChange={(e) => {dispatchInput({ flavor: !e.target.checked })}} />
              } label="Ignore Flavortext & Artist" />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel control={
                <Checkbox checked={input.mull.unique} onChange={handleChange("unique", "mull")} />
              } label="Unique" />
              <FormControlLabel control={
                <Checkbox checked={input.mull.loyal} onChange={handleChange("loyal", "mull")} />
              } label="Loyal" />
              <FormControlLabel control={
                <Checkbox checked={input.mull.legendary} onChange={handleChange("legendary", "mull")} />
              } label="Legendary" />
              <FormControlLabel control={
                <Checkbox checked={input.mull.mixed} onChange={handleChange("mixed", "mull")} />
              } label="Non-Loyal" />
            </FormGroup>
            <FormGroup row>
              {tribes}
            </FormGroup>
            <FormGroup row>
              {elements}
              <FormControlLabel control={
                <Checkbox checked={input.elements.none} onChange={handleChange("none", "elements")} />
              } label="None" />
            </FormGroup>
            <ToggleButtonGroup
              value={input.elements.and}
              exclusive
              sx={{ mb: 1 }}
              onChange={(e, value) => {dispatchInput({ "elements": { ...input.elements, "and": value }})} }
            >
              <ToggleButton value={false} sx={{ paddingTop: 0, paddingBottom: 0 }}>{(input.elements.none) ? "none" : "or"}</ToggleButton>
              <ToggleButton value={true} sx={{ paddingTop: 0, paddingBottom: 0 }}>{(input.elements.none) ? "only" : "and"}</ToggleButton>
            </ToggleButtonGroup>
            <FormGroup row>
              {disciplines}
              <FormControlLabel labelPlacement="start" 
                sx={{ 
                  "@media (max-width:530px)": {
                    marginLeft: "0"
                  },
                  "@media (min-width:530px)": {
                    marginLeft: "4px" 
                  }
                }} control={
                  <Checkbox checked={input.disciplines.max} onChange={handleChange("max", "disciplines")} />
                } label="Max" />
            </FormGroup>
            <FormGroup>
              <Typography>Energy</Typography>
              <FormGroup row>
                <TextField size="small" sx={{ width: "35%" }} label="Min" value={input.energy.min} onChange={handleChange("min", "energy")} />
                <TextField size="small" sx={{ width: "35%" }} label="Max" value={input.energy.max} onChange={handleChange("max", "energy")} />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Typography>Build Points & Mugic Counters/Cost</Typography>
              <FormGroup row>
                <TextField size="small" sx={{ width: "35%" }} label="Min" value={input.mcbp.min} onChange={handleChange("min", "mcbp")} />
                <TextField size="small" sx={{ width: "35%" }} label="Max" value={input.mcbp.max} onChange={handleChange("max", "mcbp")} />
              </FormGroup>
            </FormGroup>
            <Accordion expanded={expand.types}
              onChange={handleExpand("types")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Card Type</Typography> 
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>{types}</FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expand.rarity}
              onChange={handleExpand("rarity")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Rarity</Typography> 
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>{rarity}</FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expand.sets}
              onChange={handleExpand("sets")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Sets</Typography> 
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>{sets}</FormGroup>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
          <Button type="submit" form="search-form" variant="outlined">Submit</Button>
          <Button variant="outlined" onClick={() => cleanInput()}>Reset</Button>
          <Button onClick={handleClose} sx={{ marginLeft: "auto !important" }}>Close</Button>
        </DialogActions>
      </>)}
    </Dialog>
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

const parseQuery = (init: typeof initInput, location) => {
  const input = Object.assign({}, init);
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

const updateQuery = (input) => {
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

  return queryString;
};

const parseExpand = (init: typeof initExpand) => {
  let input = Object.assign({}, init);

  const collapsed = localStorage.getItem("collapsed");
  if (collapsed) {
    input = { ...input, ...JSON.parse(collapsed) };
  }

  return input;
};

export default Search;
