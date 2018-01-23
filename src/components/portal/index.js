import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Link, Route} from 'react-router-dom';

import API from '../SpreadsheetData';
import Home from './Home';
import Search from './Search';
import Attacks from './Category/Attacks';
import Battlegear from './Category/Battlegear';
import Creatures from './Category/Creatures';
import Locations from './Category/Locations';
import Mugic from './Category/Mugic';
import Tribes from './Category/Tribes';

@inject((stores, props, context) => props) @observer
export default class Base extends React.Component {

  render() {
    return (
      <div className="portal">
        <link rel="stylesheet" href="/src/css/portal.css" />
        <Header />
        <br />
        <Routing {...this.props} />
      </div>
    );
  }
}

function Routing(props) {
  const match = props.match;

  const tribes = API.tribes.map((tribe, i) => (
    <Route key={i} path={`${match.url}/${tribe}`} component={Tribes} />
  ));
  return (
    <div>
      <Route exact path={match.url} component={Home} />
      <Route path={`${match.url}/Attacks`} component={Attacks} />
      <Route path={`${match.url}/Battlegear`} component={Battlegear} />
      <Route path={`${match.url}/Creatures`} component={Creatures} />
      <Route path={`${match.url}/Locations`} component={Locations} />
      <Route path={`${match.url}/Mugic`} component={Mugic} />
      {tribes}
    </div>
  );
}

function Header() {

  const types = (() => {
    return (
      <li className="dropdown">
        <Link to=" " className="dropbtn">Types</Link>
        <div className="dropdown-content">
          <Link to="/portal/Attacks">Attacks</Link>
          <Link to="/portal/Battlegear">Battlegear</Link>
          <Link to="/portal/Creatures">Creatures</Link>
          <Link to="/portal/Locations">Locations</Link>
          <Link to="/portal/Mugic">Mugic</Link>
        </div>
      </li>
    );
  })();

  const tribes = ["Danian", "Mipedian", "OverWorld", "UnderWorld"].map((tribe, i) => {
    return (
      <li key={i} className="dropdown">
        <Link to={"/portal/"+tribe} className="dropbtn">{tribe}</Link>
        <div className="dropdown-content">
          <Link to={"/portal/Creatures/"+tribe}> Creatures</Link>
          <Link to={"/portal/Mugic/"+tribe}> Mugic</Link>
        </div>
      </li>
    );
  });

  return (
    <div className="navbar">
      <ul>
        <li><Link to="/portal/">Home</Link></li>
        <li><Link to="javascript:void(0)"><Search /></Link></li>
        {types}
        <li className="dropdown">
          <Link to={"/portal/Generic"} className="dropbtn">Generic</Link>
          <div className="dropdown-content">
            <Link to={"/portal/Generic/Mugic"}>Mugic</Link>
          </div>
        </li>
        {tribes}
      </ul>
    </div>
  );
}
