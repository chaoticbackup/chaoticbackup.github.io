import React from 'react';
import { Route, Link } from 'react-router-dom';

/* Components */
import {PageNotFound, UnderConstruction} from './Snippets';
import EnterTheCode from './account/EnterTheCode';
import Collection from './collection/index';
import Portal from './portal/index';

export function Routing(props) {
  return (
    <div>
      <Route exact path={props.match.url} component={Home} />
      <Route path="/PageNotFound" component={PageNotFound} />
      <Route path="/UnderConstruction" component={UnderConstruction} />
      <Route path="/EnterTheCode" component={EnterTheCode} />
      <Route path="/collection" component={Collection} />
      <Route path="/portal" component={Portal} />
    </div>
  );
}

function Home() {
  return (
    <div>
      <link rel="stylesheet" href="/src/css/with_love.css" />
      <br />
      <div className="with-love">
        Welcome to the <a href="https://github.com/chaoticbackup" className="name" target="_blank">Chaotic Backup Project</a>.
        <br />
        Built by fans for fans.
        <br /><br />
        Made with <span className="heart">♥</span> by
        <br />Danude Sandstorm
        <br />Chiodosin1
      </div>
      <br />
    </div>
  );
}
