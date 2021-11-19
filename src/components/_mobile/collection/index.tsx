import { 
  Box, Card, Checkbox, createTheme, FormControl, FormControlLabel, InputLabel, MenuItem, Pagination, Paper, Select, SelectChangeEvent, styled, ThemeProvider, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Attack, Battlegear, Location, Card as ChaoticCard } from '../../common/definitions';
import AttackCard from './Attack';
import BattlegearCard from './Battlegear';
import LocationCard from './Location';
import { chaoticCardProps, statsType } from './CardBase';
import Search from './Search';

import './collection.scss';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
});

theme = createTheme(theme, createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F1F1F",
          color: "gray",
          paddingLeft: theme.spacing(.5)
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
  const [selected, setSelected] = useState("");

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
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    sp(value);
  };

  const handleExt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtended(event.target.checked);
    saveSettings({ extended: event.target.checked.toString() });
  };

  const hanldeStats = (event: SelectChangeEvent<statsType>) => {
    setStats(event.target.value as statsType);
    saveSettings({ stats: event.target.value as statsType });
  };

  const handleHideStats = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideStats(event.target.checked);
    saveSettings({ hideStats: event.target.checked.toString() });
  };

  const handleExtendSingle = (name: string) => {
    setSelected(name);
  };

  useEffect(() => {
    console.log("refresh list");
    setSelected("");
  }, [content]);
  
  return (<ThemeProvider theme={theme}>
    <Paper square sx={{ minHeight: "100vh", height: "100%", paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1) }}>
      <Search {...({ setContent, setInfo })} />
      <Box sx={{
        display: 'flex', 
        width: 'fit-content', 
        flexWrap: 'wrap', 
        alignItems: "flex-start", 
        rowGap: theme.spacing(1),
        columnGap: theme.spacing(1),
        paddingTop: theme.spacing(2), 
        paddingBottom: theme.spacing(1)
      }}>
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
        />
        <FormControl>
          <InputLabel htmlFor="stats-drop">Stats</InputLabel>
          <CustomSelect
            id="stats-drop"
            value={stats}
            /* @ts-ignore */
            onChange={hanldeStats}
            sx={{ width: "106px" }}
          >
            <MenuItem value="min">Min</MenuItem>
            <MenuItem value="avg">Average</MenuItem>
            <MenuItem value="max">Max</MenuItem>
          </CustomSelect>
        </FormControl>
        <FormControlLabel label="Extended"
          labelPlacement="start"
          control={<Checkbox checked={ext} onChange={handleExt} />} 
          sx={{
            marginLeft: 0,
            marginRight: 0,
            '& > .MuiCheckbox-root': {
              padding: 0
            }
          }}
        />
        <FormControlLabel label="Hide Stats"
          labelPlacement="start"
          control={<Checkbox checked={hideStats} onChange={handleHideStats} />} 
          sx={{
            marginLeft: 0,
            marginRight: 0,
            '& > .MuiCheckbox-root': {
              padding: 0
            }
          }}
        />
      </Box>
      {info.text ? (
        <Typography style={{ textAlign: 'left' }}>{info.text}</Typography>
      ) : (
        <CardList
          cards={content.slice(n * (p-1), n * p)}
          extend={handleExtendSingle}
          {...({ selected, ext, stats, hideStats })}
        />
      )}
    </Paper>
  </ThemeProvider>);
}

type listProps = Omit<chaoticCardProps<ChaoticCard>, "card"> & {
  cards: ChaoticCard[]
  selected: string
}

const CardList = ({ cards, selected, ext, ...props }: listProps) => {

  const list = cards.map((card, i) => {
    switch (card.gsx$type) {
      case "Attacks":
        return (<AttackCard key={card.gsx$name+card.gsx$set}
          card={card as Attack}  
          ext={(card.gsx$name === selected || ext)}
          {...props}
        />);
      case "Battlegear":
        return (<BattlegearCard key={card.gsx$name+card.gsx$set}
          card={card as Battlegear}
          ext={(card.gsx$name === selected || ext)}
          {...props}
        />);
      // case "Creatures":
      //   return (<Creature card={card} key={i} {...props}/>);
      case "Locations":
        return (<LocationCard key={card.gsx$name+card.gsx$set}
          card={card as Location}
          ext={(card.gsx$name === selected || ext)}
          {...props}
        />);
      // case "Mugic":
      //   return (<Mugic card={card} key={i} {...props}/>);
      default:
        return (<Card key={i}><Typography>Invalid Card Type</Typography></Card>);
    }
  });

  // Limitation of typescript - error TS2605
  return <>{list}</>;
};
