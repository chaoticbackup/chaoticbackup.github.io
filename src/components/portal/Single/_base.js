import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import API from '../../SpreadsheetData';
import {Rarity, Ability} from '../../Snippets';
import s from '../../../styles/app.style';

// own "name" display function
function Name(props) {
    let name = props.name.split(",");
    return (<React.Fragment>
      <span>{name[0]}</span>
      { name.length > 1 && 
        <span className="bigger"><br />{name[1].trim()}</span>
      }
    </React.Fragment>);
}

function Artist(props) {
    let artists = [];
    props.artist.split(/(?=, )/).forEach((artist, i) => {
        artists.push(<Link key={i} to={`/portal/Search/?${artist.replace(", ", "")}`}>{artist}</Link>);
    });
    return (<div className="artist">{artists}</div>)
}

@inject((stores, props, context) => props) @observer
export default class Single extends React.Component {
    @observable fullscreen = false;

    expand(e) {
        this.fullscreen = true;
    }

    close(e) {
        this.fullscreen = false;
    }

    render() {
        let card = this.props.card;
        return (<React.Fragment>
            <div className={"modal" + (this.fullscreen?"":" hidden")}>
              <span className="close" onClick={this.close.bind(this)}>&times;</span>
              <img className="modal-content" src={API.base_image + card.gsx$splash} />
            </div>
            {card.gsx$splash && (
            <div className="entry_splash">
                {/*<span className="arrow">&#8681;</span>*/}
              <img onClick={this.expand.bind(this)} src={API.base_image + card.gsx$splash} />
            </div>
            )}
            <div className="entry_body">
                <div className="title">
                    <Name name={card.gsx$name} />
                    <hr />
                </div>
                {this.props.text &&
                    <div className="nocolumn">{this.props.text}</div>
                }
                {!this.props.text &&
                    <div className="column">
                    {card.gsx$artist && <React.Fragment>
                        <div>
                          <strong>Artist(s):</strong>
                          <Artist artist={card.gsx$artist} />
                        </div>
                        <hr />
                    </React.Fragment>}
                        <div>
                          <strong>Set: </strong>
                          {`${API.sets[card.gsx$set]} (${card.gsx$set})`}
                        </div>
                        <hr />
                        <div>
                          <strong>Rarity: </strong>
                          <Rarity set={card.gsx$set} rarity={card.gsx$rarity} notext="true" />
                          &nbsp;{card.gsx$rarity}
                        </div>
                        <hr />
                        <div>
                          <strong>Card ID: </strong>
                          {card.gsx$id}
                        </div>
                        {this.props.col0 && <React.Fragment>
                            <hr />
                            {this.props.col0}
                        </React.Fragment>}
                        {card.gsx$ability && <React.Fragment>
                            <hr />
                            <div>
                              <strong>Ability:</strong>
                              <Ability ability={card.gsx$ability} />
                            </div>
                        </React.Fragment>}
                        {card.gsx$flavortext && <React.Fragment>
                            <hr />
                            <div>
                              <strong>Card Flavor:</strong><br />
                              {card.gsx$flavortext}
                            </div>
                        </React.Fragment>}
                        {this.props.col1 && <React.Fragment>
                            <hr />
                            this.props.col1
                        </React.Fragment>}
                    </div>
                }
                {!this.props.text &&
                    <div className="column">
                        {this.props.col2}
                    </div>
                }
            </div>
        </React.Fragment>);
    }
}
