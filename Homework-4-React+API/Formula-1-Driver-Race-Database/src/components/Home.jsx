import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero">
      <h1>Home</h1>
      <p className="hero-copy">Explore Formula 1 drivers and race weekends with data from the OpenF1 API.</p>
      <a className="hero-link" href="https://openf1.org/">OpenF1 API</a>
      <div className="hero-actions">
        <Link className="button" to="/drivers">Explore drivers <span>↗</span></Link>
        <Link className="button button-outline" to="/races">Browse races <span>↗</span></Link>
      </div>
    </section>
  );
}

export default Home;
