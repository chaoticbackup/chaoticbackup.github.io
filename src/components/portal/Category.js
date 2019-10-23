import React from 'react';
import Interactive from 'react-interactive';
import {Link, Route} from 'react-router-dom';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import s from '../../styles/app.style';
import API from '../SpreadsheetData';
import {Loading} from '../Snippets';

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
      API.LoadDB([{'cards': this.type}, {'portal': this.type}])
      .then(() => {
        this.loaded = true;
      });
      return (<Loading />);
    }

    const create_link = (card, data, i, url) => {
      // Prevent site from crashing due to misspelled/missing data
      if (!data) return (<div key={i}></div>);

      return (<div key={i} className="nav_item">
          <Interactive as={Link}
            to={url || `/portal/${this.props.type}/${card.gsx$name}`}
            {...s.link}
          >
            <span>{card.gsx$name.split(",")[0]}</span><br />
            <img className="thumb" src={API.base_image + data.gsx$thumb}></img>
          </Interactive>
      </div>);
    };

    let base_path = true;
    let cat_title = "";
    let top_content = (<div />);
    let bottom_nav = [];

    let path = this.props.location.pathname.split("/");
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
        API.portal[this.type].chain().find({'gsx$tribe': tribe}).simplesort('gsx$name').data()
        :
        API.portal[this.type].chain().simplesort('gsx$name').data()
      ).map((card_portal, i) => {
        let card_data = API.cards[this.type].findOne({'gsx$name': card_portal.gsx$name});
        let url = ((tribe) ?
          `/portal/${this.props.type}/${card_portal.gsx$tribe}/${encodeURIComponent(card_portal.gsx$name)}`
          :
          `/portal/${this.props.type}/${encodeURIComponent(card_portal.gsx$name)}`
        );
        return create_link(card_portal, card_data, i, url);
      });
    }
    else {
      if (path.length > 3) {
        base_path = false;
        top_content = (<Route path={`${this.props.match.url}/:card`} component={this.props.component} />);
      }

      cat_title = this.props.type;

      bottom_nav = API.portal[this.type].data
      .sort((a, b) => (a.gsx$name > b.gsx$name) ? 1 : -1)
      .map((card_portal, i) => {
        let card_data = API.cards[this.type].findOne({'gsx$name': card_portal.gsx$name});
        return create_link(card_portal, card_data, i);
      });
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
