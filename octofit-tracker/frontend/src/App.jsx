import { Link, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function Dashboard() {
  return (
    <section className="hero-panel rounded-4 p-4 p-lg-5 shadow-sm">
      <div className="row align-items-center g-4">
        <div className="col-lg-7 text-start">
          <span className="eyebrow text-uppercase fw-semibold">OctoFit Tracker</span>
          <h1 className="display-4 fw-bold mt-3 mb-3">Train harder. Track smarter. Compete together.</h1>
          <p className="lead text-secondary mb-4">
            A modern fitness platform for logging activities, managing teams, climbing the leaderboard,
            and generating personalized workout suggestions.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/roadmap" className="btn btn-primary btn-lg px-4">
              View roadmap
            </Link>
            <a href="http://localhost:8000/api/health" className="btn btn-outline-dark btn-lg px-4">
              Check API health
            </a>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img src={logo} className="app-logo img-fluid" alt="OctoFit Tracker logo" />
        </div>
      </div>
    </section>
  )
}

function Roadmap() {
  const features = [
    'User authentication and profile management',
    'Activity logging with workout history',
    'Team creation and challenge management',
    'Competitive leaderboard rankings',
    'Personalized workout suggestions',
  ]

  return (
    <section className="roadmap-panel rounded-4 p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <p className="eyebrow text-uppercase fw-semibold mb-2">Product scope</p>
          <h2 className="h1 mb-0">Initialization checklist</h2>
        </div>
        <Link to="/" className="btn btn-outline-dark">
          Back home
        </Link>
      </div>
      <div className="row g-3">
        {features.map((feature) => (
          <div className="col-md-6" key={feature}>
            <article className="feature-card h-100 rounded-4 p-4">
              <h3 className="h5 mb-2">{feature}</h3>
              <p className="mb-0 text-secondary">
                Core scaffolding is now in place for this capability across the React, Express, and MongoDB stack.
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="app-shell container-xl py-4 py-lg-5">
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <Link to="/" className="brand text-decoration-none text-dark d-flex align-items-center gap-3">
          <img src={logo} width="48" height="48" alt="" />
          <div>
            <p className="brand-name mb-0">OctoFit Tracker</p>
            <p className="brand-copy mb-0">React 19 + Express + MongoDB</p>
          </div>
        </Link>
        <nav className="d-flex gap-2">
          <Link to="/" className="btn btn-light border">
            Home
          </Link>
          <Link to="/roadmap" className="btn btn-dark">
            Roadmap
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </main>
  )
}

export default App
