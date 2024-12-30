import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const SimilarJobsItemCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-jobs-item-card-container">
      <Link className="similar-jobs-item-nav" to={`/jobs/${id}`}>
        <div className="similar-jobs-item-header">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-jobs-company-logo"
          />
          <div>
            <h1 className="similar-jobs-item-main-heading">{title}</h1>
            <div className="similar-jobs-item-icons">
              <BsStarFill size={15} color="#fbbf24" />
              <p className="similar-jobs-item-icon-Description">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-item-card-titles">Description</h1>
        <p className="similar-jobs-item-Description">{jobDescription}</p>
        <div className="similar-jobs-location-and-employmentType-container">
          <div className="similar-jobs-item-icons">
            <IoLocationOutline size={20} color="#f1f5f9" />
            <p className="similar-jobs-item-icon-Description">{location}</p>
          </div>
          <div className="similar-jobs-item-icons">
            <BsFillBriefcaseFill size={20} color="#f1f5f9" />
            <p className="similar-jobs-item-icon-Description">
              {employmentType}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobsItemCard
