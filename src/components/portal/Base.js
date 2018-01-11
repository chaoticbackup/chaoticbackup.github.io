import React from 'react';
import PropTypes from 'prop-types';
import s from '../../styles/app.style';
import Interactive from 'react-interactive';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router';
import Search from './Search';

@inject((stores, props, context) => props) @observer
export default class PortalBase extends React.Component {

  render() {
    return (
      <div className="portal">
        <link rel="stylesheet" href="/src/css/portal.css" />
        <Header />
        <br />
        {this.props.children}
      </div>
    );
  }
}

function Header(props) {

  const types = (() => {
    return (
      <li className="dropdown">
        <Link to="javascript:void(0)" className="dropbtn">Types</Link>
        <div className="dropdown-content">
          <Link to="/portal/Attacks">Attacks</Link>
          <Link to="/portal/Battlegear">Battlegear</Link>
          <Link to="/portal/Creatures">Creatures</Link>
          <Link to="/portal/Mugic">Mugic</Link>
          <Link to="/portal/Locations">Locations</Link>
        </div>
      </li>
    );
  })();

  const tribes = ["Danian", "Mipedian", "OverWorld", "UnderWorld"].map((tribe, i) => {
    return (
      <li key={i} className="dropdown">
        <Link to={"/portal/"+tribe} className="dropbtn">{tribe}</Link>
        <div className="dropdown-content">
          <Link to={"/portal/"+tribe+"/Creatures"}> Creatures</Link>
          <Link to={"/portal/"+tribe+"/Mugic"}> Mugic</Link>
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
        {tribes}
        <li className="dropdown">
          <Link to={"/portal/Generic"} className="dropbtn">Generic</Link>
          <div className="dropdown-content">
            <Link to={"/portal/Generic/Mugic"}>Mugic</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
