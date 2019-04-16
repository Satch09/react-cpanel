// import {compose} from 'redux';
// import {connect} from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firebase } from 'firebase';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Login extends Component {
	state = {
		email: 'c@g.com',
		password: 'Qwerty123',
		user: ''
	}

	componentDidMount() {
		this.props.firebase.logout();
	}

	onSubmit = async e => {
		e.preventDefault();
		const { firebase } = this.props;
		const { email, password } = this.state;
		const loggedInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
		this.setState({ user: loggedInUser.user });
		console.log(this.state.user.metadata.lastSignInTime);
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6 mx-auto">
						<div className="card">
							<div className="card-body">
								<h1 className="text-center pb-4 pt-3">
									<span className="text-primary">
										<i className="fas fa-lock"></i>
										Login
									</span>
								</h1>
								<form onSubmit={this.onSubmit}>
									<div className="form-group"><label htmlFor="email">Email</label>
										<input type="text" className="form-control"
											name="email"
											required
											value={this.state.email}
											onChange={this.onChange}
										/>
									</div>
									<div className="form-group"><label htmlFor="password">Password</label>
										<input type="text" className="form-control"
											name="password"
											required
											value={this.state.password}
											onChange={this.onChange}
										/>
									</div>
									<input type="submit" value="Login" className="btn btn-primary btn-block" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default firebaseConnect()(Login);

