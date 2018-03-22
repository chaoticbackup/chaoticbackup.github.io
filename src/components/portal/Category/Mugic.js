import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import SingleMugic from '../Single/Mugic';

@inject((stores, props, context) => props) @observer
export default class Mugic extends React.Component {
  @observable loaded = false;

  // ** Process the tribe ** //
  // /portal/Mugic/
  // /portal/{Tribe}/Mugic/
  // The first / gets counted
  render() {
    if (this.loaded == false) {
      if (API.urls !== null &&
        API.portal !== null &&
        API.cards !== null
      ) {
        API.buildCollection([{'cards': 'mugic'}, {'portal': 'mugic'}])
        .then(() => {
          this.loaded = true;
        });
      }
      return (<span>Loading...</span>);
    }

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const tribe = (() => {
      if (path.length >= 4 && API.tribes.includes(path[3])) return path[3];
      else return null;
    })();

    const mugic = (() => {
      if (tribe) {
        return API.portal.mugic.find({'gsx$tribe': tribe});
      }
      else {
        return API.portal.mugic.chain().simplesort('gsx$name').data();
      }
    })();

    const output = mugic.map((single_mugic, i) => {
      const card_data = API.cards.mugic.findOne({'gsx$name': single_mugic.gsx$name});

      let url = (() => {
        if (tribe)
          return "/portal/Mugic/"+single_mugic.gsx$tribe+"/"+encodeURIComponent(single_mugic.gsx$name);
        else
          return "/portal/Mugic/"+encodeURIComponent(single_mugic.gsx$name);
      })();

      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={url}
          >
            <span>{single_mugic.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    const tribes = API.tribes.map((tribe, i) => (
      <Route key={i} path={`${this.props.match.url}/${tribe}/:card`} component={SingleMugic} />
    ));

    if (!tribe) {
      tribes.push(<Route key={5} path={`${this.props.match.url}/:card`} component={SingleMugic} />)
    }

    return (<div className="entry mugic">
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
