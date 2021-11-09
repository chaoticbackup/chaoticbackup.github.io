import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import useCheckMobileScreen from './_hooks/useCheckMobileScreen';
import { PageNotFound, UnderConstruction, Loading } from './Snippets';
import Create from './create';
import Base from './BaseStylesWrapper';

const EnterTheCode = loadable(
  () => import('./entercode'), 
  { fallback: <Loading /> }
);
  
const Home = loadable(
  () => import('./home'),
  { fallback: <Loading /> }
);
  
const Portal = loadable(
  () => import('./portal'),
  { fallback: <Loading /> }
);
  
const Collection = loadable(
  () => import('./collection'),
  { fallback: <Loading /> }
);

const MobileCollection = loadable(
  () => import('./_mobile/collection'),
  { fallback: <Loading /> }
);

export default function App() {
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    if (isMobile) {
      document.styleSheets[0].disabled = true;
    } else {
      document.styleSheets[0].disabled = false;
    }
  }, [isMobile]);

  return (
    <Router>
      <Switch>
        <Route path="/beta/collection" component={Collection} />
        <Route path="/beta">
          {({ location }) => <Redirect to={location.pathname.replace("/beta", "")} /> }
        </Route>
        {isMobile && <Route path="/collection" component={MobileCollection} />}
        {/* Normal Routes */}
        <Base>
          <Route exact path="/" component={Home} />
          <Route path="/PageNotFound" component={PageNotFound} />
          <Route path="/UnderConstruction" component={UnderConstruction} />
          <Route path="/EnterTheCode" component={EnterTheCode} />
          <Route path="/create" component={Create} />
          <Route path="/collection" component={Collection} />
          <Route path="/portal" component={Portal} />
        </Base>
      </Switch>
    </Router>
  );
}

