import React from 'react';

export default class Base extends React.Component {

	constructor(props) {
		super(props);
	}

	// This is a wraper function for preforming changes to game state
	// It preforms the change locally and propegates it higher
	// So that a network listener can reflect the change on the other client
	// Local changes only can simply use "makeChange"
	submitChange = (change) => {
		this.props.submitChange(change);
		this.makeChange(change);
	}

	makeChange = (change) => {
		throw ('override this method');
	}

}
