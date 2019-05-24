import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//const Suggester = ({name, description, keywordSuggestion, suggestions, changeText, select}) => {

class Suggester extends Component{

  constructor(props) {
    super(props);
    this.theme = {
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
    
    this.getSuggestionValue = suggestion => suggestion;
    this.suggestions = this.props.suggestions;
    this.inputProps = {
      placeholder: this.props.description,
      value: this.props.keywordSuggestion,
      onChange: this.props.changeText
    };
  }
  //styled-components doesn't work with react-autosuggest
  
	renderSuggestion(suggestion) {
		return (
      <div className="suggestion">
        {suggestion}
      </div>
    );
  }

	getSuggestions(value) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
	
		return inputLength === 0 ? [] : this.suggestions.filter(sug =>
			sug.toLowerCase().slice(0, inputLength) === inputValue
		);
	}
	
	/*onSuggestionsFetchRequested({ value }) {
		this.suggestions = this.getSuggestions(value);
  }*/
  
  onSuggestionsFetchRequested({ value }) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if(inputLength === 0) {
      this.suggestions = [];
    }
    else {
      console.log(this.suggestions);
      this.suggestions = this.suggestions.filter(sug =>
        sug.toLowerCase().slice(0, inputLength) === inputValue
      );
    }
	}

	onSuggestionsClearRequested() {
		this.suggestions = [];
	}

  render() {
    /*return (
      <div className="wrapper">
        <Autosuggest
          theme={this.theme}
          suggestions={[this.suggestions]}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionSelected={this.props.select}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={this.inputProps}
        />
      </div>
    );*/
    return (<div>Moi</div>)
  }
};

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