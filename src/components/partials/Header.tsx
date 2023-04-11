import styles from '../../assets/styles/header.module.scss';
import { LogOut } from 'lucide-react';

const Header = () => {
  const logout = () => {
    console.log('logout');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logout} onClick={logout}>
        Logout
        <LogOut />
      </div>
    </header>
  );
};

export default Header;
