import React from 'react';
import { Link } from 'react-router-dom';

import API from '../SpreadsheetData';
import { SearchButton } from '../Snippets';
  
export default function Header() {

  function voidClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
    
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
        <li>
          <Link to="/portal/">Home</Link>
        </li>
        <li>
          <Link to="/portal/Search"><SearchButton />Search</Link>
        </li>
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
        {tribes}
      </ul>
    </div>
  );
}
