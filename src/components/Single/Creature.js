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
      // console.log(data);
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

    var creature = null;
    this.state.creatures.map((item, i) => {
      // console.log(item.title, path[4], item.title.$t == path[4]);
      if (item.title.$t == path[4]) creature = item;
    });

    if (creature == null) {
      return(<PageNotFound location={this.location}/>);
    }

    // const creature = this.state.creature.map((item, i) => {
    //   return (
    //     <div>{item.title.$t}</div>
    //   );
    // });

    return(
      <div className={"creature " + tribe.toLowerCase()}>
        <h1>{creature.gsx$name.$t}</h1>
        <img className="splash" src={API.image + creature.gsx$splash.$t}></img>
        <hr />
        <div>
          <strong>Appearance:</strong><br />
          {creature.gsx$appearance.$t}
        </div>
        <hr />
        <div>
          <strong>Background:</strong><br />
          {creature.gsx$background.$t}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {creature.gsx$details.$t}
        </div>
        <hr />
        <div>
          <strong>Favorite Battlegear(s):</strong><br />
          {creature.gsx$battlegear.$t}
        </div>
        <hr />
        <div>
          <strong>Favorite Location(s):</strong><br />
          {creature.gsx$location.$t}
        </div>
        <hr />
        <div>
          <strong>Height (ft):</strong><br />
          {creature.gsx$height.$t}
        </div>
        <hr />
        <div>
          <strong>Special Abilities:</strong><br />
          {creature.gsx$specialabilities.$t}
        </div>
        <hr />
        <div>
          <strong>Weight (lb):</strong><br />
          {creature.gsx$weight.$t}
        </div>
      </div>
    );
  }
}
