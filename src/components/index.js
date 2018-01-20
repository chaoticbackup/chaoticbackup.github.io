import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Common Components */
import Base from './Base';
import {PageNotFound, UnderConstruction} from './Snippets';

/* Home Component */
import Home from './Home';
import EnterTheCode from './account/EnterTheCode';

render(
  <Router>
    <App />
  </Router>
  ,document.getElementById('root'),
);

function App() {
  return (
    <div>
      <Route path="/" component={Base}/>
    </div>
  );
}

export function Children(props) {
  console.log(props);
  const match = props.match;
  return (
    <div>
      <Route exact path={match.url} component={Home} />
      <Route path={`${match.url}EnterTheCode`} component={EnterTheCode} />
    </div>
  );
}
