import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import loadable from '@loadable/component';
import windowWidth from './windowWidth';
import Desktop from './desktop';
import Mobile from './mobile';
import s from './app.style';


/* Components */
import {Loading} from './Snippets';
import Create from './create/index';

const EnterTheCode = loadable(
  () => import('./entercode'), 
  {fallback: <Loading />}
);

const Home = loadable(
  () => import('./home'),
  {fallback: <Loading />}
);

const Portal = loadable(
  () => import('./portal'),
  {fallback: <Loading />}
);

const Collection = loadable(
  () => import('./collection'),
  {fallback: <Loading />}
);

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/EnterTheCode" component={EnterTheCode} />
      <Route path="/create" component={Create} />
      <Route path="/collection" component={Collection} />
      <Route path="/portal" component={Portal} />
    </Switch>
  );
}

function Base() {
  if (windowWidth() < 975) {
    return (<Mobile routing={Routing} />);
  }
  return (<Desktop routing={Routing} />);
}

render(
  <Router><Base path="/*" href="/" /></Router>,
  document.getElementById('root'),
);