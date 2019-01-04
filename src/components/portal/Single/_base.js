import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class Single extends React.Component {

	render() {
		return (<div>
			<div className="splash">
			{this.props.image &&
			  <img src={API.base_image + this.props.image} />
			}
			</div>
			<div className="entry_text">
				{this.props.text}
			</div>
		</div>);
	}
}
