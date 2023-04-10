import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToken } from '../../hooks';
import { LoginForm } from '../forms';

import styles from '../../assets/styles/login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const { isAuthorized } = useToken();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  return (
    <main>
      <h1>
        Login
      </h1>

      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
