import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import EnterTheCode from './EnterTheCode';
import PackSimulator from './PackSimulator';
import './packs.scss';

@inject((stores, props, context) => props) @observer
export default class Base extends React.Component {

  render() {
    const { match } = this.props;

    return (    
      <div>
        <Switch>
          <Route exact path={match.url} component={EnterTheCode} />
          <Route path={`${match.url}/PackSimulator`} component={PackSimulator} />
        </Switch>
      </div>
    );
  }

}
