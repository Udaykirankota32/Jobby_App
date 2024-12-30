import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileAndFilterCard from '../ProfileAndFilterCard'
import JobItemCard from '../JobItemCard'
import './index.css'

const apiCallStatusValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apistatus: apiCallStatusValues.initial,
    jobsList: [],
    activeEmployementTypeList: [],
    salaryRange: '',
    search: '',
  }

  componentDidMount() {
    this.apiCallForJobsSearch()
  }

  apiCallForJobsSearch = async () => {
    this.setState({apistatus: apiCallStatusValues.loading})
    const {activeEmployementTypeList, salaryRange, search} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementTypeList.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    if (response.ok) {
      const {jobs} = responseData
      const updateJobsList = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updateJobsList,
        apistatus: apiCallStatusValues.success,
        activeEmployementTypeList: [],
        salaryRange: '',
      })
    } else {
      this.setState({apistatus: apiCallStatusValues.failure})
    }
  }

  jobsDisplaySuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItemCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsDisplayFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        data-testid="retryButton"
        onClick={this.apiCallForJobsSearch}
      >
        Retry
      </button>
    </div>
  )

  jobsDisplayContainer = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiCallStatusValues.success:
        return this.jobsDisplaySuccessView()
      case apiCallStatusValues.loading:
        return this.loadingView()
      case apiCallStatusValues.failure:
        return this.jobsDisplayFailureView()
      default:
        return null
    }
  }

  searchAndjobsDisplayContainer = () => {
    const {search} = this.state

    return (
      <div className="Jobs-search-and-display-container">
        <div className="jobs-search-container jobs-search-container-desktop-view ">
          <input
            onChange={this.onSearchJobs}
            type="search"
            value={search}
            className="search-input-element"
            placeholder="Search"
          />
          <button
            type="button"
            className="search-button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-display-container">
          {this.jobsDisplayContainer()}
        </div>
      </div>
    )
  }

  onSearchJobs = event => {
    this.setState({search: event.target.value}, this.apiCallForJobsSearch)
  }

  onSetEmploymetType = value => {
    const {activeEmployementTypeList} = this.state
    if (activeEmployementTypeList.includes(value)) {
      this.setState(
        prevState => ({
          activeEmployementTypeList: [
            ...prevState.activeEmployementTypeList.filter(
              eachItem => eachItem !== value,
            ),
          ],
        }),
        this.apiCallForJobsSearch,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmployementTypeList: [
            ...prevState.activeEmployementTypeList,
            value,
          ],
        }),
        this.apiCallForJobsSearch,
      )
    }
  }

  onSetSalaryRange = value => {
    this.setState({salaryRange: value}, this.apiCallForJobsSearch)
  }

  render() {
    const {salaryRangesList, employmentTypesList} = this.props
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="jobs-section-bg-container">
          <ProfileAndFilterCard
            onSetEmploymetType={this.onSetEmploymetType}
            onSetSalaryRange={this.onSetSalaryRange}
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            searchValue={search}
            onSearchJobs={this.onSearchJobs}
          />
          {this.searchAndjobsDisplayContainer()}
        </div>
      </>
    )
  }
}

export default Jobs
