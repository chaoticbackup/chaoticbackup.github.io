import React from 'react';
import { Route } from 'react-router-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import API from '../../SpreadsheetData';
import { Loading } from '../../Snippets';
import { sortCardName, thumb_link } from './common';

@inject((stores, props, context) => props) @observer
export default class Category extends React.Component {
  @observable loaded = false;

  constructor(props) {
    super(props);
    this.type = props.type.toLowerCase();
  }

  scrollLeft(amount) {
    document.getElementsByClassName('bottom_nav')[0].scrollLeft = (amount);
  }

  render() {
    if (this.loaded == false) {
      API.LoadDB([{ 'cards': this.type }, { 'portal': this.type }])
      .then(() => {
        this.loaded = true;
      })
      .catch(() => {});
      return (<Loading />);
    }

    let base_path = true;
    let cat_title = "";
    let top_content = (<div />);
    let bottom_nav = [];

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    if (this.type == "creatures" || this.type == "mugic") {
      // /portal/Creatures/
      // /portal/Creatures/{Tribe}
      // The first / gets counted

      const tribe = (() => {
        if (path.length >= 4 && API.tribes.includes(path[3])) return path[3];
        else return null;
      })();

      if (tribe) {
        if (path.length > 4) {
          base_path = false;
          top_content = <Route path={`${this.props.match.url}/${tribe}/:card`} component={this.props.component} />;
        }
      }
      else {
        if (path.length > 3) {
          base_path = false;
          top_content = <Route path={`${this.props.match.url}/:card`} component={this.props.component} />;
        }
      }

      cat_title = ((tribe) ?
        `${tribe} ${this.props.type}`
        :
        this.props.type
      );

      bottom_nav = ((tribe) ?
        API.portal[this.type].chain().find({ 'gsx$tribe': tribe }).data()
        :
        API.portal[this.type].chain().data()
      )
      .sort(sortCardName)
      .map((card_portal, i) => {
        const url = ((tribe) ?
          `/portal/${this.props.type}/${card_portal.gsx$tribe}/${encodeURIComponent(card_portal.gsx$name)}`
          :
          `/portal/${this.props.type}/${encodeURIComponent(card_portal.gsx$name)}`
        );
        return thumb_link(card_portal, i, url);
      });
    }
    else {
      if (path.length > 3) {
        base_path = false;
        top_content = (<Route path={`${this.props.match.url}/:card`} component={this.props.component} />);
      }

      cat_title = this.props.type;

      bottom_nav = API.portal[this.type].data
      .sort(sortCardName)
      .map((val, i) => thumb_link(val, i));
    }

    if (base_path) {
      return (
        <div className={`entry ${this.type} base_path`}>
          <div className="cat_title">{cat_title}</div>
          <div className="entry_nav">{bottom_nav}</div>
        </div>
      );
    }

    return (
      <div className={`entry ${this.type}`}>
        <div className="entry_content">{top_content}</div>
        <div className="cat_title">{cat_title}</div>
        <div className="entry_nav">{bottom_nav}</div>
      </div>
    );
  }
}
