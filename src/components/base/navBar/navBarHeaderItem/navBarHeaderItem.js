import React from 'react';
import styles from './navBarHeaderItem.css';

export default function NavBarHeaderItem(props) {
  return (
    <li className={styles.navBarHeaderItem}>
      <a className={styles.navBarHeaderItemLink}>
        {props.children}
      </a>
    </li>
  );
}
