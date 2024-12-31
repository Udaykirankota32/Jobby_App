import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItemDetailsCard from '../JobItemDetailsCard'
import SimilarJobsItemCard from '../SimilarJobsItemCard'
import Header from '../Header'
import './index.css'

const apiCallStatusValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    activeJobDetailsData: {},
    jobDetailsApiStatus: apiCallStatusValues.initial,
  }

  componentDidMount() {
    this.apiCallForJobItemDetails()
  }

  apiCallForJobItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiCallStatusValues.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        title: jobDetails.title,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }

      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const newUpdatedData = {
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      }
      this.setState({
        activeJobDetailsData: newUpdatedData,
        jobDetailsApiStatus: apiCallStatusValues.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiCallStatusValues.failure})
    }
  }

  displayJobitemDetailsView = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiCallStatusValues.success:
        return this.jobitemDetailsSuccessView()
      case apiCallStatusValues.loading:
        return this.jobItemDetailsLoadingView()
      case apiCallStatusValues.failure:
        return this.jobItemDetailsFailureView()
      default:
        return null
    }
  }

  jobitemDetailsSuccessView = () => {
    const {activeJobDetailsData} = this.state
    const {similarJobs, jobDetails} = activeJobDetailsData
    return (
      <div className="job-item-details-container">
        <JobItemDetailsCard jobDetails={jobDetails} />
        <h1 className="job-details-main-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <SimilarJobsItemCard similarJobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  jobItemDetailsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobItemDetailsFailureView = () => (
    <div className="job-item-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        data-testid="JobItemDetailsRetryButton"
        onClick={this.apiCallForJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          {this.displayJobitemDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
