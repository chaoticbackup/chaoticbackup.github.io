import React from 'react';
import {observer, inject} from 'mobx-react';
import {Route} from 'react-router-dom';
import EnterTheCode from './EnterTheCode';

@inject((stores, props, context) => props) @observer
export default class Home extends React.Component {

  render() {
    <div>
      <Routing {...this.props} />
    </div>
  }

}

function Routing(props) {
  const match = props.match;

  return (
    <div>
      <Route exact path={match.url} component={EnterTheCode} />
      <Route path={`${match.url}/PackSimulator`} component={PackSimulator} />
    </div>
  );
}
