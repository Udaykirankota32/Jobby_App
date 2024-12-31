import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobsBtn = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <>
      <Header />

      <div className="home-section-bg-container">
        <div className="home-section-container">
          <h1 className="home-section-main-title">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-section-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            onClick={onClickFindJobsBtn}
            type="button"
            data-testid="findJobsButton"
            className="find-jobs-button"
          >
            <Link to="/jobs" className="nav-link">
              Find jobs
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
