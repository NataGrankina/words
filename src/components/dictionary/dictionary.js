import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/dictionaryActions';

class Dictionary extends Component {
  componentDidMount() {
    this.props.dispatch(actions.loadDictionary());
  }

  render() {
    const { translations } = this.props;

    return (
      <div>
        <div>Dictionary</div>
        <ol>
          {translations.map(tr => (
            <div key={tr._id}>{tr.word.word} - {tr.translation}</div>
          ))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { dictionary } = state;
  const { translations } = dictionary;

  return {
    translations
  };
}

export default connect(mapStateToProps)(Dictionary);
