import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../PageNotFound';
import API from '../Spreadsheet';
import s from '../../styles/app.style';

export default class Creatures extends React.Component {

  constructor(props) {
    super (props);
    this.state = {tribe: '', creatures: {}};
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }

  componentDidMount() {
    this.getData(this.props);
  }

  // ** Process the tribe ** //
  // /collection/Creatures/
  // /collection/{Tribe}/Creatures/
  // The first / gets counted
  getData(props) {
    if (props.children) return this.props = props;
    let path = props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Set tribe
    let tribe = (path.length === 4) ? path[2] : "All";
    this.setState({tribe: tribe});

    // For each tribe, get its spreadsheet, set the state
    var self = this;
    let urls = (tribe == "All") ? API.Creatures : {[tribe]: API.Creatures[tribe]};
    Object.keys(urls).map((tribe) => {
      API.getSpreadsheet(urls[tribe], (data) => {
        self.setState({creatures:
          Object.assign(self.state.creatures, {[tribe]: data})
        });
      });
    });
    // self.setState({creatures: this.state.creatures.concat([data])});
  }

  hacks(event) {
    console.log(event);
    this.setState({click: true});
  }

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    var self = this;

    // If tribe
    if (this.state.tribe !== "All") {
      if (!(API.Creatures).hasOwnProperty(this.state.tribe)) {
        return(
          <PageNotFound location={this.props.location}/>
        );
      }
      else return (
        <div>{list_creatures(this.state.tribe)}</div>
      );
    }
    // No tribe specified
    // Display all creatures
    else {
      const creatures = Object.keys(this.state.creatures).map(function(tribe, i) {
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={"/collection/"+tribe}
            ><span style={s.title}>{tribe}</span></Interactive>
            {list_creatures(tribe, "Creatures/"+tribe+"/")}
            <hr />
          </div>
        );
      });
      return (<div>{creatures}</div>);
    }

    // Map creatures of the tribe
    function list_creatures(tribe, path="Creatures/") {
      if (!self.state.creatures[tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.creatures[tribe].map((creature, i) => {
        return (
          <div key={i}>
            <Interactive as={Link} {...s.link}
              to={path+creature.gsx$name.$t}
              onClick={self.hacks}
            ><span>{creature.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }
  }
}
