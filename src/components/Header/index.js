import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="jobby-app-navbar">
      <div className="jobby-app-header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="header-section-list-desktop-view">
          <li className="header-section-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="header-section-item">
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
          <li>
            <button
              onClick={onClickLogout}
              type="button"
              data-testid="logoutButton"
              className="logout-button"
            >
              Logout
            </button>
          </li>
        </ul>
        <ul className="header-section-list-mobile-view">
          <li className="header-section-item">
            <Link to="/" className="nav-link">
              <AiFillHome color="#ffffff" size={22} />
            </Link>
          </li>
          <li className="header-section-item">
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill color="#ffffff" size={22} />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-icon-button"
              onClick={onClickLogout}
            >
              <FiLogOut color="#ffffff" size={22} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
