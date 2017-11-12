import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import UnderConstruction from '../../UnderConstruction';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';

export default class Mugic extends React.Component {

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    return (
      <UnderConstruction location={this.props.location}/>
    );
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
