import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import {Loading} from '../../Snippets';
import Attack from '../Single/Attack';

@inject((stores, props, context) => props) @observer
export default class Attacks extends React.Component {
  @observable loaded = false;

  render() {
    if (this.loaded == false) {
      API.LoadDB([{'cards': 'attacks'}, {'portal': 'attacks'}])
      .then(() => {
        this.loaded = true;
      });
      return (<Loading />);
    }

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const output = API.portal.attacks.data.map((attack, i) => {
      const card_data = API.cards.attacks.findOne({'gsx$name': attack.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Attacks/'+attack.gsx$name}
          >
            <span>{attack.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div className="entry attacks">
      <div className="left">
        <div className="title">Attacks<hr /></div>
        {output}
      </div>
      <div className="right">
        <Route path={`${this.props.match.url}/:card`} component={Attack} />
      </div>
    </div>);
  }
}
