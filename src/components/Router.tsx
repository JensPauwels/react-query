import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../hooks';
import { Loading, Header } from './partials';

const TodoOverview = lazy(() => import('./pages/TodoOverview'));
const CategoryOverview = lazy(() => import('./pages/CategoryOverview'));
const Login = lazy(() => import('./pages/Login'));

type PrivateRouteProps = {
  element: JSX.Element
}

const PrivateRoute = ({ element: Element }: PrivateRouteProps) => {
  const { isAuthorized } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized]);

  return Element;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<PrivateRoute element={<CategoryOverview />} />} />} />
          <Route path="/overview/:categoryID" element={<PrivateRoute element={<TodoOverview />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
