import React from 'react';
import URLS from '../Spreadsheet';

export default class Creatures extends React.Component {
  children;

  constructor(props) {
    super (props);
    console.log(props);
    this.children = props.children;
    this.state = {creatures: []}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
      {this.children||
        <div>creatures</div>
      }
      </div>
    );
  }
}
