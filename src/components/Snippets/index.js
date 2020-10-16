import React from 'react';
import s from '../../styles/app.style';

export { Unique } from './Unique';
export { Initiative } from './Initiative';
export { Ability } from './Ability';
export * from './_icons';
export * from './_text';

export function UnderConstruction(props) {
  return (
    <p style={s.p}>This page is currently under construction</p>
  );
}

export function PageNotFound(props) {
  return (
    <p style={s.p}>
      404 route not found - {s.code(props.location.pathname)}
    </p>
  );
}

export function Loading(props) {
  return (<span>Loading...</span>);
}

export function Splash(props) {
  const { image } = props;
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: 'url(\'' + image + '\') no-repeat center', backgroundSize: 'cover' }} />
  );
}

export function Donate(props) {
  return (
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" />
      <a href="https://www.paypal.com/cgi-bin/webscr"><input type="image" src="/src/img/btn_donate_SM.gif" border="0" name="submit" alt="PayPal Donate" /></a>
      { /* <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" /> */}
    </form>
  );
}

export function SearchButton(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="magnifying-glass"><g fillRule="evenodd"><path d="M21.747 20.524l-4.872-4.871a.864.864 0 1 0-1.222 1.222l4.871 4.872a.864.864 0 1 0 1.223-1.223z"></path><path d="M3.848 10.763a6.915 6.915 0 0 1 6.915-6.915 6.915 6.915 0 0 1 6.915 6.915 6.915 6.915 0 0 1-6.915 6.915 6.915 6.915 0 0 1-6.915-6.915zm-1.729 0a8.643 8.643 0 0 0 8.644 8.644 8.643 8.643 0 0 0 8.644-8.644 8.643 8.643 0 0 0-8.644-8.644 8.643 8.643 0 0 0-8.644 8.644z"></path></g>
  </svg>);
}
