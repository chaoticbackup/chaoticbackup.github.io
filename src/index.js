import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/* Common Components */
import App from './Base';
import PageNotFound from './components/PageNotFound';
import UnderConstruction from './components/UnderConstruction';

/* Home Component */
import Home from './components/Home';

/* Test Components */
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';

/* SpreadsheetData */
import API from './components/SpreadsheetData';

/* Collection */
import CollectionHome from './components/collection/Home';

/* Portal */
import PortalHome from './components/portal/Home';
import Attacks from './components/portal/Category/Attacks';
import SingleAttack from './components/portal/Category/Attacks';
import Battlegear from './components/portal/Category/Battlegear';
import SingleBattlegear from './components/portal/Category/Battlegear';
import Creatures from './components/portal/Category/Creatures';
import SingleCreature from './components/portal/Single/Creature';
import Locations from './components/portal/Category/Locations';
import SingleLocation from './components/portal/Category/Locations';
import Mugic from './components/portal/Category/Mugic';
import SingleMugic from './components/portal/Single/Mugic';
import Tribes from './components/portal/Category/Tribes';


const routes = (
  <Route path="/" component={App} mapMenuTitle="Home">
    <IndexRoute component={Home} />

    {/* Test */}
    <Route path="example" mapMenuTitle="Example" component={ExampleComponent}>
      <Route path="two-deep" mapMenuTitle="Two Deep" component={ExampleTwoDeepComponent} />
    </Route>

    {/* Construction */}
    <Route path="Construction" component={UnderConstruction} />

    {/* Collection */}
    <Route path="collection/" mapMenuTitle="Collection">
      <IndexRoute component={CollectionHome} />

      <Route path="*" component={PageNotFound} />
    </Route>

    {/* Portal */}
    <Route path="portal/" mapMenuTitle="Portal">
      <IndexRoute component={PortalHome} />

      {/* Attacks */}
      <Route path="Attacks" component={Attacks} mapMenuTitle="Attacks">
        <Route path="*" component={SingleAttack} />
      </Route>

      {/* Battlegear */}
      <Route path="Battlegear" component={Battlegear} mapMenuTitle="Battlegear">
        <Route path="*" component={SingleBattlegear} />
      </Route>

      {/* Locations */}
      <Route path="Locations" component={Locations} mapMenuTitle="Locations">
        <Route path="*" component={SingleLocation} />
      </Route>

      {/* Creatures */}
      {/* Todo this isn't needed (tribe checking handled by components) */}
      <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
        <Route path="OverWorld" component={Creatures} mapMenuTitle="OverWorld">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="UnderWorld" component={Creatures} mapMenuTitle="UnderWorld">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mipedian" component={Creatures} mapMenuTitle="Mipedian">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Danian" component={Creatures} mapMenuTitle="Danian">
          <Route path="*" component={SingleCreature} />
        </Route>
      </Route>

      {/* Mugic */}
      <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
        <Route path="OverWorld" component={Mugic} mapMenuTitle="OverWorld">
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="UnderWorld" component={Mugic} mapMenuTitle="UnderWorld">
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Mipedian" component={Mugic} mapMenuTitle="Mipedian">
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Danian" component={Mugic} mapMenuTitle="Danian">
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Generic" component={Mugic} mapMenuTitle="Generic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* OverWorld */}
      <Route path="OverWorld" component={Tribes} mapMenuTitle="OverWorld">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* UnderWorld */}
      <Route path="UnderWorld" component={Tribes} mapMenuTitle="UnderWorld">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Mipedian */}
      <Route path="Mipedian" component={Tribes} mapMenuTitle="Mipedian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Danian */}
      <Route path="Danian" component={Tribes} mapMenuTitle="Danian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* M'arrillian */}
      <Route path="Marrillian" component={Tribes} mapMenuTitle="Marrillian">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* Generic */}
      <Route path="Generic" component={Tribes} mapMenuTitle="Generic">
        <Route path="Creatures" component={Creatures} mapMenuTitle="Creatures">
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={Mugic} mapMenuTitle="Mugic">
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
