import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const apiCallStatusValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProfileAndFilterCard extends Component {
  state = {
    userProfileDetails: {},
    profileApiStatus: apiCallStatusValues.initial,
  }

  componentDidMount() {
    this.apiCallForProfileDetails()
  }

  apiCallForProfileDetails = async () => {
    this.setState({profileApiStatus: apiCallStatusValues.loading})
    const apiUrl = 'https://apis.ccbp.in/profile'
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
      const newData = {
        profileDetails: data.profile_details,
      }
      const {profileDetails} = newData
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        userProfileDetails: updatedProfileDetails,
        profileApiStatus: apiCallStatusValues.success,
      })
    } else {
      this.setState({profileApiStatus: apiCallStatusValues.failure})
    }
  }

  successfulViewOfProfileCard = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="user-profile-card">
        <img src={profileImageUrl} alt="profile" className="user-profile-pic" />
        <h1 className="user-profile-name">{name}</h1>
        <p className="uesr-profile-role">{shortBio}</p>
      </div>
    )
  }

  loadingViewforProfileCard = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="30" width="30" />
    </div>
  )

  FailureViewforProfileCard = () => (
    <>
      <button
        type="button"
        data-testid="ProfileRetryButton"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </>
  )

  onClickRetry = () => {
    this.apiCallForProfileDetails()
  }

  displayingOfProfileCard = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiCallStatusValues.success:
        return this.successfulViewOfProfileCard()
      case apiCallStatusValues.loading:
        return this.loadingViewforProfileCard()
      case apiCallStatusValues.failure:
        return this.FailureViewforProfileCard()
      default:
        return null
    }
  }

  onClickEmploymentTypeCheckbox = event => {
    const {onSetEmploymetType} = this.props
    onSetEmploymetType(event.target.value)
  }

  onClickSalaryRangeFilter = event => {
    const {onSetSalaryRange} = this.props
    onSetSalaryRange(event.target.value)
  }

  employmentTypesListFilterContainer = () => {
    const {employmentTypesList} = this.props
    return (
      <>
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filter-items-list">
          {employmentTypesList.map(eachItem => (
            <li className="input-container" key={eachItem.employmentTypeId}>
              <input
                onChange={this.onClickEmploymentTypeCheckbox}
                id={`checkbox ${eachItem.label}`}
                type="checkbox"
                value={eachItem.employmentTypeId}
                className="checkbox filter-input-element"
              />
              <label
                htmlFor={`checkbox ${eachItem.label}`}
                className="label-text"
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  salaryRangesListFilterContainer = () => {
    const {salaryRangesList} = this.props
    return (
      <>
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filter-items-list">
          {salaryRangesList.map(eachItem => (
            <li className="input-container" key={eachItem.salaryRangeId}>
              <input
                onChange={this.onClickSalaryRangeFilter}
                name="salary"
                type="radio"
                id={`checkbox ${eachItem.label}`}
                value={eachItem.salaryRangeId}
                className="radio filter-input-element"
              />
              <label
                htmlFor={`checkbox ${eachItem.label}`}
                className="label-text"
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {employementType} = this.state
    const {searchValue, onSearchJobs} = this.props
    console.log(employementType)
    return (
      <div className="user-profile-and-filter-section-container">
        <div className="jobs-search-container jobs-search-container-mobile-view">
          <input
            onChange={onSearchJobs}
            type="search"
            value={searchValue}
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
        <div className="user-profile-card-container">
          {this.displayingOfProfileCard()}
        </div>
        <hr className="horizontal-line" />
        {this.employmentTypesListFilterContainer()}
        <hr className="horizontal-line" />
        {this.salaryRangesListFilterContainer()}
      </div>
    )
  }
}

export default ProfileAndFilterCard
