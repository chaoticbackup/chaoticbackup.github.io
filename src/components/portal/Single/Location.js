import React from 'react';
import API from '../../SpreadsheetData';
import { observer, inject } from 'mobx-react';
import Single from './_base';
import { PageNotFound, Initiative } from '../../Snippets';

@inject((stores, props, context) => props) @observer
export default class SingleLocation extends React.Component {

  render() {

    const path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 4 ) {
      return (<PageNotFound location={this.props.location}/>);
    }

    const name = decodeURIComponent(path[3]);

    const location = API.portal.locations.findOne({ 'gsx$name': name });
    const card_data = API.cards.locations.findOne({ 'gsx$name': name });

    if (location) {
      const sections = [];
      if (location.gsx$localfeatures) {
        sections.push(["Local Features", location.gsx$localfeatures]);
      }
      if (location.gsx$background) {
        sections.push(["Background", location.gsx$background]);
      }
      if (location.gsx$details) {
        sections.push(["Details", location.gsx$details]);
      }

      return (<Single
        card={card_data}
        col0={<>
          {card_data.gsx$initiative && (
            <div>
              <strong>Initiative: </strong>
              <Initiative initiative={card_data.gsx$initiative} notitle="true"/>
            </div>
          )}
        </>}
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
      if (card_data.gsx$splash) {
        return (<Single 
          card={card_data}
          col0={<>
            {card_data.gsx$initiative && (
              <div>
                <strong>Initiative: </strong>
                <Initiative initiative={card_data.gsx$initiative} notitle="true"/>
              </div>
            )}
          </>}
        />);
      }
    }
      
    return (<PageNotFound location={this.props.location}/>);
  }
}
