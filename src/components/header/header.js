import React, { Component, PropTypes } from 'react';
import { NavBar, NavBarItem, NavBarHeader, NavBarHeaderItem } from '../base/navBar';
import styles from './header.css';

export default class Header extends Component {
  renderNavHeader() {
    const { isAuthenticated, profile } = this.props;
    const { picture, nickname } = profile;

    return (
      isAuthenticated
        ? <NavBarHeader>
          <NavBarHeaderItem>
            <img src={picture} role="presentation" className={styles.avatar} />
          </NavBarHeaderItem>
          <NavBarHeaderItem>
            {nickname}
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
        { isAuthenticated ? 'Logout' : 'Login' }
      </NavBarItem>
    );
  }

  render() {
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
  profile: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired
  })
};
