import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
// import {browserHistory} from 'react-router';
import PageNotFound from '../PageNotFound';
import Tribes from '../Category/Tribes';
import UnderConstruction from '../UnderConstruction';
import API from '../Spreadsheet';
import s from '../../styles/app.style';

export default class SingleCreature extends React.Component {

  constructor(props) {
    super (props);
    this.location = props.location;
    this.url = '';
    this.creature = '';
    this.state = {creature: null, card_data: null};
  }

  componentDidMount() {
    var self = this;
    API.getSpreadsheet(this.url, function(data) {
      data.map((item, i) => {
        if (item.title.$t == self.creature) self.setState({creature: item });
      });
    });
    API.getSpreadsheet(API.Creatures_Card_Data, function(data) {
      data.map((item, i) => {
        if (item.title.$t == self.creature) self.setState({card_data: item });
      });
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
        this.url = API.Overworld_Creatures;
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

    // confusing, this.creature is a string for the api call,
    // creature is the object to be used in the jsx
    this.creature = path[4];
    var creature = this.state.creature;
    var card_data = this.state.card_data;

    // console.log(this.state.creature);
    if (creature == null || card_data == null) {
      return(<PageNotFound location={this.location}/>);
    }
    // console.log(this.state.card_data);

    const elements = card_data.gsx$elements.$t.split(/[ ,]+/).map((item, i) => {
      return <img className="icon" src={"/portal/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
    });

    const locations = creature.gsx$location.$t.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Locations/"+item}><span>{item}</span></Interactive></p>;
    });

    const battlegear = creature.gsx$battlegear.$t.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Battlegear/"+item}><span>{item}</span></Interactive></p>;
    });

    return(
      <div className={"creature " + tribe.toLowerCase()}>
        <h1>{creature.gsx$name.$t}</h1>
        <img className="splash" src={API.base_image + creature.gsx$splash.$t}></img>
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
          {battlegear}
        </div>
        <hr />
        <div>
          <strong>Favorite Location(s):</strong><br />
          {locations}
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
        <hr />
        <div>
          <strong>Card ID: </strong>
          {card_data.gsx$cardid.$t}
        </div>
        <hr />
        <div>
          <strong>Set: </strong>
          {card_data.gsx$set.$t}
        </div>
        <hr />
        <div>
          <strong>Rarity: </strong>
          {card_data.gsx$rarity.$t}
        </div>
        <hr />
        <div>
          <strong>Tribe: </strong>{tribe}
          <img className="icon" src={"/portal/src/img/icons/tribes/"+tribe.toLowerCase()+".png"}></img>
        </div>
        <hr />
        <div>
          <strong>Ability:</strong><br />
          {card_data.gsx$ability.$t}
        </div>
        <hr />
        <div>
          <strong>Courage: </strong>
          {card_data.gsx$courage.$t}
        </div>
        <hr />
        <div>
          <strong>Elements: </strong>{elements}
        </div>
        <hr />
        <div>
          <strong>Energy: </strong>
          {card_data.gsx$energy.$t}
        </div>
        <hr />
        <div>
          <strong>Flavortext:</strong><br />
          {card_data.gsx$flavortext.$t}
        </div>
        <hr />
        <div>
          <strong>Mugic Ability: </strong>
          {card_data.gsx$mugicability.$t}
        </div>
        <hr />
        <div>
          <strong>Power: </strong>
          {card_data.gsx$power.$t}
        </div>
        <hr />
        <div>
          <strong>Speed: </strong>
          {card_data.gsx$speed.$t}
        </div>
        <hr />
        <div>
          <strong>Wisdom: </strong>
          {card_data.gsx$wisdom.$t}
        </div>
      </div>
    );
  }
}
