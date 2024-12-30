import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const JobItemCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item-card-container">
      <Link to={`/jobs/${id}`} className="job-item-card-container-navlink">
        <div className="job-item-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-company-logo"
          />
          <div>
            <h1 className="job-item-card-main-heading">{title}</h1>
            <div className="job-item-icons">
              <BsStarFill size={15} color="#fbbf24" />
              <p className="job-item-icon-Description">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-info">
          <div className="job-location-and-employmentType-container">
            <div className="job-item-icons">
              <IoLocationOutline size={20} color="#f1f5f9" />
              <p className="job-item-icon-Description">{location}</p>
            </div>
            <div className="job-item-icons">
              <BsFillBriefcaseFill size={20} color="#f1f5f9" />
              <p className="job-item-icon-Description">{employmentType}</p>
            </div>
          </div>
          <p className="package-details">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="job-item-card-titles">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItemCard
