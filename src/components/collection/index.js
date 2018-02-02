import React from 'react';
import API from '../SpreadsheetData';
import s from '../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import CardList from './List';
import SearchForm from './Search';

@inject((stores, props, context) => props) @observer
export default class Home extends React.Component {
  @observable loaded = false;
  @observable n = 10;
  @observable p = 1;
  @observable content = [];
  @observable card_img = API.card_back;

  handleContent(content) {
    this.content = content;
    this.p = 1;
  }

  setImage(img) {
    this.card_img = (img || API.card_back);
  }

  render() {

    if (API.urls === null ||
      API.portal === null ||
      API.cards === null) {
      return (<span>Loading...</span>);
    }

    if (this.loaded == false) {
      API.buildCollection([{'cards': 'attacks'}, , {'cards': 'battlegear'}, {'cards': 'creatures'}, {'cards': 'locations'}, {'cards': 'mugic'}])
      .then(() => {
        this.loaded = true;
      });
      return (<span>Loading...</span>);
    }

    return (
      <div className="collection">
        <link rel="stylesheet" href="/src/css/collection.css" />
        <div style={{float: 'left', width: '30%'}}>
          <div className="card_img">
            <img src={API.base_image + this.card_img} />
          </div>
          <SearchForm handleContent={this.handleContent.bind(this)} />
        </div>
        <div style={{float: 'right', width: '70%'}}>
          {this.navigation()}<br />
          <CardList cards={this.content.slice(this.n * (this.p-1), this.n * this.p)} setImage={this.setImage.bind(this)}/>
          {this.navigation()}
        </div>
      </div>
    );
  }

  navigation() {
    let numpages = Math.ceil(this.content.length / this.n);

    let next = () => {
      if (this.p < numpages) return(<button onClick={ () => {this.p++;} }>next</button>);
      else return(<button disabled>next</button>);
    }

    let prev = () => {
      if (this.p > 1) return(<button onClick={ () => {this.p--;} }>prev</button>);
      else return(<button disabled>prev</button>);
    }

    return (
      <div style={{textAlign: 'left'}}>
        <p>Showing page {this.p} of {numpages} {prev()} {next()}</p>
        <p>
          Entries per page:&nbsp;
          {/*<input type="text" style={{width: '40px'}} value={this.n}
            onChange={(event) => {let x = event.target.value; if (!isNaN(x)) this.n=x;}
          />*/}
          <input type="button" value="5" disabled={this.n=="5"} onClick={(e) => this.n=e.target.value} />&nbsp;
          <input type="button" value="10" disabled={this.n=="10"} onClick={(e) => this.n=e.target.value} />&nbsp;
          <input type="button" value="20" disabled={this.n=="20"} onClick={(e) => this.n=e.target.value} />&nbsp;
          <input type="button" value="50" disabled={this.n=="50"} onClick={(e) => this.n=e.target.value} />
        </p>
      </div>
    );
  };

}

