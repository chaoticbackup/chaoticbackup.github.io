import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import UnderConstruction from '../../UnderConstruction';

@inject((stores, props, context) => props) @observer
export default class SingleCreature extends React.Component {

  render() {
    return (
      <UnderConstruction location={this.props.location}/>
    );
  }
}
