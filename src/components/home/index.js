import React from 'react';
import {Link} from 'react-router-dom';
import {Donate} from '../Snippets';
import "./home.scss";
import {observable} from 'mobx';

const GithubLink = () => (
  <a 
    href="https://github.com/chaoticbackup" className="name" 
    rel='noreferrer noopener' target="_blank"
  >
    Chaotic Backup Project
  </a>
);

const LoreEntry = ({block, text, sets}) => {
  return (
    <div className="lore">
      <div className="block">{block}</div>
      {text.map((entry, i) => <div key={i} dangerouslySetInnerHTML={{__html: entry}} />)}
      {sets.map((set, i) => {
        if (set.text && set.text.length > 0) {
          return <div className="set" key={i}>
            <div className="title">{set.title}</div>
            {set.text.map((entry, i) => <div key={i}>{entry}</div>)}
          </div>;
        }
      })}
    </div>
  );
}

export default class Home extends React.Component {
  state = {lore: []};

  componentDidMount() {
    fetch("/src/json/starter_lore.json")
    .then((response) => {
      return response.json();
    })
    .then((lore) => {
      this.setState({"lore": lore});
      return;
    })
    .catch(() => {
      this.setState({"lore": [{"block": "Unable to load lore...", "text": []}]})
    });
  }

  render() {
    return (
      <div>
        <br />
        <div className="with-love">
          <div>Welcome to the <GithubLink />.</div>
          <span>Built by fans for fans.</span>
          <br /><br />
          <div>Made with <span className="heart">♥</span> by
            <br />Danude Sandstorm (Project Lead)
            <br />Chiodosin1 (Database Contributions)
            <br />Afjak and Blitser (Art and Knowledge)
          </div>
          <div>Do you like the site? You can donate to support it!</div>
          <div className="donate"><Donate /></div>
          <div className="lore">We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the <Link to="/collection">collection</Link>, you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the <Link to="/portal">Portal to Perim</Link> disapeared along with the site. You can again explore the official lore and information of Creatures!
          </div>
          <br />
          {this.state.lore.length > 0
            ? this.state.lore.map((entry, i) => <LoreEntry key={i} {...entry} />)
            : "Loading lore entries..."
          }
        </div>
      </div>
    );
  }
}
