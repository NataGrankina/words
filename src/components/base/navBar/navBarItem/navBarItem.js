import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './navBarItem.css';

const cx = classNames.bind(styles);

export default function NavBarItem(props) {
  const itemClasses = cx({
    navBarItem: true,
    pullRight: props.pullRight
  });
  return (
    <li className={itemClasses}>
      <a className={styles.navBarItemLink} onClick={props.onClick}>
        {props.children}
      </a>
    </li>
  );
}

NavBarItem.propTypes = {
  pullRight: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

NavBarItem.defaultProps = {
  pullRight: false
};
