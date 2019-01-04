import React from 'react';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import API from '../../SpreadsheetData';

@inject((stores, props, context) => props) @observer
export default class Single extends React.Component {
	@observable fullscreen = false;

	expand(e) {
		this.fullscreen = true;
	}

	close(e) {
		this.fullscreen = false;
	}

	render() {
		return (<div>
			<div className={"modal" + (this.fullscreen?"":" hidden")}>
			  <span className="close" onClick={this.close.bind(this)}>&times;</span>
			  <img className="modal-content" src={API.base_image + this.props.image} />
			</div>
			<div className="splash">
			{this.props.image &&
			  <img onClick={this.expand.bind(this)} src={API.base_image + this.props.image} />
			}
			</div>
			<div className="entry_text">
				<span className="title">{this.props.name}</span>
				{this.props.text &&
					this.props.text
				}
			</div>
		</div>);
	}
}
