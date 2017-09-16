import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import UnderConstruction from '../UnderConstruction';
import PageNotFound from '../PageNotFound';
import API from '../Spreadsheet';
import s from '../../styles/app.style';

export default class Creatures extends React.Component {

  constructor(props) {
    super (props);
    this.tribe = '';
    this.state = {creatures: {}};
  }

  componentDidMount() {
    if (this.props.children) return;
    var self = this;
    let urls = (this.tribe == "All") ? API.Creatures : {[this.tribe]: API.Creatures[this.tribe]};
    // For each tribe, get its spreadsheet, set the state
    Object.keys(urls).map((tribe) => {
      API.getSpreadsheet(urls[tribe], function(data) {
        self.setState({creatures: Object.assign(self.state.creatures, {[tribe]: data})});
      });
    });
    // self.setState({creatures: this.state.creatures.concat([data])});
  }

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    // /portal/Creatures/
    // /portal/{Tribe}/Creatures/
    // The first / gets counted
    var self = this;
    if ( path.length === 4) {
      this.tribe = path[2];

      if (!(API.Creatures).hasOwnProperty(this.tribe)) {
        return(
          <PageNotFound location={this.props.location}/>
        );
      }
      else return (
        <div>{list_creatures(this.tribe)}</div>
      );
    }
    // No tribe specified
    // Display all creatures
    else {
      this.tribe = "All";
      const creatures = Object.keys(this.state.creatures).map(function(tribe, i) {
        return (
          <div key={i}>
            <span>{tribe}</span>
            {list_creatures(tribe)}
            <hr />
          </div>
        );
      });
      return (<div>{creatures}</div>);
    }

    // Map creatures of the tribe
    function list_creatures(tribe) {
      if (!self.state.creatures[tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.creatures[tribe].map((creature, i) => {
        return (
          <div key={i}>
            <Interactive as="a" {...s.link} href={"Creatures/"+creature.gsx$name.$t}><span>{creature.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }

  }
}
