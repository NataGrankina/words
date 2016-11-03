import React, { Component } from 'react';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import * as actions from '../actions/translatorActions';
import * as authActions from '../actions/authActions';
import Header from './header/header';

class App extends Component {
  constructor() {
    super();

    this.loadTranslations = this.loadTranslations.bind(this);
  }

  loadTranslations(event) {
    const { value } = event.target;
    this.props.dispatch(actions.loadTranslations(value));
  }

  render() {
    const {
      isAuthenticated,
      profile,
      word,
      translations,
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
          ? <div style={{ marginTop: 100 }}>
            <div>
              <DebounceInput
                debounceTimeout={500}
                onChange={this.loadTranslations}
              />
              <div>Translations for {word} are:</div>
              <ol>
                {translations.map(tr => (
                  <div key={tr.pos}>
                    <div>{tr.pos.toUpperCase()}</div>
                    {tr.tr.map(t =>
                      (<div key={t.text}>{t.text}</div>)
                    )}
                  </div>
                ))}
              </ol>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { translator, auth } = state;
  const { isAuthenticated, profile, error } = auth;
  const { word, translations } = translator;

  return {
    isAuthenticated,
    profile,
    error,
    word,
    translations
  };
}

export default connect(mapStateToProps)(App);
