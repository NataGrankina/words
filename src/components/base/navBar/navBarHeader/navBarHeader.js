import React from 'react';
import styles from './navBarHeader.css';

export default function NavBarHeader(props) {
  return (
    <ul className={styles.navBarHeader}>
      {props.children}
    </ul>
  );
}

