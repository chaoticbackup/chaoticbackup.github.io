import React from 'react';
import URLS from '../Spreadsheet';
import UnderConstruction from '../UnderConstruction';

export default class Creatures extends React.Component {

  constructor(props) {
    super (props);
    console.log(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      {this.props.children||
        <UnderConstruction location={this.props.location}/>
      }
      </div>
    );
  }
}
