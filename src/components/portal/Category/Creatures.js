import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import Creature from '../Single/Creature';

@inject((stores, props, context) => props) @observer
export default class Creatures extends React.Component {
  @observable loaded = false;

  // ** Process the tribe ** //
  // /portal/Creatures/
  // /portal/Creatures/{Tribe}
  // The first / gets counted
  render() {
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'creatures'}, {'portal': 'creatures'}])
      .then(() => {
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    const tribe = (() => {
      if (path.length >= 4 && API.tribes.includes(path[3])) return path[3];
      else return null;
    })();

    const creatures = (() => {
      if (tribe) {
        return API.portal.creatures.find({'gsx$tribe': tribe});
      }
      else {
        return API.portal.creatures.chain().simplesort('gsx$name').data();
      }
    })();

    const output = creatures.map((creature, i) => {
      const card_data = API.cards.creatures.findOne({'gsx$name': creature.gsx$name});

      let url = (() => {
        if (tribe)
          return "/portal/Creatures/"+creature.gsx$tribe+"/"+creature.gsx$name;
        else
          return "/portal/Creatures/"+creature.gsx$name;
      })();

      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={url}
          >
            <span>{creature.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    let tribes = ["Danian", "Mipedian", "OverWorld", "UnderWorld"].map((tribe, i) => (
      <Route key={i} path={`${this.props.match.url}/${tribe}/:card`} component={Creature} />
    ));

    if (!tribe) {
      tribes.push(<Route key={5} path={`${this.props.match.url}/:card`} component={Creature} />)
    }

    return (<div className="entry creatures">
      <div className="left">
        <div className="title">{path[2]}<hr /></div>
        {output}
      </div>
      <div className="right">
        {tribes}
      </div>
    </div>);
  }
}
