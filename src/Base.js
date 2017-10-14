import React, { PropTypes } from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import s from './styles/app.style';

const language = "ENG";
const bkgrnd = "05";

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

  return (
    <div>
      <div className="fix-pgBkgrnd-repeat-x">
        <div className={"fix-img-bkgrnd fix-img-bkgrnd_"+bkgrnd}></div>
      </div>
      <div className="pgBkgrnd-repeat-x">
        <div className="img-bkgrnd">
          <div className="content-wrap">
            <div className="legacy legacy-header">
              <div className="header">
                <div id="nav">
                  <div className="zero-clear-line headerSpriteNav-wrap">
                    <ul id="unity-sprite" className={language}>
                      <li id="unity-nav1" className={language}></li>
                      <li id="unity-nav2" className={language}><Link to={`/collection/`}><span>Collect</span></Link></li>
                      <li id="unity-nav3" className={language}><a href="http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82"><span>Build</span></a></li>
                      <li id="unity-nav4" className={language}><a href="http://www.tradecardsonline.com/?action=selectCard&goal=&game_id=82"><span>Trade</span></a></li>
                      <li id="unity-nav5" className={language}><Link to={`/`}><span>Home</span></Link></li>
                      <li id="unity-nav6" className={language}><a href="http://chaoticbackup.forumotion.com"><span>Forums</span></a></li>
                      <li id="unity-nav7" className={language}><Link to={`/portal/`}><span>Portal</span></Link></li>
                      <li id="unity-nav8" className={language}><a href="http://www.tradecardsonline.com/?action=selectCard&goal=DK&game_id=82"><span>Play</span></a></li>
                      <li id="unity-nav9" className={language}></li>
                    </ul>
                    <ul id="unityETC-sprite" className={language}>
                      <li id="unity-nav10" className={language}><a href={`#`}><span>Enter the Code</span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="legacy content">
              <div className="left-column">
                <div className="full-width clear-line" style={{marginBottom: "5px"}}>
                </div>
              </div>
              <div className="center-column">
                <div className="pods-wrap pad5px-btm">
                  <div className="clear-line full-width">
                    <div className="adPod-top-wrap">
                      <div className="videoAdPod-topleft">
                        <div className="videoAdPod-topLeft-repeat-x"></div>
                      </div>
                      <div className="videoAdPod-topright">
                        <div className="videoAdPod-topRight-repeat-x"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-area-repeat-xy">
                    <div className="content-area-top-repeat-x">
                      <div className="content-area-left-repeat-y">
                        <div className="content-area-right-repeat-y">
                          <div style={{margin: "0 8px 0 10px"}}>
                            <div id="player" style={{textAlign: "center"}}>
                              {/*
                              <br />
                              <h1 style={s.title}>Single Page Apps for GitHub Pages</h1>
                              */}
                              <nav style={s.mapMenu}>
                                {generateMapMenu()}
                              </nav>
                              {children}
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-btm-wrap">
                    <div className="content-area-btm-left">
                      <div className="content-left-btm-repeat-x">
                      </div>
                    </div>
                    <div className="content-area-btm-right">
                      <div className="content-right-btm-repeat-x">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-column">
                <div className="full-width clear-line" style={{marginBottom: "5px"}}>
                </div>
              </div>
            </div>
            <div className="legacy legacy-footer">
              <div className="footer-wrap">
                <div className="footer-repeat-x">
                  <div className="footer-left">
                    <div className="footer-right">
                      <div className="footer-text">
                        <div className="footer-search"></div>
                        <div className="footer-nav">
                          <div className="copyright">
                            ©2008 Chaotic USA Entertainment Group, Inc.
                            <br />
                            U.S. Pat 5810666 and 5954332 and other pending patent applications. All Rights Reserved.
                          </div>
                        </div>
                        <div className="footer-language">
                          <a href="javascript:showLanguageSelection();" className="page-options" title="Change Language">
                            <img src="http://web.archive.org/web/20130304153151im_/http://chaoticgame.com/Images/flag_usa_.gif" alt="English (Change Language)" width="40" height="27"/>
                            <br />English (Change Language)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
