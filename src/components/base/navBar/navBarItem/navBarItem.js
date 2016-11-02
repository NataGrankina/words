import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from './navBarItem.css';

const cx = classNames.bind(styles);

export default class NavBarItem extends Component {
    render() {
        const itemClasses = cx({
            navBarItem: true,
            pullRight: this.props.pullRight
        });
        return (
            <li className={itemClasses}>
                <a className={styles.navBarItemLink} onClick={this.props.onClick}>
                    {this.props.children}
                </a>
            </li>
        );
    }
}

NavBarItem.propTypes = {
    pullRight: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

NavBarItem.defaultProps = {
    pullRight: false
};
