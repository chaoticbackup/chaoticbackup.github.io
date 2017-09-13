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
    API.getSpreadsheet(API.Creatures[this.tribe], function(data) {
      // self.setState({creatures: this.state.creatures.concat([data])});
      self.setState({creatures: Object.assign(self.state.creatures, {[self.tribe]: data})});
    });
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
      return (<div><UnderConstruction location={this.props.location}/></div>);
    }

    // Map creatures of the tribe
    function list_creatures(tribe) {
      if (!self.state.creatures[self.tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.creatures[self.tribe].map((creature, i) => {
        return (
          <div key={i}>
            <Interactive as="a" {...s.link} href={"Creatures/"+creature.gsx$name.$t}><span>{creature.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }

  }
}
