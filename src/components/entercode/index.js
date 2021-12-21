import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EnterTheCode from './EnterTheCode';
import PackSimulator from './PackSimulator';
import './packs.scss';

export default function Base () {
  return (    
    <Routes>
      <Route path="/" element={<EnterTheCode />} />
      <Route path="PackSimulator" element={<PackSimulator />} />
    </Routes>
  );
}
