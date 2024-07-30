import React from "react";

import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import useJWT from "../Hooks/useJWT";

const Profile = () => {
	const { logout } = useJWT();
	const [user, setUser] = React.useState({});

	return (
		<div className="container">
			<Row>
				<UserData label="Name">{user.name}</UserData>
				<UserData label="Family">{user.lastname}</UserData>
			</Row>

			<Row>
				<UserData label="Phone">{user.phone}</UserData>
				<UserData label="Address">{user.address}</UserData>
			</Row>

			<Row>
				<UserData label="Email">{user.email}</UserData>
				<UserData label="Password">{user.password}</UserData>
			</Row>

			<LogoutButton
				onClick={() => {
					logout();
				}}
			/>
		</div>
	);
};

export default Profile;