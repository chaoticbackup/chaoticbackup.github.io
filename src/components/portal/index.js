import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Link, Route} from 'react-router-dom';

import API from '../SpreadsheetData';
import Home from './Home';
import Search from './Search';
import {SearchButton} from '../Snippets';

import Category from './Category';
import Tribes from './Tribes';

import Attack from './Single/Attack';
import Battlegear from './Single/Battlegear';
import Creature from './Single/Creature';
import Location from './Single/Location';
import Mugic from './Single/Mugic';

import '../../scss/portal.scss';

@inject((stores, props, context) => props) @observer
export default class Base extends React.Component {

  render() {
    return (
      <div className="portal">
        <Header />
        <br />
        <Routing {...this.props} />
      </div>
    );
  }
}

function Routing(props) {
  const url = props.match.url;

  return (
    <div>
      <Route exact path={url} component={Home} />
      <Route path={`${url}/Attacks`} render={(props) => <Category {...props} type="Attacks" component={Attack} />} />
      <Route path={`${url}/Battlegear`} render={(props) => <Category {...props} type="Battlegear" component={Battlegear} />} />
      <Route path={`${url}/Creatures`} render={(props) => <Category {...props} type="Creatures" component={Creature} />} />
      <Route path={`${url}/Locations`} render={(props) => <Category {...props} type="Locations" component={Location} />} />
      <Route path={`${url}/Mugic`} render={(props) => <Category {...props} type="Mugic" component={Mugic} />} />
      {API.tribes.map((tribe, i) => (
      <Route key={i} path={`${url}/${tribe}`} component={Tribes} />
      ))}
      <Route path={`${url}/Search`} component={Search} />
    </div>
  );
}

function voidClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

function Header() {

  const types = (() => {
    return (
      <li className="dropdown">
        <Link to=" " onClick={voidClick} className="dropbtn">Types</Link>
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

  const tribes = API.tribes.map((tribe, i) => {
    return (
      <li key={i} className="dropdown">
        <Link to=" " className="dropbtn" onClick={voidClick}>{tribe}</Link>
        <div className="dropdown-content">
          <Link to={"/portal/"+tribe}>All</Link>
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
        <li><Link to="/portal/Search"><SearchButton />Search</Link></li>
        {types}
        <li className="dropdown">
          <Link to=" " onClick={voidClick} className="dropbtn">Generic</Link>
          <div className="dropdown-content">
            <Link to={"/portal/Generic/Mugic"}>Mugic</Link>
          </div>
        </li>
        {tribes}
      </ul>
    </div>
  );
}

