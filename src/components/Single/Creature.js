import React from 'react';
// import {browserHistory} from 'react-router';
import PageNotFound from '../PageNotFound';
import Tribes from '../Category/Tribes';
import UnderConstruction from '../UnderConstruction';
import API from '../Spreadsheet';


export default class SingleCreature extends React.Component {

  constructor(props) {
    super (props);
    this.location = props.location;
    this.url = '';
    this.state = {creatures: []}
  }

  componentDidMount() {
    var self = this;
    API.getSpreadsheet(this.url, function(data) {
      console.log(data);
      self.setState({creatures: data });
    });
  }

  render() {
    let path = this.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    // /portal/Creatures/{Tribe}/{Name}
    // /portal/{Tribe}/Creatures/{Name}
    // The first / gets counted
    if ( path.length !== 5 )
    {
      return(<PageNotFound location={this.location}/>);
      //return(browserHistory.push('/PageNotFound'));
    }

    let tribe = "";
    // return (<div className={Tribe}>test</div>);

    //Handle both url layouts
    if (path[2] === "Creatures") tribe = path[3];
    if (path[3] === "Creatures") tribe = path[2];

    // Get spreadsheet data based on tribe/name
    switch (tribe) {
      case 'Overworld':
        this.url = API.Creature_Overworld;
        break;
      case 'Underworld':
      case 'Mipedian':
      case 'Danian':
      case 'Marrillian':
      case 'Generic':
        break;
      default:
        return(<PageNotFound location={this.location}/>);
    }

    // TODO
    var creature = null;
    this.state.creatures.map((item, i) => {
      // console.log(item.title, path[4], item.title.$t == path[4]);
      if (item.title.$t == path[4]) creature = item;
    });

    if (creature == null) {
      return(<PageNotFound location={this.location}/>);
    }

    return(
      <div className={"creature " + tribe.toLowerCase()}>
        <UnderConstruction location={this.location}/>
        {creature.gsx$name.$t}
        <img className="splash" src={API.image + creature.gsx$splash.$t}></img>
        <p>{creature.gsx$appearance.$t}</p>
        <p>{creature.gsx$background.$t}</p>
        <p>{creature.gsx$details.$t}</p>
        <p>{creature.gsx$favoritebattlegear.$t}</p>
        <p>{creature.gsx$favoritelocation.$t}</p>
        <p>{creature.gsx$heightfeetinch.$t}</p>
        <p>{creature.gsx$specialabilities.$t}</p>
        <p>{creature.gsx$weightpounds.$t}</p>
      </div>
    );
  }
}

// const creature = this.state.creature.map((item, i) => {
//   return (
//     <div>{item.title.$t}</div>
//   );
// });
