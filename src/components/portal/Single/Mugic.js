import React from 'react';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import { observer, inject } from 'mobx-react';
import Single from './_base';
import { PageNotFound, Mugic, Tribe } from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleMugic extends React.Component {

  // ** Process the tribe ** //
  // /portal/Mugic/{Tribe}/{Name}
  // /portal/{Tribe}/Mugic/{Name}
  // The first / gets counted
  render() {

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    const name = (() => {
      if (path.length >= 5) return decodeURIComponent(path[4]);
      if (path.length == 4) return decodeURIComponent(path[3]);
    })();

    const mugic = API.portal.mugic.findOne({ 'gsx$name': name });
    const card_data = API.cards.mugic.findOne({ 'gsx$name': name });

    const cost = (tribe) => {
      const cost = [];
      if (card_data.gsx$cost == 0) {
        cost.push(<span key={0}>0</span>);
      }
      else if (card_data.gsx$cost.toLowerCase() == 'x') {
        cost.push(<span key={0}>X</span>);
      }
      else {
        for (let i = 0; i < parseInt(card_data.gsx$cost); i++) {
          cost.push(<Mugic tribe={tribe} key={i} />);
        }
      }
      return cost;
    };

    if (mugic) {
      const tribe = mugic.gsx$tribe;

      return (<Single 
        card={card_data}
        col0={<>
          <div>
            <strong>Tribe: </strong>
            <Tribe tribe={tribe} />&nbsp;
            {tribe}
          </div>
          {card_data.gsx$cost !== "" && (<>
            <hr />
            <div>
              <strong>Cost: </strong>
              {cost(tribe)}
            </div>
          </>)}
        </>}
        col2={<>
          {mugic.gsx$background && (
            <div>
              <strong>Background:</strong><br />
              {mugic.gsx$background}
            </div>
          )}
          {(mugic.gsx$background && mugic.gsx$details) && <hr />}
          {mugic.gsx$details && (
            <div>
              <strong>Details:</strong><br />
              {mugic.gsx$details}
            </div>
          )}
        </>}
      />);
    }
    else if (card_data) {
      if (API.hasFullart(card_data)) {
        const tribe = card_data.gsx$tribe;

        return (<Single 
          card={card_data}
          col0={<>
            <div>
              <strong>Tribe: </strong>
              <Tribe tribe={tribe} />&nbsp;
              {tribe}
            </div>
            {card_data.gsx$cost !== "" && (<>
              <hr />
              <div>
                <strong>Cost: </strong>
                {cost(tribe)}
              </div>
            </>)}
          </>}
        />);
      }
    }
    
    return (<PageNotFound location={this.props.location}/>);
  }
}
