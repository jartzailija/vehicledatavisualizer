import React from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Suggester = ({name, description, keywordSuggestion, suggestions, changeText, select}) => {
  //styled-components doesn't work with react-autosuggest
  const theme = {

    input: {
      width: '410px'
    },

    suggestionsContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 100
    },
    suggestionsList: {
      listStyleType: 'none',
      border: '1px solid black',
      padding: '3px',
      width: '410px',
      backgroundColor: 'white',
      marginBottom: 0
    }
  };

	const getSuggestionValue = suggestion => suggestion;

	const renderSuggestion = suggestion => {
		return (
      <div className="suggestion">
        {suggestion}
      </div>
    );
  };

	const getSuggestions = value => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		return inputLength === 0 ? [] : suggestions.filter(sug =>
			sug.toLowerCase().slice(0, inputLength) === inputValue
		);
	};
	
	const onSuggestionsFetchRequested = ({ value }) => {
    suggestions = getSuggestions(value);
    return suggestions;
	};

	const onSuggestionsClearRequested = () => {
    suggestions = [];
    return suggestions;
	};

	const inputProps = {
		placeholder: description,
		value: keywordSuggestion,
		onChange: changeText
	};

	return (
    <div className="wrapper">
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={select}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        alwaysRenderSuggestions={true}
        inputProps={inputProps}
      />
    </div>
	);
}

Suggester.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywordSuggestion: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  selectedKeyword: PropTypes.string.isRequired,
  changeText: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired
};

export default Suggester;