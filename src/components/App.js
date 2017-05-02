import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from '../styles/app.style';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function App({ children, routes }) {
  function generateMapMenu() {
    let path = '';

    function nextPath(route) {
      path += (
        (path.slice(-1) === '/' ? '' : '/') +
        (route.path === '/' ? '' : route.path)
      );
      return path;
    }

    return (
      routes.filter(route => route.mapMenuTitle)
        .map((route, index, array) => (
          <span key={index}>
            <Interactive
              as={Link}
              {...s.link}
              to={nextPath(route)}
            >{route.mapMenuTitle}</Interactive>
            {(index + 1) < array.length && ' / '}
          </span>
        ))
    );
  }

  function ChangePage(asParams)
  {
    let location = "#";
    switch(asParams) {
      case 'collect':
        break;
      // case 'register' :
      //   location ='/Registration.aspx';
      //   break;
      case 'build':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
        break;
      case 'centerOval':
        break;
      case 'enterTheCode':
        break;
      case 'trade':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=&game_id=82';
        break;
      case 'portal':
        location = ('https://chaoticbackup.github.io/portal/')
        break;
      case 'forum':
        location ='http://chaoticbackup.forumotion.com';
        break;
      case 'playNow':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
        break;
      default:
        location = '/UnderConstructionPage.aspx';
        break;
    }
    return location;
  }

  let language="ENG";
  let bkgrnd = "05";

  return (
    <div>
      <div className="fix-pgBkgrnd-repeat-x">
        <div className={"fix-img-bkgrnd fix-img-bkgrnd_"+bkgrnd}></div>
      </div>
      <div className="pgBkgrnd-repeat-x">
        <div className="img-bkgrnd">
        <div className="legacy-header">
          <div className="content-wrap">
            <div className="header">
              <div id="nav">
                <div className="zero-clear-line headerSpriteNav-wrap">
                  <ul id="unity-sprite" className={language}>
                    <li id="unity-nav1" className={language}></li>
                    <li id="unity-nav2" className={language}><a href={ChangePage('collect')}><span>Collect</span></a></li>
                    <li id="unity-nav3" className={language}><a href={ChangePage('build')}><span>Build</span></a></li>
                    <li id="unity-nav4" className={language}><a href={ChangePage('trade')}><span>Trade</span></a></li>
                    <li id="unity-nav5" className={language}><a href={ChangePage('centerOval')}><span>Home</span></a></li>
                    <li id="unity-nav6" className={language}><a href={ChangePage('forum')}><span>Forums</span></a></li>
                    <li id="unity-nav7" className={language}><a href={ChangePage('portal')}><span>Portal</span></a></li>
                    <li id="unity-nav8" className={language}><a href={ChangePage('playNow')}><span>Play</span></a></li>
                    <li id="unity-nav9" className={language}></li>
                  </ul>
                  <ul id="unityETC-sprite" className={language}>
                    <li id="unity-nav10" className={language}><a href={ChangePage('enterTheCode')}><span>Enter the Code</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div style={s.root}>
            <h1 style={s.title}>Single Page Apps for GitHub Pages</h1>
            {/*
              <Interactive
                as="a"
                href="https://github.com/rafrex/spa-github-pages"
                style={s.repoLink}
                {...s.link}
              >https://github.com/rafrex/spa-github-pages</Interactive>
            */}
            <nav style={s.mapMenu}>
              {generateMapMenu()}
            </nav>
            {children}
            {/*
              <div style={s.creditLine}>
              <Interactive
                as="a"
                href="http://www.rafaelpedicini.com"
                interactiveChild
                focus={{}}
                touchActive={{}}
                touchActiveTapOnly
              >
                Code and concept by <span {...s.childLink}>Rafael Pedicini</span>
              </Interactive>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
