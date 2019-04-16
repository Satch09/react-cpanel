import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
//import { firebase } from 'firebase';
//import PropTypes from 'prop-types';


class AppNavbar extends Component {
  state = {
    isAuthenticated: false,
    currentUser: ''
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true, currentUser: user })
      } else {
        this.setState({ isAuthenticated: false, currentUser: '' })
      }
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    const { firebase } = this.props;
    this.setState({ isAuthenticated: false })
    firebase.logout();
  };
  render() {
    const { currentUser } = this.state;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {(currentUser !== '') ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {(currentUser !== '') ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {currentUser.email}
                    {currentUser.metadata.lastSignInTime}
                  </a>
                </li>

                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))
)(AppNavbar);
