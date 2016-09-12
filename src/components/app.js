import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/translatorActions';

class App extends React.Component {
    loadTranslations(event) {
        const {value} = event.target;
        this.props.dispatch(actions.loadTranslations(value));
    }
    render() {
        return (
            <div>
                <input onChange={this.loadTranslations.bind(this)}/>
                <div>Translations for {this.props.word} are: </div>
                <ol>
                    {this.props.translations.map(tr => (<div key={tr}>{tr}</div>))}
                </ol>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        word: state.translator.word,
        translations: state.translator.translations
    };
}

export default connect(mapStateToProps)(App);
