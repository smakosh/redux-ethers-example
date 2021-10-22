import { OntwikProvider } from "ontwik-ui";
import { Provider } from "react-redux";
import { store } from "utils/store";

const AppProviders: React.FC = ({ children }) => (
	<Provider store={store}>
		<OntwikProvider>{children}</OntwikProvider>
	</Provider>
);

export default AppProviders;
