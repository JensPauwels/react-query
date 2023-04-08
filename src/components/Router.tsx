import { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Overview = lazy(() => import('./pages/Overview'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={'Loading..'}>
        <Routes>
          <Route path='/' element={<Overview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
