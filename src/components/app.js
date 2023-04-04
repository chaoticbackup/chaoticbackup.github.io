import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import useCheckMobileScreen from './_hooks/useCheckMobileScreen';
import Base from './BaseStylesWrapper';
import Create from './create';
import Home from './home';
import RouteElement from './RouteElement';
import { PageNotFound, UnderConstruction, Loading } from './Snippets';

const EnterTheCode = lazy(() => import('./entercode'));

const Portal = lazy(() => import('./portal'));

const Collection = lazy(() => import('./collection'));

const MobileCollection = lazy(() => import('./_mobile/collection'));
  
const RedirectBeta = () => {
  const { pathname } = useLocation();
  return <Navigate to={pathname.replace("/beta", "")} replace />;
};

export default function App() {
  const isMobile = useCheckMobileScreen();

  useEffect(() => {
    if (isMobile) {
      document.styleSheets[0].disabled = true;
    } else {
      document.styleSheets[0].disabled = false;
    }
  }, [isMobile]);

  return (
    <Routes>
      <Route path="/beta/collection" element={
        <Suspense fallback={<Loading />}><Collection /></Suspense>
      } />
      <Route path="/beta/*" element={<RedirectBeta />} />
      {isMobile && <Route path="/collection" element={
        <Suspense fallback={<Loading />}><MobileCollection /></Suspense>
      } />}
      {/* Normal Routes */}
      <Route path="/" element={<Base />} >
        <Route index element={<Home />} />
        <Route path="PageNotFound" element={<PageNotFound />} />
        <Route path="UnderConstruction" element={<UnderConstruction />} />
        <Route path="EnterTheCode/*" element={
          <Suspense fallback={<Loading />}><EnterTheCode /></Suspense>
        } />
        <Route path="create/*" element={<Create />} />
        <Route path="collection/*" element={
          <Suspense fallback={<Loading />}><RouteElement component={Collection} /></Suspense>
        } />
        <Route path="portal/*" element={
          <Suspense fallback={<Loading />}><Portal /></Suspense>
        } />
      </Route>
    </Routes>
  );
}

