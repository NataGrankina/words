import React, { Component, PropTypes } from 'react';
import { NavBar, NavBarItem, NavBarHeader, NavBarHeaderItem } from '../base/navBar';
import styles from './header.css';

export default class Header extends Component {
    renderNavHeader() {
        const { isAuthenticated, profile } = this.props;

        return (
            isAuthenticated
                ? <NavBarHeader>
                    <NavBarHeaderItem>
                        <img src={profile.picture} className={styles.avatar} />
                    </NavBarHeaderItem>
                    <NavBarHeaderItem>
                        {profile.nickname}
                    </NavBarHeaderItem>
                  </NavBarHeader>
                : <NavBarHeader>
                    <NavBarHeaderItem>WORDS</NavBarHeaderItem>
                  </NavBarHeader>
        );
    }
    renderNavBody() {
        const { isAuthenticated, onLoginClick, onLogoutClick } = this.props;
        return (
            <NavBarItem pullRight onClick={isAuthenticated ? onLogoutClick : onLoginClick}>
                { isAuthenticated ? "Logout" : "Login" }
            </NavBarItem>
        );
    }
    render() {
        const { isAuthenticated, profile, onLoginClick, onLogoutClick } = this.props;
        return (
            <NavBar>
                {this.renderNavHeader()}
                {this.renderNavBody()}
            </NavBar>
        );
    }
}

Header.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object
};