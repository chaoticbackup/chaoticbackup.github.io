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
    console.log(props);
    this.url = '';
    this.state = {creatures: []};
  }

  componentDidMount() {
    if (this.props.children) return;

    var self = this;
    API.getSpreadsheet(this.url, function(data) {
      // self.setState({creatures: this.state.creatures.concat([data])});
      self.setState({creatures: data});
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
    let tribe = "";
    if ( path.length === 4)
    {
      tribe = path[2];
    }
    // Display all creatures
    else {
      return (<div><UnderConstruction location={this.props.location}/></div>);
    }

    switch (tribe) {
      case 'Overworld':
        this.url = API.Overworld_Creatures;
        break;
      case 'Underworld':
        this.url = API.Underworld_Creatures;
        break;
      case 'Mipedian':
        this.url = API.Mipedian_Creatures;
        break;
      case 'Danian':
        this.url = API.Danian_Creatures;
        break;
      case 'Marrillian':
        this.url = API.Marrillian_Creatures;
        break;
      case 'Generic':
        this.url = API.Generic_Creatures;
        break;
      default:
        return(<PageNotFound location={this.props.location}/>);
    }

    const creatures = this.state.creatures.map((creature, i) => {
      return (
        <div key={i}>
          <Interactive as="a" {...s.link} href={"Creatures/"+creature.gsx$name.$t}><span>{creature.gsx$name.$t}</span></Interactive>
        </div>
      );
    });

    return (
      <div>
        {creatures}
      </div>
    );
  }
}
