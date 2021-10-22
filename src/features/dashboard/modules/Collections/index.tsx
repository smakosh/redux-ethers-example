import { useRouter } from "next/router";
import { Typography } from "ontwik-ui";
import { useSelector } from "react-redux";
import { useGetCollectionsQuery } from "utils/openseaApi";
import { RootState } from "utils/store";

const Collections = () => {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.data);
	const { data, error, isLoading } = useGetCollectionsQuery(user?.address);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user?.address) {
		router.push("/");
		return null;
	}

	if (error) {
		return <pre>{JSON.stringify(error, undefined, 2)}</pre>;
	}

	return (
		<div>
			{data?.map(({ name, image_url }) => (
				<div key={name}>
					<Typography variant="title">{name}</Typography>
					<img src={image_url} alt={name} />
				</div>
			))}
		</div>
	);
};

export default Collections;
