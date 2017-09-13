import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
// import {browserHistory} from 'react-router';
import PageNotFound from '../PageNotFound';
import UnderConstruction from '../UnderConstruction';
import API from '../Spreadsheet';
import s from '../../styles/app.style';

export default class SingleCreature extends React.Component {

  constructor(props) {
    super (props);
    this.tribe = '';
    this.creature = '';
    this.state = {creature: null, card_data: null};
  }

  componentDidMount() {
    var self = this;
    API.getSpreadsheet(API.Creatures[this.tribe], function(data) {
      data.map((item, i) => {
        if (item.title.$t == self.creature) self.setState({creature: item });
      });
      // If no creature set as false
      if (!self.state.creature) {
        self.setState({creature: "n/a"});
      }
    });
    API.getSpreadsheet(API.Creatures_Card_Data, function(data) {
      data.map((item, i) => {
        if (item.title.$t == self.creature) self.setState({card_data: item });
      });
      // If no card_data set as false
      if (!self.state.card_data) {
        self.setState({card_data: "n/a"});
      }
    });
  }

  render() {
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    // /portal/Creatures/{Tribe}/{Name}
    // /portal/{Tribe}/Creatures/{Name}
    // The first / gets counted
    if ( path.length !== 5 )
    {
      return(
        <PageNotFound location={this.props.location}/>
      );
      //return(browserHistory.push('/PageNotFound'));
    }

    //Handle both url layouts
    if (path[2] === "Creatures") this.tribe = path[3];
    if (path[3] === "Creatures") this.tribe = path[2];

    // Get spreadsheet data based on tribe/name
    if (!(API.Creatures).hasOwnProperty(this.tribe)) {
      return(
        <PageNotFound location={this.props.location}/>
      );
    }

    this.creature = path[4];
    // confusing, this.creature is a string for the api call,
    // creature is the object to be used in the jsx
    var creature = this.state.creature;
    var card_data = this.state.card_data;

    // TODO separate loading of card_data
    if (creature == "n/a") return(
      <PageNotFound location={this.props.location}/>
    );

    if (creature == null || card_data == null) return(
      <span>Loading...</span>
    );

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
      <div className={"creature " + this.tribe.toLowerCase()}>
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
          <strong>Tribe: </strong>{this.tribe}
          <img className="icon" src={"/portal/src/img/icons/tribes/"+this.tribe.toLowerCase()+".png"}></img>
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
