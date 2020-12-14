import React from 'react';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import { observer, inject } from 'mobx-react';
import { PageNotFound } from '../../Snippets';
import Single from './_base';

@inject((stores, props, context) => props) @observer
export default class SingleAttack extends React.Component {

  render() {

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return (<PageNotFound location={this.props.location}/>);
    }

    const name = decodeURIComponent(path[3]);

    const attack = API.portal.attacks.findOne({ 'gsx$name': name });
    const card_data = API.cards.attacks.findOne({ 'gsx$name': name });

    if (attack) {
      const sections = [];
      if (attack.gsx$attributes) {
        sections.push(["Attributes", attack.gsx$attributes]);
      }
      if (attack.gsx$background) {
        sections.push(["Background", attack.gsx$background]);
      }
      if (attack.gsx$details) {
        sections.push(["Details", attack.gsx$details]);
      }

      return (<Single 
        card={card_data}
        col2={
          sections.map((val, i) => {
            return (<React.Fragment key={i} >
              <div>
                <strong>{val[0]}:</strong><br />
                {val[1]}
              </div>
              {i !== sections.length - 1 && <hr />}
            </React.Fragment>);
          }) 
        }
      />
      );
    }
    else if (card_data) {
      if (card_data.gsx$splash) {
        return (<Single card={card_data}/>);
      }
    }

    return (<PageNotFound location={this.props.location}/>);
  }
}
