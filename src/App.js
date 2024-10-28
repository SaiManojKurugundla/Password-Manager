import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colors = [
  'yellow',
  'green',
  'orange',
  'lightgreen',
  'red',
  'white',
  'blue',
]

class App extends Component {
  state = {
    intialList: [],
    websiteNameInput: '',
    userNameInput: '',
    passwordInput: '',
    searchInput: '',
    showPassword: false,
    isActive: false,
  }

  onSubmitButton = event => {
    event.preventDefault()
    const {websiteNameInput, userNameInput, passwordInput} = this.state
    const intialValue = websiteNameInput.slice(0, 1).toUpperCase()
    const backgroundColor = colors[Math.floor(Math.random() * 6)]
    console.log(backgroundColor)
    const newList = {
      id: uuidv4(),
      websitename: websiteNameInput,
      userName: userNameInput,
      password: passwordInput,
      intialLetter: intialValue,
      color: backgroundColor,
    }

    this.setState(prevState => ({
      intialList: [...prevState.intialList, newList],
      websiteNameInput: '',
      userNameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  onChangeWebsiteName = event => {
    this.setState({websiteNameInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteButton = id => {
    const {intialList} = this.state
    const updatedList = intialList.filter(eachList => eachList.id !== id)
    this.setState({intialList: updatedList})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({showPassword: true})
    } else {
      this.setState({showPassword: false})
    }
  }

  render() {
    const {
      intialList,
      websiteNameInput,
      userNameInput,
      passwordInput,
      searchInput,
      showPassword,
    } = this.state

    let {isActive} = this.state

    const filteredList = intialList.filter(eachList =>
      eachList.websitename.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = filteredList.length

    if (filteredList.length === 0) {
      isActive = false
    } else {
      isActive = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="main-logo"
        />
        <div className="cards-container">
          <div className="top-card-container">
            <form className="form-container" onSubmit={this.onSubmitButton}>
              <h1 className="add-password-text">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteName}
                  value={websiteNameInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={userNameInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="logo"
                />
                <input
                  type="Password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </div>
          </div>
          <div className="bottom-card-container">
            <div className="top-section">
              <div className="your-password-con">
                <h1 className="your-password-text">Your Passwords</h1>
                <p className="count-number">{count}</p>
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="logo"
                />
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  onChange={this.onSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <div className="checkBox-container">
              <input
                type="checkbox"
                className="check-box"
                id="check"
                onChange={this.showPassword}
              />
              <label htmlFor="check" className="label-showPassword">
                Show passwords
              </label>
            </div>

            {!isActive && (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            )}

            <ul className="detail-card-container">
              {filteredList.map(eachList => (
                <li className="list-container" key={eachList.id}>
                  <p className={`profile ${eachList.color}`}>
                    {eachList.intialLetter}
                  </p>
                  <div>
                    <p>{eachList.websitename}</p>
                    <p>{eachList.userName}</p>
                    {showPassword && <p>{eachList.password}</p>}
                    {!showPassword && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => this.onDeleteButton(eachList.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
