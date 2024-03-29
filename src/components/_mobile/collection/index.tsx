import {
  AppBar, Box, Card, Checkbox, createTheme, FormControl, FormControlLabel, InputLabel, MenuItem, 
  Pagination, Paper, Select, SelectChangeEvent, Stack, styled, ThemeProvider, Typography, useMediaQuery
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AttackCard from './Attack';
import BattlegearCard from './Battlegear';
import { chaoticCardProps, statsType } from './CardBase';
import CreatureCard from './Creature';
import LocationCard from './Location';
import MugicCard from './Mugic';
import NavMenu from './NavMenu';
import Search from './Search';
import { Attack, Battlegear, Card as ChaoticCard, Location, Mugic, Creature } from '../../common/definitions';

import './collection.scss';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 430,
      md: 650,
      lg: 1200,
      xl: 1536,
    }
  }
});

theme = createTheme(theme, createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F1F1F",
          color: "gray",
          marginBottom: "4px"
        }
      }
    }
  }
}));

const CustomSelect = styled(Select)(() => ({
  '& > .MuiSelect-outlined': {
    paddingTop: "5px",
    paddingBottom: "5px"
  }
}));

interface storage {
  extended?: string
  stats?: statsType
  hideStats?: string
}

export default function Collection (_props) {
  const [p, sp] = useState(1);
  const [n, sn] = useState(10);
  const [ext, setExtended] = useState(false);
  const [stats, setStats] = useState<statsType>("avg");
  const [hideStats, setHideStats] = useState(false);
  const [content, setContent] = useState<ChaoticCard[]>([]);
  const [info, setInfo] = useState<{text?: string}>({});
  const [selected, setSelected] = useState<ChaoticCard | null>(null);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  useEffect(() => {
    const load = localStorage.getItem("collection");

    if (load) {
      const { extended, stats, hideStats } = JSON.parse(load) as storage;
      if (extended !== undefined) setExtended((/true/i).test(extended)); 
      if (stats !== undefined) {
        if (stats == "min") setStats("min");
        if (stats == "max") setStats("max");
      }
      if (hideStats !== undefined) setHideStats(hideStats !== "false");
    }
  }, []);

  const saveSettings = (setting: Partial<storage>) => {
    const load = localStorage.getItem("collection");
    let save: storage = {};
    if (load) {
      const rest = JSON.parse(load) as storage;
      save = { ...rest, ...setting };
    } else {
      save = setting;
    }
    localStorage.setItem("collection", JSON.stringify(save));
  };

  const handlePerPage = (event: SelectChangeEvent<number>) => {
    sn(event.target.value as number);
    sp(1);
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    sp(value);
    window.scroll(0, 0);
  };

  const handleExt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtended(event.target.checked);
    saveSettings({ extended: event.target.checked.toString() });
  };

  const handleStats = (event: SelectChangeEvent<statsType>) => {
    setStats(event.target.value as statsType);
    saveSettings({ stats: event.target.value as statsType });
  };

  const handleHideStats = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideStats(event.target.checked);
    saveSettings({ hideStats: event.target.checked.toString() });
  };

  const handleExtendSingle = (card: ChaoticCard | null) => {
    setSelected(card);
  };

  useEffect(() => {
    setSelected(null);
  }, [content]);
  
  const TopMenu = () => (<>
    <Typography>{content.length} results</Typography>
    <FormControl>
      <InputLabel htmlFor="per-page">Per Page</InputLabel>
      <CustomSelect
        id="per-page"
        value={n}
        /* @ts-ignore */
        onChange={handlePerPage}
        sx={{ marginLeft: "2px", width: "70px" }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </CustomSelect>
    </FormControl>
    <Pagination variant="outlined" shape="rounded"
      count={Math.ceil(content.length / n)} 
      page={p} 
      onChange={handlePage}
      sx={{ width: "350px" }}
    />
    <FormControl>
      <InputLabel htmlFor="stats-drop">Stats</InputLabel>
      <CustomSelect
        id="stats-drop"
        value={stats}
        /* @ts-ignore */
        onChange={handleStats}
        sx={{ width: "106px" }}
      >
        <MenuItem value="min">Min</MenuItem>
        <MenuItem value="avg">Average</MenuItem>
        <MenuItem value="max">Max</MenuItem>
      </CustomSelect>
    </FormControl>
    <FormControlLabel 
      label="Extended"
      labelPlacement="start"
      control={<Checkbox checked={ext} onChange={handleExt} />} 
      sx={{
        margin: "auto 0",
        '& > .MuiCheckbox-root': {
          padding: 0
        }
      }}
    />
    <FormControlLabel label="Hide Stats"
      labelPlacement="start"
      control={<Checkbox checked={hideStats} onChange={handleHideStats} />} 
      sx={{
        margin: "auto 0",
        '& > .MuiCheckbox-root': {
          padding: 0
        }
      }}
    />
  </>); 

  return (<ThemeProvider theme={theme}>
    <Paper square sx={{ 
      minHeight: "100vh", height: "100%", 
      backgroundColor: '#323338',
      padding: 0
      // backgroundColor: "hsl(0deg 0% 97%)"
    }}>
      <Search {...({ setContent, setInfo })} />
      <AppBar color="inherit" sx={{ paddingLeft: 0 }} >
        {isSmall ? (<>
          <Box sx={{
            display: 'flex', 
            width: 'fit-content', 
            flexWrap: 'wrap', 
            rowGap: theme.spacing(1),
            columnGap: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            alignItems: "center"
          }}>
            <NavMenu />
            <TopMenu />
          </Box>
        </>): (<>
          <Stack 
            direction="row"
            justifyContent="flex-start"
          >
            <NavMenu />
            <Box sx={{
              display: 'flex', 
              width: 'fit-content', 
              flexWrap: 'wrap', 
              alignItems: "center", 
              rowGap: theme.spacing(1),
              columnGap: theme.spacing(1),
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(1),
            }}>
              <TopMenu />
            </Box>
          </Stack>
        </>)}
      </AppBar>
      <Box sx={{ 
        ["@media (min-width:904px)"]: { height: "58px" },
        ["@media (max-width:904px)"]: { height: "90px" },
        ["@media (max-width:612px)"]: { height: "132px" },
        ["@media (max-width:600px)"]: { height: "152px" }
      }}/>
      {info.text ? (
        <Typography style={{ textAlign: 'left' }}>{info.text}</Typography>
      ) : (<>
        <CardList
          cards={content.slice(n * (p-1), n * p)}
          extend={handleExtendSingle}
          {...({ selected, ext, stats, hideStats })}
        />
        <Box sx={{ 
          ["@media (max-width:922px)"]: { height: "80px" },
        }}/>
      </>
      )}
    </Paper>
  </ThemeProvider>);
}

