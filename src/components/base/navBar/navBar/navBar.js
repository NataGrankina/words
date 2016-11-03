import React from 'react';
import styles from './navBar.css';

export default function NavBar(props) {
  return (
    <ul className={styles.navBar}>
      {props.children}
    </ul>
  );
}
