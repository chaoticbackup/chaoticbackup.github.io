import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/* Common Components */
import App from './Base';
import {PageNotFound, UnderConstruction} from './Snippets';

/* Home Component */
import Home from './Home';
import EnterTheCode from './account/EnterTheCode';

/* Test Components */
import ExampleHome from './example/Home';
import ExampleBase from './example/Base';
import ExampleComponent from './example/ExampleComponent';
import ExampleTwoDeepComponent from './example/ExampleTwoDeepComponent';

/* Collection */
import CollectionHome from './collection/Home';

/* Portal */
import PortalBase from './portal/Base';
import PortalHome from './portal/Home';
import Attacks from './portal/Category/Attacks';
import SingleAttack from './portal/Single/Attack';
import Battlegear from './portal/Category/Battlegear';
import SingleBattlegear from './portal/Single/Battlegear';
import Creatures from './portal/Category/Creatures';
import SingleCreature from './portal/Single/Creature';
import Locations from './portal/Category/Locations';
import SingleLocation from './portal/Single/Location';
import Mugic from './portal/Category/Mugic';
import SingleMugic from './portal/Single/Mugic';
import Tribes from './portal/Category/Tribes';


const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />

    {/* Test */}
    <Route path="example" mapMenuTitle="Example" component={ExampleBase}>
      <IndexRoute component={ExampleComponent} />
      <Route path="two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
    </Route>

    {/* Construction */}
    <Route path="Construction" component={UnderConstruction} />

    {/* EnterTheCode */}
    <Route path="EnterTheCode" component={EnterTheCode} />

    {/* Collection */}
    <Route path="collection">
      <IndexRoute component={CollectionHome} />
      <Route path="*" component={CollectionHome} />
    </Route>

    {/* Portal */}
    <Route path="portal" component={PortalBase} >
      <IndexRoute component={PortalHome} />

      {/* Attacks */}
      <Route path="Attacks" component={Attacks} >
        <Route path="*" component={SingleAttack} />
      </Route>

      {/* Battlegear */}
      <Route path="Battlegear" component={Battlegear} >
        <Route path="*" component={SingleBattlegear} />
      </Route>

      {/* Locations */}
      <Route path="Locations" component={Locations} >
        <Route path="*" component={SingleLocation} />
      </Route>

      {/* Creatures */}
      {/* Todo this isn't needed (tribe checking handled by components) */}
      <Route path="Creatures" >
        <IndexRoute component={Creatures} />
        <Route path="OverWorld" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="UnderWorld" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mipedian" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Danian" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
      </Route>

      {/* Mugic */}
      <Route path="Mugic">
        <IndexRoute component={Mugic} />
        <Route path="OverWorld" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="UnderWorld" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Mipedian" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Danian" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Generic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* OverWorld */}
      <Route path="OverWorld" component={Tribes} >
        <Route path="Creatures" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* UnderWorld */}
      <Route path="UnderWorld" component={Tribes} >
        <Route path="Creatures" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Mipedian */}
      <Route path="Mipedian" component={Tribes} >
        <Route path="Creatures" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Danian */}
      <Route path="Danian" component={Tribes} >
        <Route path="Creatures" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Generic */}
      <Route path="Generic" component={Tribes} >
        <Route path="Creatures" component={Creatures} >
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} >
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      <Route path="*" component={PageNotFound} />

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
