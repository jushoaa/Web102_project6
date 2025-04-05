import React, { useState, useEffect } from 'react';

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      // If search box is empty, clear results
      if (searchQuery.trim() === '') {
        setResults([]);
        return;
      }
      try {
        const response = await fetch(
          `${BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error searching breweries:", error);
      }
    };

    fetchSearch();
  }, [searchQuery]);

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search breweries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '5px', width: '300px' }}
      />

      {results.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {results.map((brewery) => (
              <tr key={brewery.id}>
                <td>{brewery.name}</td>
                <td>{brewery.city}</td>
                <td>{brewery.state}</td>
                <td>{brewery.brewery_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Search;
