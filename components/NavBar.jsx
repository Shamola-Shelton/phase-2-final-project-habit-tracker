import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} suppressHydrationWarning>
        <Link href="/">Habit Tracker</Link>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/">Home</Link></li>
        {user ? (
          <li>
            <button onClick={logout} className={styles.button}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link href="/login" className={styles.button}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;