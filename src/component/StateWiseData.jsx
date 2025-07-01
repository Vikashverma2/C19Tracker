import React, { useEffect, useState } from "react";


const StateWiseData = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        const json = await res.json();
        setStates(json.data.regional);
        setFilteredStates(json.data.regional);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = states.filter((state) =>
      state.loc.toLowerCase().includes(query)
    );
    setFilteredStates(filtered);
  };


  if (loading) return <p className="loading">Loading state-wise data...</p>;

  return (
    <div className="statewise-container">
      <h3> India State-Wise COVID-19</h3>

      <input
        type="text"
        placeholder="Search state..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="covid-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Confirmed</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {filteredStates.length > 0 ? (
            filteredStates.map((st) => (
              <tr key={st.loc}>
                <td>{st.loc}</td>
                <td>{st.totalConfirmed.toLocaleString()}</td>
                <td>{st.discharged.toLocaleString()}</td>
                <td>{st.deaths.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No matching state found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StateWiseData;
