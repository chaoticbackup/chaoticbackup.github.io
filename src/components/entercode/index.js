import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
import EnterTheCode from './EnterTheCode';
import PackSimulator from './PackSimulator';

@inject((stores, props, context) => props) @observer
export default class Base extends React.Component {

  render() {
    return (<Routing {...this.props} />);
  }

}

function Routing(props) {
  const { match } = props;
  return (
    <div className="pack">
      <Route exact path={match.url} component={EnterTheCode} />
      <Route path={`${match.url}/PackSimulator`} component={PackSimulator} />
    </div>
  );
}
