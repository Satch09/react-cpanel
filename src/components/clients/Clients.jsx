import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class Clients extends Component {
	state = {
		totalOwed: null
	}
	static getDerivedStateFromProps(props, state) {
	const {clients} = props;
		if(clients) {
		const total = clients.reduce((total, client) => {
			return total+= parseFloat(client.balance.toString())
		}, 0);
	return {totalOwed: total}
}
return null;
	}
	render() {
		const {clients} = this.props;
		const {totalOwed} = this.state;
		if(clients){
			return (
				<div className="">
					<div className="row">
						<div className="col-md-6">
							<h2>
								{' '}
								<i className="fas fa-users"/> Clients{' '}
							</h2>
						</div>
						<div className="col-md-6">
							<h5 className="text-right text-secondary">
								Total{' '}
								<span className="text-primary">
								R{parseFloat(totalOwed).toFixed(2)}
								</span>
							</h5>
						</div>
						<table className="table table-striped">
							<thead className="thead-inverse">
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Balance</th>
									<th/>
								</tr>
							</thead>
							<tbody>
								{clients.map(client => (
									<tr key={client.id}>
										<td> {client.firstName} {client.lastName} </td>
										<td>{client.email}</td>
										<td>R{parseFloat(client.balance).toFixed(2)}</td>
										<td>
											<Link className="btn btn-secondary brn-sm" to={`/client/${client.id}`}>
												<i className="fas fa-arrow-circle-right"></i> Details
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			);
		} else {
			return <Spinner/>;
		}
	}
}
Clients.propTypes = {
	firestore: PropTypes.object.isRequired,
	clients: PropTypes.array
};

export default compose(
	firestoreConnect([{
		collection: 'clients'
	}]),
	connect((state, props) => ({
		clients: state.firestore.ordered.clients
	}))
)(Clients);
