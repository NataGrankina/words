/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import Header from './header/header';
import Translator from './translator/translator';
import Dictionary from './dictionary/dictionary';
import styles from './app.css';

class App extends Component {
  renderApp() {
    return (
      <div className={styles.container}>
        <div className={styles.translator}><Translator /></div>
        <div className={styles.dictionary}><Dictionary /></div>
      </div>
    );
  }

  render() {
    const {
      isAuthenticated,
      profile,
      dispatch
    } = this.props;

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          profile={profile}
          onLoginClick={() => dispatch(authActions.login())}
          onLogoutClick={() => dispatch(authActions.logout())}
        />
        {isAuthenticated
          ? this.renderApp()
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, profile, error } = auth;
  return {
    isAuthenticated,
    profile,
    error
  };
}

export default connect(mapStateToProps)(App);
