import React, { Component } from 'react';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import * as actions from '../../actions/translatorActions';
import { addWord } from '../../actions/dictionaryActions';

class Translator extends Component {
  constructor() {
    super();

    this.loadTranslations = this.loadTranslations.bind(this);
    this.bindAddTranslation = this.bindAddTranslation.bind(this);
  }

  bindAddTranslation(translation) {
    return this.addTranslationToDictionary.bind(this, translation);
  }

  loadTranslations(event) {
    const { value } = event.target;
    this.props.dispatch(actions.loadTranslations(value));
  }

  addTranslationToDictionary(translation) {
    this.props.dispatch(addWord(this.props.word, translation, 'en', 'ru'));
  }

  render() {
    const { word, translations } = this.props;
    return (
      <div>
        <DebounceInput
          debounceTimeout={1000}
          onChange={this.loadTranslations}
        />
        <div>Translations for {word} are:</div>
        <ol>
          {translations.map(tr => (
            <div key={tr.pos}>
              <div>{tr.pos.toUpperCase()}</div>
              {tr.tr.map(t =>
                <div key={t.text}>
                  <span>{t.text}</span>
                  <button onClick={this.bindAddTranslation(t.text)}>+</button>
                </div>
              )}
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { translator } = state;
  const { word, translations } = translator;

  return {
    word,
    translations
  };
}

export default connect(mapStateToProps)(Translator);
