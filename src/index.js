import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './Base';
import PageNotFound from './components/PageNotFound';
import UnderConstruction from './components/UnderConstruction';
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';

/* Home Page */
import Home from './components/Home';

/* Collection */
import CollectionHome from './components/collection/Home';

/* Portal */
import PortalHome from './components/portal/Home';
// import Attacks from './components/portal/Category/Attacks';
// import Battlegear from './components/portal/Category/Battlegear';
import Creatures from './components/portal/Category/Creatures';
// import Locations from './components/portal/Category/Locations';
import Mugic from './components/portal/Category/Mugic';
import Tribes from './components/portal/Category/Tribes';
// import SingleAttack from './components/portal/Category/Attacks';
// import SingleBattlegear from './components/portal/Category/Battlegear';
import SingleCreature from './components/portal/Single/Creature';
// import SingleLocation from './components/portal/Category/Locations';
// import SingleMugic from './components/portal/Category/Mugic';

const routes = (
  <Route path="/" component={App} mapMenuTitle="Home">
    <IndexRoute component={Home} />

    {/* Test */}
    <Route path="example" mapMenuTitle="Example" component={ExampleComponent}>
      <Route path="two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
    </Route>

    {/* Construction */}
    <Route path="construction/" component={UnderConstruction} />

    {/* Collection */}
    <Route path="collection/" mapMenuTitle="Collection">
      <IndexRoute component={CollectionHome} />
    </Route>

    {/* Portal */}
    <Route path="portal/" mapMenuTitle="Portal">
      <IndexRoute component={PortalHome} />

      {/* Attacks */}
      <Route path="Attacks" component={UnderConstruction} mapMenuTitle="Attacks">
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Battlegear */}
      <Route path="Battlegear" component={UnderConstruction} mapMenuTitle="Battlegear">
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Locations */}
      <Route path="Locations" component={UnderConstruction} mapMenuTitle="Locations">
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Creatures */}
      <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
        <Route path="Overworld" component={Tribes} mapMenuTitle="Overworld">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Underworld" component={Tribes} mapMenuTitle="Underworld">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mipedian" component={Tribes} mapMenuTitle="Mipedian">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Danian" component={Tribes} mapMenuTitle="Danian">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Marrillian" component={Tribes} mapMenuTitle="M'arrillian">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Generic" component={Tribes} mapMenuTitle="Generic">
          <Route path="*" component={SingleCreature} />
        </Route>
      </Route>

      {/* Mugic */}
      <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
        <Route path="Overworld" component={Tribes} mapMenuTitle="Overworld">
          <Route path="*" component={UnderConstruction} />
        </Route>
        <Route path="Underworld" component={Tribes} mapMenuTitle="Underworld">
          <Route path="*" component={UnderConstruction} />
        </Route>
        <Route path="Mipedian" component={Tribes} mapMenuTitle="Mipedian">
          <Route path="*" component={UnderConstruction} />
        </Route>
        <Route path="Danian" component={Tribes} mapMenuTitle="Danian">
          <Route path="*" component={UnderConstruction} />
        </Route>
        <Route path="Marrillian" component={Tribes} mapMenuTitle="M'arrillian">
          <Route path="*" component={UnderConstruction} />
        </Route>
        <Route path="Generic" component={Tribes} mapMenuTitle="Generic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Overworld */}
      <Route path="Overworld" component={Tribes} mapMenuTitle="Overworld">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Underworld */}
      <Route path="Underworld" component={Tribes} mapMenuTitle="Underworld">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Mipedian */}
      <Route path="Mipedian" component={Tribes} mapMenuTitle="Mipedian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Danian */}
      <Route path="Danian" component={Tribes} mapMenuTitle="Danian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* M'arrillian */}
      <Route path="Marrillian" component={Tribes} mapMenuTitle="Marrillian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Generic */}
      <Route path="Generic" component={Tribes} mapMenuTitle="Generic">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle="Mugic">
          <Route path="*" component={UnderConstruction} />
        </Route>
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
