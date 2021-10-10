import React from 'react';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import { Rarity, Ability } from '../../Snippets';
import s from '../../../styles/app.style';

// own "name" display function
function Name(props) {
  const name = props.name.split(",");
  return (<>
    <span>{name[0]}</span>
    { name.length > 1 && 
      <span className="bigger"><br />{name[1].trim()}</span>
    }
  </>);
}

function Artist(props) {
  const artists = [];
  props.artist.split(/(?=, )/).forEach((artist, i) => {
    artists.push(<Link key={i} to={`/portal/Search/?${artist.replace(", ", "")}`}>{artist}</Link>);
  });
  return (<div className="artist">{artists}</div>);
}

@inject((stores, props, context) => props) @observer
export default class Single extends React.Component {
    @observable fullscreen = false;

    expand = (e) => {
      this.fullscreen = true;
    }

    close = (e) => {
      this.fullscreen = false;
    }

    render() {
      const { card } = this.props;

      return (<>
        <div className={"modal" + (this.fullscreen?"":" hidden")}>
          <span className="close" onClick={this.close}>&times;</span>
          <img className="modal-content" src={API.cardFullart(card)} />
        </div>
        {API.hasFullart(card) && (
          <div className="entry_splash">
            {/*<span className="arrow">&#8681;</span>*/}
            <img onClick={this.expand} src={API.cardFullart(card)} />
          </div>
        )}
        <div className="entry_body">
          <div className="title">
            <Name name={card.gsx$name} />
            <hr />
          </div>
          <div className="column">
            {card.gsx$artist && (<>
              <div>
                <strong>Artist(s):</strong>
                <Artist artist={card.gsx$artist} />
              </div>
              <hr />
            </>)}
            {card.gsx$set && (<>
              <div>
                <strong>Set: </strong>
                {`${API.sets[card.gsx$set]} (${card.gsx$set})`}
              </div>
              <hr />
            </>)}
            {card.gsx$rarity && (<>
              <div>
                <strong>Rarity: </strong>
                <Rarity set={card.gsx$set} rarity={card.gsx$rarity} iconOnly />&nbsp;
                {card.gsx$rarity}
              </div>
              <hr />
            </>)}
            {card.gsx$id && (<>
              <div>
                <strong>Card ID: </strong>
                {card.gsx$id}
              </div>
              <hr />
            </>)}
            {this.props.col0 && (<>
              {this.props.col0}
            </>)}
            {card.gsx$ability && (<>
              <hr />
              <div>
                <strong>Ability:</strong>
                <Ability ability={card.gsx$ability} />
              </div>
            </>)}
            {card.gsx$flavortext && (<>
              <hr />
              <div>
                <strong>Card Flavor:</strong><br />
                {card.gsx$flavortext}
              </div>
            </>)}
            {this.props.col1 && (<>
              <hr />
              this.props.col1
            </>)}
          </div>
          <div className="column">
            {this.props.col2}
          </div>
        </div>
      </>);
    }
}
