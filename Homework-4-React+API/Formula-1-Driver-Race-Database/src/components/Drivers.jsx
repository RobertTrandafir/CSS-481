import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'https://api.openf1.org/v1';

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getDrivers() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${API}/drivers?session_key=latest`);
        if (!response.ok) throw new Error('Could not load drivers. Please try again.');
        const data = await response.json();
        // Remove duplicate drivers
        const uniqueDrivers = data.filter((driver, index, self) =>
          index === self.findIndex((item) => item.driver_number === driver.driver_number)
        );
        setDrivers(uniqueDrivers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getDrivers();
  }, []);

  const filteredDrivers = drivers.filter((driver) => {
    const text = submittedSearch.toLowerCase();
    return driver.full_name?.toLowerCase().includes(text) ||
      driver.team_name?.toLowerCase().includes(text) ||
      String(driver.driver_number).includes(text);
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Drivers</h1>
        <p>Search the drivers from the latest available session.</p>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input value={search} onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by driver, team, or number..." aria-label="Search drivers" />
        <button className="button" type="submit">Search</button>
      </form>

      {loading && <p className="message">Loading drivers...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && filteredDrivers.length === 0 && <p className="message">No drivers found. Try another search.</p>}

      <div className="card-grid">
        {filteredDrivers.map((driver) => (
          <Link className="data-card driver-card" to={`/drivers/${driver.driver_number}`} key={driver.driver_number}>
            <div className="card-top"><span className="driver-number">{driver.driver_number}</span><span className="arrow">↗</span></div>
            {driver.headshot_url ? <img className="driver-photo" src={driver.headshot_url} alt={driver.full_name} /> : <div className="photo-placeholder">F1</div>}
            <h2>{driver.full_name}</h2>
            <p className="team-name" style={{ borderColor: `#${driver.team_colour || 'e10600'}` }}>{driver.team_name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Drivers;
