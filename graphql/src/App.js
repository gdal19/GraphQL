import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_SUGGESTIONS = gql`
  query GetSuggestions($query: String!) {
    suggestions(query: $query)
  }
`;

const App = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [getSuggestions, { loading }] = useLazyQuery(GET_SUGGESTIONS);

  useEffect(() => {
    if (query.length >= 4) {
      const timer = setTimeout(() => {
        getSuggestions({ variables: { query } })
          .then(({ data }) => {
            setSuggestions(data?.suggestions || []);
            setShowSuggestions(true);
          });
      }, 300); // Debounce de 300ms

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, getSuggestions]);

  const highlightMatch = (suggestion) => {
    const index = suggestion.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return suggestion;

    return (
      <>
        {suggestion.substring(0, index)}
        <strong>{suggestion.substring(index, index + query.length)}</strong>
        {suggestion.substring(index + query.length)}
      </>
    );
  };

  return (
    <Container>
      <Title>Search with Autocomplete</Title>
      <SearchContainer>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type at least 4 characters..."
        />
        {showSuggestions && (
          <SuggestionsList>
            {loading ? (
              <SuggestionItem>Loading...</SuggestionItem>
            ) : suggestions.length > 0 ? (
              suggestions.slice(0, 10).map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {highlightMatch(suggestion)}
                </SuggestionItem>
              ))
            ) : (
              <SuggestionItem>No suggestions found</SuggestionItem>
            )}
          </SuggestionsList>
        )}
      </SearchContainer>
    </Container>
  );
};

// Estilos com styled-components
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100;
`;

const SuggestionItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  strong {
    font-weight: bold;
    color: #4CAF50;
  }
`;

export default App;