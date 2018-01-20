import React from 'react';
import { Route } from 'react-router-dom';

import {PageNotFound, UnderConstruction} from './Snippets';
import Home from './Home';
import EnterTheCode from './account/EnterTheCode';

export function Routing(props) {
  console.log(props);
  const match = props.match;
  return (
    <div>
      <Route exact path={match.url} component={Home} />
      <Route path={`${match.url}EnterTheCode`} component={EnterTheCode} />
      <Route path="/PageNotFound" component={PageNotFound} />
      <Route path="/UnderConstruction" component={UnderConstruction} />
    </div>
  );
}
