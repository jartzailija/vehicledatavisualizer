import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Suggester from '../components/Suggester';
import {
  setInput,
  selectMunicipality,
  fetchSuggestions,
  fetchDataByKeyword,
  emptyAverageData,
  emptySuggestions} from '../redux/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    keywordSuggestion: state.municipalities.input,
    suggestions: state.municipalities.suggestions,
    selectedKeyword: state.municipalities.selected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeText: (event, { newValue, method }) => {
    dispatch(setInput(newValue));
    if(newValue.length >= 3) {
      dispatch(fetchSuggestions(ownProps.name, newValue));
    }
  },
  select: (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    dispatch(selectMunicipality(suggestion));
    dispatch(emptySuggestions(ownProps.name));
    dispatch(emptyAverageData());
    dispatch(fetchDataByKeyword(ownProps.name, suggestion));
  }
});

const ConnectSuggester = connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggester);

ConnectSuggester.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ConnectSuggester;