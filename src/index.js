import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';

// import Attacks from './component/Category/Attacks';
// import Battlegear from './component/Category/Battlegear';
import Creatures from './components/Category/Creatures';
// import Locations from './component/Category/Locations';
// import Mugic from './component/Category/Mugic';

// import Attacks from './component/Category/Attacks';
// import Battlegear from './component/Category/Battlegear';
import SingleCreature from './components/Single/Creature';
// import Locations from './component/Category/Locations';
// import Mugic from './component/Category/Mugic';

const routes = (
  <Route path="/" component={App}>
    <Route path="portal/" mapMenuTitle="Home">
      <IndexRoute component={Home} />

      <Route path="example" mapMenuTitle="Example" component={ExampleComponent}>
        <Route path="two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
      </Route>

      <Route path="Attacks" component={PageNotFound}>
        <Route path="*" component={PageNotFound} />
      </Route>

      <Route path="Battlegear" component={PageNotFound}>
        <Route path="*" component={PageNotFound} />
      </Route>

      <Route path="Creatures" component={Creatures}>
        <Route path="*" component={SingleCreature} />
      </Route>

      <Route path="Locations" component={PageNotFound}>
        <Route path="*" component={PageNotFound} />
      </Route>

      <Route path="Mugic" component={PageNotFound}>
        <Route path="*" component={PageNotFound} />
      </Route>

    </Route>
    <Route path="*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root'),
);
