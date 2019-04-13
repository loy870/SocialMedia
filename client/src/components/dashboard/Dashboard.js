import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (profile == null || loading) {
			dashboardContent = <h1>Loading...</h1>;
		} else {
			dashboardContent = <h1>Hello</h1>;
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div classNAme="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard </h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToPropos = (state) => ({
	profile: state.profile,
	auth: state.auth
});

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(mapStateToPropos, { getCurrentProfile })(Dashboard);
