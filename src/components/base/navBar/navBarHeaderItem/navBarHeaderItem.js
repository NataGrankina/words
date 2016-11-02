import React, {Component, PropTypes} from 'react';
import styles from './navBarHeaderItem.css';

export default class NavBarHeaderItem extends Component {
    render() {
        return (
            <li className={styles.navBarHeaderItem}>
                <a className={styles.navBarHeaderItemLink}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}
