import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import PageNotFound from '../../PageNotFound';
import UnderConstruction from '../../UnderConstruction';

@inject((stores, props, context) => props) @observer
export default class SingleLocation extends React.Component {

	render() {
		return (<UnderConstruction location={this.props.location}/>);
	}
}
