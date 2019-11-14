import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Donate} from '../Snippets';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import "./home.scss";

export const desktop = '@media (min-width: 975px)';
export const mobile = '@media (max-width: 975px)';

const useStyles = makeStyles((theme) => ({
  home: {
    [desktop]: {
      textAlign: "left",
      paddingLeft: "10%",
      paddingRight: "10%",
      "& div": {
        margin: "0 0 6px",
        lineHeight: "22px !important",
      },
      "& .title": {
        marginTop: "6px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
      }
    },
    [mobile]: {
      width: "80%",
    },
  },
  donate: {
    marginBottom: "6px",
    "& form a": {
      borderBottom: "none",
    }
  }
}));

const GithubLink = () => (
  <a 
    href="https://github.com/chaoticbackup" className="name" 
    rel='noreferrer noopener' target="_blank"
  >
    Chaotic Backup Project
  </a>
);

const LoreEntry = ({block, text}) => {
  return (
    <div className="lore">
      <div className="title">{block}</div>
      {text.map((entry, i) => <div key={i}>{entry}</div>)}
    </div>
  );
}

export default function(props) {
  const [lore, setLore] = useState([]);
  const classes = useStyles(useTheme());

  useEffect(() => {
    fetch("/src/json/starter_lore.json")
    .then((response) => {
      return response.json();
    })
    .then((lore) => {
      setLore(lore);
    })
    .catch(() => {
      setLore([{"block": "Unable to load lore...", "text": []}]);
    });
  }, []);

  return (
    <div className={classes.home}>
      <br />
      <div className="with-love">
        <div className="welcome">
          <div>Welcome to the <GithubLink />.</div>
          <div>Made with <span className="heart">♥</span> by
            <br />Danude Sandstorm (Project Lead)
            <br />Chiodosin1 (Database Contributions)
            <br />Afjak and Blitser (Art and Knowledge)
          </div>
          <div>Do you like the site? You can donate to support it!</div>
          <div className={classes.donate}><Donate /></div>
        </div>
        <div className="lore">
            We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the <Link to="/collection">collection</Link>, you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the <Link to="/portal">Portal to Perim</Link> disapeared along with the site. You can again explore the official lore and information of Creatures!
        </div>
        {lore.length > 0
          ? lore.map((entry, i) => <LoreEntry key={i} {...entry} />)
          : "Loading lore entries..."
        }
      </div>
    </div>
  );
}
