import React from 'react';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class Create extends React.Component {

  render() {
    return (<div>
      <span>This page is not yet available. Visit <a href="https://untap.in">untap.in</a> to build and play.</span>
    </div>);
  }

}

