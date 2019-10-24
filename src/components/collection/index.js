import React from 'react';
import API from '../SpreadsheetData';
import {observable, action} from "mobx";
import {observer, inject} from 'mobx-react';
import CardList from './List';
import SearchForm from './search/index.js';
import './collection.scss'

// https://mobx.js.org/refguide/object.html
const fixedStyles = observable({
  style: {},
  get fixed() {return this.style},
  get isFixed() {return (Object.entries(this.style).length !== 0)},
  setFixed(height) {
    if (!window.matchMedia("(min-width: 975px)").matches) return;
    let left = document.getElementById('player').getBoundingClientRect().left + 4;
    let width = document.querySelector('.collection > .left').getBoundingClientRect().width + 2;
    this.style = {
      position: "fixed",
      top: 0,
      left: `${left}px`,
      overflowY: "auto",
      height: `${height}px`,
      width: `${width}px`,
    }
  },
  removeFixed() {this.style = {}}
}, {
  setFixed: action,
  removeFixed: action
}, { 
  deep: false 
});


@inject((stores, props, context) => props) @observer
export default class Home extends React.Component {
  @observable loaded = false;
  @observable n = 10;
  @observable p = 1;
  @observable ext = false;
  @observable content = [];
  @observable card_img = API.card_back;
  @observable fixedStyles;

  constructor() {
    super();
    let ext = localStorage.getItem("extended");
    if (ext == null) this.ext = false;
    this.ext = (/true/i).test(ext);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
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

  handleScroll = (event) => {
    event.preventDefault();

    // Fix the side menu in place when scrolling down
    if (window.pageYOffset >= 235) {
      const 
      h = document.documentElement, 
      // b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight',
      ch = 'clientHeight';
      // const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h[ch]) * 100;
      // let exp = h[ch] - (h[ch] * (percent - 85) / 100);
      const sm = document.getElementById("side-menu");
      const list = document.querySelector('.collection > .right');
      const scrollBottom = (h[sh] - window.innerHeight - h[st]);

      const setListHeight = (height) => {
        if (list[ch] < window.innerHeight) {
          list.style.minHeight = `${height}px`;
        } 
        else if (list[ch] === window.innerHeight) return;
        else if (list.style.minHeight) {
          list.style.minHeight = null;
        }
      }

      // When nearing the end of the screen
      // (if element height offset is higher then height of screen)
      // reduce height by difference so that it doesn't leak past body
      if (scrollBottom <= 90) {
        let exp = h[ch] - (90 - scrollBottom);
        fixedStyles.setFixed(exp);
      }
      // Fix with height of side menu to height of viewport
      else if (sm[sh] > h[ch]){
        fixedStyles.setFixed(window.innerHeight);
      }
      // Extra check to prevent unnecessary rerenders
      // Fix it when smaller than viewport keep height
      else if (sm[ch] !== h[ch]) {
        fixedStyles.setFixed(window.innerHeight);
      }
      
      setListHeight(window.innerHeight);
    }
    else if (fixedStyles.isFixed) {
      fixedStyles.removeFixed();
    }
  };

  render() {
    return (
      <div className={"collection " + (this.ext ? "extended" : "short")}>
        <div className="left">
          <div id="side-menu" style={fixedStyles.fixed}>
            <ImagePreview url={API.base_image + this.card_img} ref={n => {if (n) this.changeImage = n.getInstance().changeImage}} />
            <SearchForm handleContent={this.handleContent.bind(this)} {...this.props} />
          </div>
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
