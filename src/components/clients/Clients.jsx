import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Clients extends Component {
	render() {
		const clients = [ {
			id: '123213',
			firstName: 'Johnny',
			lastName: 'Smithy',
			email: 'johnny@gmail.com',
			phone: '1232432',
			balance: '55.056'
		} ];
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
		}
		return (
			<div>
				<h1>Clients</h1>
			</div>
		);
	}
}

export default Clients;
