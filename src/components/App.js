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

  let language="ENG";
  let background = "05";

  function ChangePage(asParams)
  {
    let location = "#";
    switch(asParams) {
      case 'collect':
        //location ='/Collection.aspx';
        break;
      // case 'register' :
      //   location ='/Registration.aspx';
      //   break;
      case 'build':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
        break;
      case 'centerOval':
        //location ='/Login.aspx';
        break;
      case 'enterTheCode':
        //location ='/EnterTheCode.aspx';
        break;
      case 'trade':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=&game_id=82';
        break;
      case 'portal':
        //window.open('https://chaoticbackup.github.io/portal/');
        location = ('https://chaoticbackup.github.io/portal/')
        break;
      case 'forum':
        location ='http://chaoticbackup.forumotion.com';
        break;
      case 'playNow':
        location ='http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82';
        break;
      // case 'league':
      //   location ='/Play.aspx';
      //   break;
      // case 'buyOnline':
      //   window.open('http://buycards.chaoticgame.com/');
      //   break;
      // case 'parentControls':
      //   location = '/ParentalControls.aspx';
      //   break;
      // case 'personalStats':
      //   location = '/PersonalStatistics.aspx';
      //   break;
      // case 'editProfile':
      //   location = '/Account-Profile.aspx';
      //   break;
      // case 'locate':
      //   window.open('http://www.tcdent.com/locations.php?type=2');
      //   break;
      // case 'tutorial':
      //   window.open('/tutorial/index.html');
      //   break;
      // case 'rules':
      //   window.open('/rules/index.html');
      //   break;
      // case 'patch':
      //   location ='/patch-notes.aspx';
      //   break;
      // case 'accountSettings':
      //   location = '/Account-Settings.aspx';
      //   break;
      // case 'accountStarterDeck':
      //   location = '/Account-StarterDeck.aspx';
      //   break;
      // case 'adminPage':
      //   location ='/admin/Admin.aspx';
      //   break;
      // case 'uploadCards':
      //   location ='EnterTheCode.aspx';
      //   break;
      // case 'rankings':
      //   location='League.aspx';
      //   break;
      // case 'openRankings':
      //   window.open('/League.aspx');
      //   break;
      // case 'openBuild':
      //   window.open('/ArmyBuilder.aspx');
      //   break;
      // case 'download':
      //   window.open('/Download.aspx');
      //   break;
      // case 'openDownload':
      //   window.open('/Download.aspx');
      //   break;
      default:
        location = '/UnderConstructionPage.aspx';
        break;
    }
    return location;
  }

  return (
    <div>
      <div className="fix-pgBkgrnd-repeat-x">
        <div className={'fix-img-bkgrnd_'+background}></div>
      </div>
      <div className="pgBkgrnd-repeat-x">
        <div className="img-bkgrnd">
        <div className="legacy-header">
          <div className="content-wrap">
            <div className="header">
              <div id="nav">
                <div className="zero-clear-line headerSpriteNav-wrap">
                  <ul id={'unity-sprite-'+language}>
                    <li id={"unity-nav1-"+language}></li>
                    <li id={"unity-nav2-"+language}><a href={ChangePage('collect')}><span>Collect</span></a></li>
                    <li id={"unity-nav3-"+language}><a href={ChangePage('build')}><span>Build</span></a></li>
                    <li id={"unity-nav4-"+language}><a href={ChangePage('trade')}><span>Trade</span></a></li>
                    <li id={"unity-nav5-"+language}><a href={ChangePage('centerOval')}><span>Home</span></a></li>
                    <li id={"unity-nav6-"+language}><a href={ChangePage('forum')}><span>Forums</span></a></li>
                    <li id={"unity-nav7-"+language}><a href={ChangePage('portal')}><span>Portal</span></a></li>
                    <li id={"unity-nav8-"+language}><a href={ChangePage('playNow')}><span>Play</span></a></li>
                    <li id={"unity-nav9-"+language}></li>
                  </ul>
                  <ul id={"unityETC-sprite-"+language}>
                    <li id={"unity-nav10-"+language}><a href={ChangePage('enterTheCode')}><span>Enter the Code</span></a></li>
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
