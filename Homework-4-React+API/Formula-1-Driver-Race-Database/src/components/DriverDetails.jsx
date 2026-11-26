import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function DriverDetails() {
  const { driverNumber } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getDriver() {
      try {
        const response = await fetch(`https://api.openf1.org/v1/drivers?session_key=latest&driver_number=${encodeURIComponent(driverNumber)}`);
        if (!response.ok) throw new Error('Could not load this driver.');
        const data = await response.json();
        setDriver(data[0] || null);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    }
    getDriver();
  }, [driverNumber]);

  if (loading) return <p className="message">Loading driver...</p>;
  if (error || !driver) return <div className="message error">{error || 'Driver not found.'}<p><Link to="/drivers">Back to drivers</Link></p></div>;

  return (
    <section className="detail-page">
      <Link className="back-link" to="/drivers">← All drivers</Link>
      <p className="eyebrow">DRIVER PROFILE</p>
      <div className="detail-layout">
        {driver.headshot_url && <img className="detail-photo" src={driver.headshot_url} alt={driver.full_name} />}
        <div>
          <p className="detail-number">#{driver.driver_number}</p>
          <h1>{driver.full_name}<span>.</span></h1>
          <p className="team-name large-team" style={{ borderColor: `#${driver.team_colour || 'e10600'}` }}>{driver.team_name}</p>
          <div className="detail-facts">
            <div><small>FIRST NAME</small><strong>{driver.first_name || '—'}</strong></div>
            <div><small>LAST NAME</small><strong>{driver.last_name || '—'}</strong></div>
            <div><small>DRIVER CODE</small><strong>{driver.name_acronym || '—'}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DriverDetails;
