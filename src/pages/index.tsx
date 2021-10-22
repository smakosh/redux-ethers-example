import { useEffect } from "react";
import Link from "next/link";
import { Button, Typography } from "ontwik-ui";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import LoginWithMetamask from "features/auth/modules/LoginWithMetamask";
import { RootState } from "utils/store";
import { save, clear } from "features/auth/redux/userSlice";
import getNetwork from "helpers/getNetwork";
import getShortAddress from "helpers/getShortAddress";

const Home = () => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const requestAccount = async () => {
		if ((window as any).ethereum) {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum,
				"any"
			);
			const { chainId } = await provider.getNetwork();
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			dispatch(
				save({
					address,
					shortAddress: getShortAddress(address),
					network: getNetwork(chainId),
				})
			);
		} else {
			alert("Please Install MetaMask");
		}
	};

	useEffect(() => {
		requestAccount();
	}, []);

	const handleDisconnect = () => {
		dispatch(clear());
	};

	return (
		<div>
			{!user.data?.address ? (
				<LoginWithMetamask onLogin={requestAccount} />
			) : (
				<div>
					<div>
						<div>
							<Link href="/profile">
								<a>Go to profile</a>
							</Link>
						</div>
						<div>
							<Link href="/dashboard">
								<a>Go to dashboard</a>
							</Link>
						</div>
					</div>
					<div>
						<Typography variant="subtitle">Network</Typography>
						<Typography variant="content">{user.data?.network}</Typography>
					</div>
					<div>
						<Typography variant="subtitle">Address</Typography>
						<Typography variant="content">{user.data?.address}</Typography>
					</div>
					<Button
						title="Disconnect"
						variant="secondary"
						size="medium"
						onClick={() => handleDisconnect()}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
