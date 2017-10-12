import React from 'react';
import UnderConstruction from '../UnderConstruction';

export default class SingleCreature extends React.Component {
  render() {
    return (
      <div>
        <UnderConstruction location={this.props.location}/>
        <p>
          In the meantime, you can check out&nbsp;
          <a style={{textDecoration: "underline"}} href="http://www.tradecardsonline.com/im/editCollection/collection_type/1">Trade Cards Online</a>
          .
        </p>
      </div>
    );
  }

}

