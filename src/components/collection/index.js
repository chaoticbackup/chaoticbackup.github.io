import React from 'react';
import API from '../SpreadsheetData';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import CardList from './List';
import SearchForm from './search/index.js';
import '../../scss/collection.scss'

@inject((stores, props, context) => props) @observer
export default class Home extends React.Component {
  @observable loaded = false;
  @observable n = 10;
  @observable p = 1;
  @observable ext = false;
  @observable content = [];
  @observable card_img = API.card_back;

  componentDidMount() {
    let ext = localStorage.getItem("extended");
    if (ext == null) this.ext = false;
    this.ext = (/true/i).test(ext);
  }

  handleContent(content) {
    this.content = content;
    this.p = 1;
  }

  setImage(img) {
    this.card_img = (img || API.card_back);
    this.changeImage();
  }

  setExt() {
    this.ext = !this.ext;
    localStorage.setItem("extended", this.ext);
  }

  render() {
    return (
      <div className={"collection " + (this.ext ? "extended" : "short")}>
        <div className="left">
          <ImagePreview url={API.base_image + this.card_img} ref={n => {if (n) this.changeImage = n.getInstance().changeImage}} />
          <SearchForm handleContent={this.handleContent.bind(this)} {...this.props} />
        </div>
        <div className="right">
          <div className="list-nav-top">
            {this.navigation()}
            {this.extended()}
          </div>
          <br />
          <CardList ext={this.ext} cards={this.content.slice(this.n * (this.p-1), this.n * this.p)} setImage={this.setImage.bind(this)}/>
          <br />
          {this.navigation()}
        </div>
      </div>
    );
  }

  extended() {
    return (
      <div className="ext-button">
        <button id="buttons" onClick={this.setExt.bind(this)}
          >{this.ext ? "Short Format" : "Extended Format"}</button>
      </div>
    );
  }

  navigation() {
    let numpages = Math.ceil(this.content.length / this.n);

    let next = () => {
      if (this.p < numpages) return(<button id="buttons" onClick={ () => {this.p++; window.scrollTo(0, 0);} }>next</button>);
      else return(<button id="buttons" disabled>next</button>);
    }

    let prev = () => {
      if (this.p > 1) return(<button id="buttons" onClick={ () => {this.p--; window.scrollTo(0, 0);} }>prev</button>);
      else return(<button id="buttons" disabled>prev</button>);
    }

    return (
      <div className="entries">
        {this.content.length} results - page {this.p} of {numpages} {prev()} {next()}
        <br/>Entries per page
        {/*<input type="text" style={{width: '40px'}} value={this.n}
          onChange={(event) => {let x = event.target.value; if (!isNaN(x)) this.n=x;}
        />*/}
        <input type="button" value="5" disabled={this.n=="5"} onClick={(e) => this.n=e.target.value} />&nbsp;
        <input type="button" value="10" disabled={this.n=="10"} onClick={(e) => this.n=e.target.value} />&nbsp;
        <input type="button" value="20" disabled={this.n=="20"} onClick={(e) => this.n=e.target.value} />&nbsp;
        <input type="button" value="50" disabled={this.n=="50"} onClick={(e) => this.n=e.target.value} />
      </div>
    );
  }
}

@observer
class imgbase extends React.Component {
  @observable display = false;

  handleClickOutside = (event) => {
    // event.preventDefault();
    this.display = false;
  }

  changeImage = () => {
    this.display = true;
  }

  render() {
    return(
      <div className="card_img">
        <img className={(this.display?"":"hidden")} src={this.props.url} />
      </div>
    );
  }
}

const onClickOutside = require("react-onclickoutside").default;
const ImagePreview = onClickOutside(imgbase);

// var clickOutsideConfig = {
//   handleClickOutside: function(instance) {
//     return instance.handleClickOutside;
//   }
// };
//
// const ImagePreview = onClickOutside(imgbase, clickOutsideConfig);

// const createReactClass = require("create-react-class");
// const ImagePreview = onClickOutside(createReactClass({
//     handleClickOutside: function(event) {
//       this.display = false;
//     },
//     render: function() {
//       return(
//         <div className="card_img">
//           <img className={(this.display?"":"hidden")} src={API.base_image + this.props.url} />
//         </div>
//       );
//     }
//   })
// );
