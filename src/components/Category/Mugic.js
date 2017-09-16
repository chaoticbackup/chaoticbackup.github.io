import React from 'react';
import UnderConstruction from '../UnderConstruction';

export default class Mugic extends React.Component {

  constructor(props) {
    super (props);
    this.tribe = '';
    this.state = {mugic: {}};
  }

  componentDidMount() {
    if (this.props.children) return;
    var self = this;
    let urls = (this.tribe == "All") ? API.Mugic : {[this.tribe]: API.Mugic[this.tribe]};
    // For each tribe, get its spreadsheet, set the state
    Object.keys(urls).map((tribe) => {
      API.getSpreadsheet(urls[tribe], function(data) {
        self.setState({mugic: Object.assign(self.state.mugic, {[tribe]: data})});
      });
    });
  }

  render() {
    if (this.props.children) {
      return (<div>{this.props.children}</div>);
    }
    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // ** Process the tribe ** //
    // /portal/Mugic/
    // /portal/{Tribe}/Mugic/
    // The first / gets counted

    return (
      <UnderConstruction location={this.props.location}/>
    );

    // Map creatures of the tribe
    function list_Mugic(tribe) {
      if (!self.state.Mugic[tribe]) {
        return (<span>Loading...</span>);
      }
      else return self.state.Mugic[tribe].map((mugic, i) => {
        return (
          <div key={i}>
            <Interactive as="a" {...s.link} href={"Mugic/"+mugic.gsx$name.$t}><span>{mugic.gsx$name.$t}</span></Interactive>
          </div>
        );
      });
    }
  }
}
