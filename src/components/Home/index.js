import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />

    <div className="home-section-bg-container">
      <div className="home-section-container">
        <h1 className="home-section-main-title">
          Find The Job That Fits Your Life
        </h1>
        <p className="home-section-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          type="button"
          data-testid="findJobsButton"
          className="find-jobs-button"
        >
          <Link className="nav-link" to="/jobs">
            Find Jobs
          </Link>
        </button>
      </div>
    </div>
  </>
)

export default Home
