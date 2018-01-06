import React from 'react';

export function Splash(props) {
  let image = props.image;
  return (
    <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: 'url(\''+image+'\') no-repeat center', backgroundSize: 'cover'}} />
  );
}
