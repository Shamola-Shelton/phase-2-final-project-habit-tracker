import React from 'react';
import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Habit Tracker</Link>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/">Home</Link></li>
        <li><button className={styles.button}>Add Habit</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;