type listProps = Omit<chaoticCardProps<ChaoticCard>, "card"> & {
  cards: ChaoticCard[]
  selected: ChaoticCard | null
}

const CardList = ({ cards, selected, ext, ...props }: listProps) => {
  const isSelected = (card: ChaoticCard) => {
    return (selected && card.gsx$name === selected.gsx$name && card.gsx$set === selected.gsx$set);
  };

  const list = cards.map((card, i) => {
    switch (card.gsx$type) {
      case "Attacks":
        return (<AttackCard key={card.gsx$name+card.gsx$set}
          card={card as Attack}  
          ext={(isSelected(card) || ext)}
          {...props}
        />);
      case "Battlegear":
        return (<BattlegearCard key={card.gsx$name+card.gsx$set}
          card={card as Battlegear}
          ext={(isSelected(card) || ext)}
          {...props}
        />);
      case "Creatures":
        return (<CreatureCard key={card.gsx$name+card.gsx$set}
          card={card as Creature}
          ext={(isSelected(card) || ext)}
          {...props}
        />);
      case "Locations":
        return (<LocationCard key={card.gsx$name+card.gsx$set}
          card={card as Location}
          ext={(isSelected(card) || ext)}
          {...props}
        />);
      case "Mugic":
        return (<MugicCard key={card.gsx$name+card.gsx$set}
          card={card as Mugic}
          ext={(isSelected(card) || ext)}
          {...props}
        />);
      default:
        return (<Card key={i}><Typography>Invalid Card Type</Typography></Card>);
    }
  });

  // Limitation of typescript - error TS2605
  return <div style={{ backgroundColor: "#fff", padding: 8 }}>{list}</div>;
};
