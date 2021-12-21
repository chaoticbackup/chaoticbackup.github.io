import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import API from '../SpreadsheetData';
import RouteElement from '../RouteElement';

import Header from './Header';
import Home from './Home';
import Search from './Search';
import Category from './Category/Type';
import Tribes from './Category/Tribe';

import Attack from './Single/Attack';
import Battlegear from './Single/Battlegear';
import Creature from './Single/Creature';
import Location from './Single/Location';
import Mugic from './Single/Mugic';

import './portal.scss';

export default function Base () {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 220,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const tribes = API.tribes.map((tribe) => (
    <Route key={tribe} path={`${tribe}/*`} element={
      <RouteElement component={Tribes} />
    } />
  ));
  
  return (
    <div className="portal">
      <Header />
      <Routes>
        <Route path="/" element={
          <RouteElement component={Home} />
        }/>
        <Route path="Search" element={
          <RouteElement component={Search} />
        }/>
        <Route path="Attacks/*" element={
          <Category type="Attacks" component={<Attack />} {...({ location, navigate })} />
        } />
        <Route path="Battlegear/*" element={
          <Category type="Battlegear" component={<Battlegear />} {...({ location, navigate })} />
        }/>
        <Route path="Creatures/*" element={
          <Category type="Creatures" component={<Creature />} {...({ location, navigate })} />
        }/>
        <Route path="Locations/*" element={
          <Category type="Locations" component={<Location />} {...({ location, navigate })} />
        }/>
        <Route path="Mugic/*" element={
          <Category type="Mugic" component={<Mugic />} {...({ location, navigate })} />
        }/>
        {tribes}
      </Routes> 
    </div>
  );

}
