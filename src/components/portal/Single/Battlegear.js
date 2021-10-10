import React from 'react';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import { observer, inject } from 'mobx-react';
import { PageNotFound } from '../../Snippets';
import Single from './_base';

@inject((stores, props, context) => props) @observer
export default class SingleBattlegear extends React.Component {

  render() {

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return (<PageNotFound location={this.props.location}/>);
    }

    const name = decodeURIComponent(path[3]);

    const battlegear = API.portal.battlegear.findOne({ 'gsx$name': name });
    const card_data = API.cards.battlegear.findOne({ 'gsx$name': name });
    
    if (battlegear) {
      const sections = [];
      if (battlegear.gsx$attributes) {
        sections.push(["Attributes", battlegear.gsx$attributes]);
      }
      if (battlegear.gsx$background) {
        sections.push(["Background", battlegear.gsx$background]);
      }
      if (battlegear.gsx$details) {
        sections.push(["Details", battlegear.gsx$details]);
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
      />);
    }
    else if (card_data) {
      if (API.hasFullart(card_data)) {
        return (<Single card={card_data}/>);
      }
    }
    
    return (<PageNotFound location={this.props.location}/>);
  }
}
