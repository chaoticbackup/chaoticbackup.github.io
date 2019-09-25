import React from 'react';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';
import {PageNotFound} from '../../Snippets';
import Single from './_base';

@inject((stores, props, context) => props) @observer
export default class SingleAttack extends React.Component {

  render() {

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    let name = decodeURIComponent(path[3]);

    const attack = API.portal.attacks.findOne({'gsx$name': name});
    const card_data = API.cards.attacks.findOne({'gsx$name': name});

    if (attack) {
      return (<Single 
          card={card_data}
          col2={<React.Fragment>
            <div>
              <strong>Attributes:</strong><br />
              {attack.gsx$attributes}
            </div>
            <hr />
            <div>
              <strong>Background:</strong><br />
              {attack.gsx$background}
            </div>
            <hr />
            <div>
              <strong>Details:</strong><br />
              {attack.gsx$details}
            </div>
          </React.Fragment>}
        />
      );
    }
    else if (card_data) {
      if (card_data.gsx$splash) {
        return (<Single card={card_data}/>);
      }
    }

    return(<PageNotFound location={this.props.location}/>);
  }
}
