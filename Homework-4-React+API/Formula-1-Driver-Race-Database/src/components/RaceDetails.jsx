import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function RaceDetails() {
  const { sessionKey } = useParams();
  const [race, setRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getRace() {
      try {
        const response = await fetch(`https://api.openf1.org/v1/sessions?session_key=${encodeURIComponent(sessionKey)}`);
        if (!response.ok) throw new Error('Could not load this race.');
        const data = await response.json();
        setRace(data[0] || null);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    }
    getRace();
  }, [sessionKey]);

  if (loading) return <p className="message">Loading race...</p>;
  if (error || !race) return <div className="message error">{error || 'Race not found.'}<p><Link to="/races">Back to races</Link></p></div>;

  return (
    <section className="detail-page">
      <Link className="back-link" to="/races">← All races</Link>
      <p className="eyebrow">RACE SESSION · {race.year}</p>
      <h1>{race.circuit_short_name}</h1>
      <p className="detail-subtitle">{race.circuit_short_name} · {race.country_name}</p>
      <div className="detail-facts race-facts">
        <div><small>LOCATION</small><strong>{race.location || '—'}</strong></div>
        <div><small>SESSION</small><strong>{race.session_name || '—'}</strong></div>
        <div><small>DATE</small><strong>{race.date_start ? new Date(race.date_start).toLocaleDateString() : '—'}</strong></div>
        <div><small>SESSION KEY</small><strong>{race.session_key}</strong></div>
      </div>
      {race.circuit_image && <img className="circuit-image" src={race.circuit_image} alt={`${race.circuit_short_name} circuit`} />}
    </section>
  );
}

export default RaceDetails;
