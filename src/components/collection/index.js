import React from 'react';
import API from '../SpreadsheetData';
import { observable, action } from "mobx";
import { observer, inject } from 'mobx-react';
import SearchForm from './search/index.js';
import { Attack, Battlegear, Creature, Location, Mugic } from './types';
import './collection.scss';

// https://mobx.js.org/refguide/object.html
const fixedStyles = observable({
  style: {},
  get fixed() {return this.style},
  get isFixed() {return (Object.entries(this.style).length !== 0)},
  setFixed(height) {
    if (!window.matchMedia("(min-width: 975px)").matches) return;
    const left = document.getElementById('player').getBoundingClientRect().left + 4;
    const width = document.querySelector('.collection > .left').getBoundingClientRect().width + 2;
    this.style = {
      position: "fixed",
      top: 0,
      left: `${left}px`,
      overflowY: "auto",
      height: `${height}px`,
      width: `${width}px`,
    };
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
  @observable stats = "avg";
  @observable hideStats = false;
  @observable content = [];
  @observable card_img = API.card_back;
  @observable fixedStyles;

  constructor() {
    super();
    const ext = localStorage.getItem("extended");
    if (ext != null) this.ext = (/true/i).test(ext);

    const stats = localStorage.getItem("stats");
    if (stats != null) {
      if (stats == "min") this.stats = "min";
      if (stats == "max") this.stats = "max";
    }

    const hideStats = localStorage.getItem('hideStats');
    this.hideStats = (!!hideStats && hideStats !== "false");

    this.formRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  handleContent = (content) => {
    this.content = content;
    this.p = 1;
  }

  setImage = (img) => {
    this.card_img = (img || API.card_back);
    this.changeImage();
  }

  setExt = () => {
    this.ext = !this.ext;
    localStorage.setItem("extended", this.ext);
  }

  setStats = () => {
    if (this.stats == "min") this.stats = "avg";
    else if (this.stats == "avg") this.stats = "max";
    else if (this.stats == "max") this.stats = "min";
    localStorage.setItem("stats", this.stats);
  }

  setHideStats = () => {
    this.hideStats = !this.hideStats;
    localStorage.setItem("hideStats", this.hideStats);
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
      };

      // When nearing the end of the screen
      // (if element height offset is higher then height of screen)
      // reduce height by difference so that it doesn't leak past body
      if (scrollBottom <= 90) {
        const exp = h[ch] - (90 - scrollBottom);
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

  // This is a workaround to allow people interacting with the card list (copy and pasting) to still have focus on the form
  handleOutOfForm = () => {
    this.formRef.current.focus();
  }

  render() {
    return (
      <div className={"collection " + (this.ext ? "extended" : "short")}>
        <div className="left">
          <div id="side-menu" style={fixedStyles.fixed}>
            <ImagePreview url={this.card_img} ref={n => {if (n) this.changeImage = n.getInstance().changeImage;}} />
            <SearchForm formRef={this.formRef} handleContent={this.handleContent} {...this.props} />
          </div>
        </div>
        <div className="right" onClick={this.handleOutOfForm}>
          <div className="list-nav-top">
            {this.navigation()}
            <div>
              <label htmlFor="hide-stats">Hide Stats</label><br />
              <input type="checkbox" id="hide-stats" checked={this.hideStats} onChange={this.setHideStats}></input>
            </div>
            <button className="stats-button" onClick={this.setStats}>
              {this.stats == "min" && "Min Stats"}
              {this.stats == "avg" && "Average Stats"}
              {this.stats == "max" && "Max Stats"}
            </button>
            <button className="ext-button" onClick={this.setExt}>
              {this.ext ? "Extended Format" : "Short Format"}
            </button>
          </div>
          <br />
          <CardList 
            cards={this.content.slice(this.n * (this.p-1), this.n * this.p)} 
            setImage={this.setImage}
            ext={this.ext} 
            stats={this.stats}
            hideStats={this.hideStats}           
          />
          <br />
          {this.navigation()}
        </div>
      </div>
    );
  }

  navigation() {
    const numpages = Math.ceil(this.content.length / this.n);

    const next = () => {
      if (this.p < numpages) return (<button className="next-button" onClick={ () => {this.p++; window.scrollTo(0, 0)} }>next</button>);
      else return (<button className="next-button" disabled>next</button>);
    };

    const prev = () => {
      if (this.p > 1) return (<button className="prev-button" onClick={ () => {this.p--; window.scrollTo(0, 0)} }>prev</button>);
      else return (<button className="prev-button" disabled>prev</button>);
    };

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

const CardList = ({ cards, ...props }) => {
  if (cards.length == 1 && cards[0].text) {
    return (
      <div style={{ textAlign: 'left' }}>{cards[0].text}</div>
    );
  }
  return cards.map((card, i) => {
    switch (card.gsx$type) {
      case "Attacks":
        return (<Attack card={card} key={i} {...props}/>);
      case "Battlegear":
        return (<Battlegear card={card} key={i} {...props}/>);
      case "Creatures":
        return (<Creature card={card} key={i} {...props}/>);
      case "Locations":
        return (<Location card={card} key={i} {...props}/>);
      case "Mugic":
        return (<Mugic card={card} key={i} {...props}/>);
      default:
        return (<div key={i}>Invalid Card Type</div>);
    }
  });
};

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
    return (
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
