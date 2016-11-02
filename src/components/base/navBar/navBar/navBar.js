import React, {Component} from 'react';
import styles from './navBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <ul className={styles.navBar}>
                {this.props.children}
            </ul>
        );
    }
}