import React from 'react';
import Interactive from 'react-interactive';
import { Link, Route } from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../../styles/app.style';
import API from '../../SpreadsheetData';
import {Loading} from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class Category extends React.Component {
  @observable loaded = false;

  constructor(props) {
    super(props);

    let path = props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash
    this.path = path;
    this.type = props.type;
  }

  render() {
    if (this.loaded == false) {
      API.LoadDB([{'cards': this.type}, {'portal': this.type}])
      .then(() => {
        this.loaded = true;
      });
      return (<Loading />);
    }

    const bottom_nav = API.portal[this.type].data.map((card, i) => {
      let card_data = API.cards[this.type].findOne({'gsx$name': card.gsx$name});
      return (
        <div key={i}>
          <Interactive key={i} as={Link} {...s.link}
            to={`/portal/${this.type.charAt(0).toUpperCase()+this.type.substr(1)}/${card.gsx$name}`}
          >
            <span>{card.gsx$name}</span><br />
            <img className="thumb" src={API.base_image + card_data.gsx$thumb}></img>
          </Interactive>
        </div>
      );
    });

    return (<div className={`entry ${this.type}`}>
      <div className="top_content">
        <Route path={`${this.props.match.url}/:card`} component={this.props.component} />
      </div>
      <div className="cat_title">{this.type.charAt(0).toUpperCase()+this.type.substr(1)}</div>
      <div className="bottom_nav">{bottom_nav}</div>
    </div>);
  }
}
