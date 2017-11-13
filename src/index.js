import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './Base';
import PageNotFound from './components/PageNotFound';
import UnderConstruction from './components/UnderConstruction';
import ExampleComponent from './components/ExampleComponent';
import ExampleTwoDeepComponent from './components/ExampleTwoDeepComponent';

/* SpreadsheetData */
import API from './components/SpreadsheetData';

/* Home Page */
import Home from './components/Home';

/* Collection */
import CollectionHome from './components/collection/Home';

/* Portal */
import PortalHome from './components/portal/Home';
// import Attacks from './components/portal/Category/Attacks';
// import SingleAttack from './components/portal/Category/Attacks';
// import Battlegear from './components/portal/Category/Battlegear';
// import SingleBattlegear from './components/portal/Category/Battlegear';
import Creatures from './components/portal/Category/Creatures';
import SingleCreature from './components/portal/Single/Creature';
// import Locations from './components/portal/Category/Locations';
// import SingleLocation from './components/portal/Category/Locations';
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
    <Route path="construction/" component={UnderConstruction} />

    {/* Collection */}
    <Route path="collection/" mapMenuTitle="Collection">
      <IndexRoute component={CollectionHome} />

      <Route path="*" component={PageNotFound} />
    </Route>

    {/* Portal */}
    <Route path="portal/" mapMenuTitle="Portal">
      <IndexRoute component={PortalHome} />

      {/* Attacks */}
      <Route path="Attacks" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Battlegear */}
      <Route path="Battlegear" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Locations */}
      <Route path="Locations" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="*" component={UnderConstruction} />
      </Route>

      {/* Creatures */}
      {/* Todo this isn't needed (tribe checking handled by components) */}
      <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="OverWorld" component={Creatures} mapMenuTitle={mapMenuTitle(location, 3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="UnderWorld" component={Creatures} mapMenuTitle={mapMenuTitle(location, 3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mipedian" component={Creatures} mapMenuTitle={mapMenuTitle(location, 3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Danian" component={Creatures} mapMenuTitle={mapMenuTitle(location, 3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
      </Route>

      {/* Mugic */}
      <Route path="Mugic" component={Mugic} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="OverWorld" component={Mugic} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="UnderWorld" component={Mugic} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Mipedian" component={Mugic} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Danian" component={Mugic} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleMugic} />
        </Route>
        <Route path="Generic" component={Mugic} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleMugic} />
        </Route>
      </Route>

      {/* OverWorld */}
      <Route path="OverWorld" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* UnderWorld */}
      <Route path="UnderWorld" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Mipedian */}
      <Route path="Mipedian" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Danian */}
      <Route path="Danian" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* M'arrillian */}
      <Route path="Marrillian" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      {/* Generic */}
      <Route path="Generic" component={Tribes} mapMenuTitle={mapMenuTitle(location,2)}>
        <Route path="Creatures" component={Creatures} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={SingleCreature} />
        </Route>
        <Route path="Mugic" component={UnderConstruction} mapMenuTitle={mapMenuTitle(location,3)}>
          <Route path="*" component={UnderConstruction} />
        </Route>
      </Route>

      <Route path="*" component={PageNotFound} />

    </Route>
    <Route path="*" component={PageNotFound} />
  </Route>
);

function mapMenuTitle(location, depth=1) {
  let path = location.pathname.split("/");
  if (path[path.length-1] == "") path.pop(); // Remove trailing backslash
  return path[depth];
}

render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root'),
);
