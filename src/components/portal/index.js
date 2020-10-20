import React from 'react';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';

import API from '../SpreadsheetData';

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

@inject((stores, props, context) => props) @observer
export default class Base extends React.Component {

  componentDidUpdate() {
    window.scrollTo({
      top: 220,
      left: 0,
      behavior: 'smooth'
    });
  }

  render() {
    const { url } = this.props.match;

    return (
      <div className="portal">
        <Header />
        <>
          <Route exact path={url} component={Home} />
          <Route path={`${url}/Search`} component={Search} />
          <Route path={`${url}/Attacks`} render={(props) => <Category {...props} type="Attacks" component={Attack} />} />
          <Route path={`${url}/Battlegear`} render={(props) => <Category {...props} type="Battlegear" component={Battlegear} />} />
          <Route path={`${url}/Creatures`} render={(props) => <Category {...props} type="Creatures" component={Creature} />} />
          <Route path={`${url}/Locations`} render={(props) => <Category {...props} type="Locations" component={Location} />} />
          <Route path={`${url}/Mugic`} render={(props) => <Category {...props} type="Mugic" component={Mugic} />} />
          {API.tribes.map((tribe, i) => (<Route key={i} path={`${url}/${tribe}`} component={Tribes} />))}
        </> 
      </div>
    );
  }
}
