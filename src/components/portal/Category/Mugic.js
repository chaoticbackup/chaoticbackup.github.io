import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import UnderConstruction from '../../UnderConstruction';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Mugic extends React.Component {

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    let tribe = (() => {
      if (path.length !== 4) return "None";
      if (path[2] === "Mugic") return path[3];
      if (path[3] === "Mugic") return path[2];
    })();

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    // If there isn't a supported tribe,
    // Displays list of tribes
    if (!store.urls.Mugic.hasOwnProperty(tribe)) {
      return(
        <div>
          <Interactive as={Link} {...s.link}
            to="/portal/Mugic/Generic"
            >Generic</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Mugic/Danian"
          >Danian</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Mugic/OverWorld"
          >OverWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Mugic/UnderWorld"
          >UnderWorld</Interactive>
          <br />
          <Interactive as={Link} {...s.link}
            to="/portal/Mugic/Mipedian"
          >Mipedian</Interactive>
        </div>
      );
    }

    if (!store.cards.built.includes("mugic_Cards")) {
      store.cards.setupMugic("Cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("mugic_"+tribe)) {
      store.portal.setupMugic(tribe);
      return (<span>Loading...</span>);
    }

    const mugic = store.portal.mugic.find({'gsx$tribe': tribe});
    const output = mugic.map((single_mugic, i) => {
      const card_data = store.cards.mugic.findOne({'gsx$name': single_mugic.gsx$name});
      return (
        <div key={i}>
          <Interactive as={Link} {...s.link}
            to={'/portal/Mugic/'+tribe+'/'+single_mugic.gsx$name}
          >
            <span>{single_mugic.gsx$name}</span><br />
            {/* TODO <img className="thumb" src={store.base_image + card_data.gsx$thumb}></img> */}
          </Interactive>
        </div>
      );
    });

    return (<div>{output}</div>);
  }

  fakerender() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    // /portal/Mugic/
    // /portal/{Tribe}/Mugic/
    // The first / gets counted

    return (
      <UnderConstruction location={this.props.location}/>
    );

    // Map creatures of the tribe
    function list_Mugic(tribe) {
      if (!self.state.Mugic[tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.Mugic[tribe].map((mugic, i) => {
        return (
          <div key={i}>
            <Interactive as="a" {...s.link} href={"Mugic/"+mugic.gsx$name.$t}><span>{mugic.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }
  }
}
