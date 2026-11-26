import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Races() {
  const [year, setYear] = useState('2026');
  const [search, setSearch] = useState('');
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // useEffect(() => {
  //   // Load the current year's race sessions when the page first opens.
  //   searchRaces('2026');
  // }, []);

  async function searchRaces(selectedYear) {
    try {
      setLoading(true);
      setError('');
      setHasSearched(true);
      const response = await fetch(`https://api.openf1.org/v1/sessions?year=${encodeURIComponent(selectedYear)}&session_type=Race`);
      if (!response.ok) throw new Error('Could not load races. Please try again.');
      const data = await response.json();
      setRaces(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchRaces(year);
  }

  const filteredRaces = races.filter((race) => {
    const text = search.toLowerCase();
    return race.meeting_name?.toLowerCase().includes(text) ||
      race.country_name?.toLowerCase().includes(text) ||
      race.location?.toLowerCase().includes(text) ||
      race.circuit_short_name?.toLowerCase().includes(text);
  });

  return (
    <section>
      <div className="page-heading">
        <h1>Races</h1>
        <p>Choose a season, then search by Grand Prix, country, or circuit.</p>
      </div>

      <form className="search-form race-search" onSubmit={handleSubmit}>
        <label className="year-field">Season
          <input type="number" min="2023" max="2026" value={year} onChange={(event) => setYear(event.target.value)} />
        </label>
        <button className="button" type="submit">Load season</button>
        <input className="race-filter" value={search} onChange={(event) => setSearch(event.target.value)}
          placeholder="Filter by Grand Prix or country..." aria-label="Filter races" />
      </form>

      {loading && <p className="message">Loading races...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && hasSearched && filteredRaces.length === 0 && <p className="message">No races found. Try another year or search.</p>}

      <div className="race-list">
        {filteredRaces.map((race) => (
          <Link className="race-row" to={`/races/${race.session_key}`} key={race.session_key}>
            <div className="race-date">{race.date_start ? new Date(race.date_start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'TBA'}</div>
            <div className="race-main"><h2>{race.meeting_name}</h2><p>{race.circuit_short_name} · {race.location}, {race.country_name}</p></div>
            <span className="race-year">{race.year}</span><span className="arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Races;
