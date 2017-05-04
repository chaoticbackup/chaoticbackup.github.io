import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import UnderConstruction from './components/UnderConstruction';
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';

// import Attacks from './component/Category/Attacks';
// import Battlegear from './component/Category/Battlegear';
import Creatures from './components/Category/Creatures';
// import Locations from './component/Category/Locations';
// import Mugic from './component/Category/Mugic';
import Tribes from './components/Category/Tribes';
// import SingleAttack from './component/Category/Attacks';
// import SingleBattlegear from './component/Category/Battlegear';
import SingleCreature from './components/Single/Creature';
// import SingleLocation from './component/Category/Locations';
// import SingleMugic from './component/Category/Mugic';

const routes = (
  <Route path="/" component={App}>
    <Route path="portal/" mapMenuTitle="Home">
      <IndexRoute component={Home} />

      <Route path="example" mapMenuTitle="Example" component={ExampleComponent}>
        <Route path="two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
      </Route>

      <Route path="Attacks" component={UnderConstruction}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      <Route path="Battlegear" component={UnderConstruction}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      <Route path="Creatures" component={Creatures}>
        <Route path="*" component={SingleCreature} />
      </Route>

      <Route path="Locations" component={UnderConstruction}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      <Route path="Mugic" component={UnderConstruction}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      <Route path="Overworld" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

      <Route path="Underworld" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

      <Route path="Mipedian" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

      <Route path="Danian" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

      <Route path="Marrillian" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

      <Route path="Generic" component={Tribes}>
        <Route path="Creatures" component={SingleCreature} />
        <Route path="Mugic" component={UnderConstruction} />
      </Route>

    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root'),
);
