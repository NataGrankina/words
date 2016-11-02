import React, {Component, PropTypes} from 'react';
import styles from './navBarHeader.css';

export default class NavBarHeader extends Component {
    render() {
        return (
            <ul className={styles.navBarHeader}>
                {this.props.children}
            </ul>
        );
    }
}

