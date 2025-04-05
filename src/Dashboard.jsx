import React, { useState, useEffect } from 'react';

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(`${BASE_URL}?per_page=25`);
        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error("Error fetching breweries:", error);
      }
    };
    fetchBreweries();
  }, []);

  // Filter breweries by search query
  const filteredBreweries = breweries.filter(brewery =>
    brewery.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate state counts and micro counts
  const stateCounts = {};
  const stateMicroCounts = {};

  breweries.forEach(brewery => {
    const state = brewery.state;
    if (state) {
      stateCounts[state] = (stateCounts[state] || 0) + 1;
      if (brewery.brewery_type === 'micro') {
        stateMicroCounts[state] = (stateMicroCounts[state] || 0) + 1;
      }
    }
  });

  // Determine state with the most breweries
  let stateMostBreweries = '';
  let maxCount = 0;
  Object.entries(stateCounts).forEach(([state, count]) => {
    if (count > maxCount) {
      maxCount = count;
      stateMostBreweries = state;
    }
  });

  // Determine state with the most micro breweries
  let stateMostMicro = '';
  let maxMicroCount = 0;
  Object.entries(stateMicroCounts).forEach(([state, count]) => {
    if (count > maxMicroCount) {
      maxMicroCount = count;
      stateMostMicro = state;
    }
  });

  // Average number of breweries per state
  const uniqueStatesCount = Object.keys(stateCounts).length;
  const averageBreweriesPerState = uniqueStatesCount > 0 
    ? (breweries.length / uniqueStatesCount).toFixed(2) 
    : 0;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Summary Statistics */}
      <section>
        <h2>Summary Statistics</h2>
        <div className="stats-container">
          <div className="stat-box">
            <h3>State with Most Breweries</h3>
            <p>{stateMostBreweries} ({maxCount} breweries)</p>
          </div>
          <div className="stat-box">
            <h3>State with Most Micro Breweries</h3>
            <p>{stateMostMicro} ({maxMicroCount} micro breweries)</p>
          </div>
          <div className="stat-box">
            <h3>Avg. Breweries per State</h3>
            <p>{averageBreweriesPerState}</p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search breweries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '100%', maxWidth: '400px' }}
        />
      </section>

      {/* Brewery List */}
      <section>
        <h2>Brewery List</h2>
        {filteredBreweries.length === 0 ? (
          <p>No breweries match your search criteria.</p>
        ) : (
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            style={{ borderCollapse: 'collapse', width: '100%' }}
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
              {filteredBreweries.map(brewery => (
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
      </section>
    </div>
  );
}

export default Dashboard;
