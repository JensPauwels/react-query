import { useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import styles from '../../assets/styles/header.module.scss';


const Header = () => {
  const location = useLocation();

  const logout = () => {
    console.log('logout');
  };

  return (
    <header className={styles.header}>
      {
        location.pathname !== '/login' && (
          <div className={styles.logout} onClick={logout}>
            Logout
            <LogOut />
          </div>
        )
      }
    </header>
  );
};

export default Header;
