import React, { useState, useEffect } from "react";
import countriesData from "./countries.json";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const searchResults = countriesData.filter((country) => {
        const countryName = country.name ? country.name.toLowerCase() : "";
        const countryCapital = country.capital ? country.capital.toLowerCase() : "";
        return (
          countryName.includes(query.toLowerCase()) ||
          countryCapital.includes(query.toLowerCase())
        );
      });
      setFilteredCountries(searchResults);
    } else {
      setFilteredCountries([]);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="App">
      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>Fast Finder Search Bar</h1>
      <div className="search-container">
        <i className="fas fa-search"></i> {/* Search Icon */}
        <input
          type="text"
          placeholder="Search by country or capital..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {showSuggestions && query && (
          <ul className={`suggestions ${filteredCountries.length > 0 ? "show" : ""}`}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(country)}
                >
                  {country.name} ({country.capital})
                </li>
              ))
            ) : (
              <li className="no-results">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
