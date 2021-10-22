import { Typography } from "ontwik-ui";
import { useSelector } from "react-redux";
import { RootState } from "utils/store";

const Profile = () => {
	const user = useSelector((state: RootState) => state.user.data);

	return (
		<div>
			<Typography variant="title">User Address</Typography>
			<Typography variant="subtitle">{user?.shortAddress}</Typography>
		</div>
	);
};

export default Profile;
