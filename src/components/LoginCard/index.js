import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginCard extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  requestSuccessful = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const data = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()

    if (response.ok === true) {
      this.requestSuccessful(responseData.jwt_token)
      this.setState({
        username: '',
        password: '',
      })
    } else {
      this.setState({errorMsg: responseData.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  usernameInputContainer = () => {
    const {username} = this.state
    return (
      <div className="login-section-input-container">
        <label className="login-section-label-description" htmlFor="username">
          USERNAME
        </label>
        <input
          value={username}
          onChange={this.onChangeUsername}
          className="login-section-input-element"
          type="text"
          id="username"
          placeholder="Username"
        />
      </div>
    )
  }

  passwordInputContainer = () => {
    const {password} = this.state
    return (
      <div className="login-section-input-container">
        <label className="login-section-label-description" htmlFor="password">
          PASSWORD
        </label>
        <input
          value={password}
          onChange={this.onChangePassword}
          className="login-section-input-element"
          type="password"
          id="password"
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="jobby-app-login-bg-container">
        <div className="jobby-app-login-box-container">
          <form
            className="login-form"
            data-testid="loginForm"
            onSubmit={this.onSubmitForm}
          >
            <div className="website-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo"
              />
            </div>
            {this.usernameInputContainer()}
            {this.passwordInputContainer()}
            <button
              type="submit"
              data-testid="loginButton"
              className="login-button"
            >
              Login
            </button>
            <p className="error-msg">{errorMsg !== '' ? `*${errorMsg}` : ''}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginCard
