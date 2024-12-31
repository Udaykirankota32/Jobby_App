import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'
import './index.css'

const JobItemDetailsCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <div className="job-item-details-card">
      <div className="job-item-details-card-header">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-logo"
        />
        <div className="job-item-details-card-header-content">
          <h1 className="job-item-details-card-main-heading">{title}</h1>
          <div className="job-item-details-card-icons">
            <BsStarFill size={15} color="#fbbf24" />
            <p className="job-item-details-icon-Description">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-item-details-info">
        <div className="job-item-details-location-and-employmentType-container">
          <div className="job-item-details-card-icons">
            <IoLocationOutline size={20} color="#f1f5f9" />
            <p className="job-item-details-icon-Description">{location}</p>
          </div>
          <div className="job-item-details-card-icons">
            <BsFillBriefcaseFill size={20} color="#f1f5f9" />
            <p className="job-item-details-icon-Description">
              {employmentType}
            </p>
          </div>
        </div>
        <p className="job-item-package-details">{packagePerAnnum}</p>
      </div>
      <hr className="horizontal-line" />
      <ul className="job-item-details-full-info-list">
        <li className="visit-link-position-style">
          <h1 className="job-item-details-card-titles">Description</h1>
          <div className="job-item-details-card-icons">
            <a
              className="job-item-details-visit-link"
              href={companyWebsiteUrl}
              target="__blank"
            >
              Visit
            </a>
            <BiLinkExternal color="#4f46e5" />
          </div>
        </li>
        <li>
          <p className="job-item-details-description">{jobDescription}</p>
          <h1 className="job-item-details-card-titles">skills</h1>
          <ul className="job-item-details-card-skills-list">
            {skills.map(eachSkill => (
              <li className="skills-list-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h1 className="job-item-details-card-titles">Life at Company</h1>
          <div className="company-life-style-description-container">
            <p className="job-item-details-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default JobItemDetailsCard
