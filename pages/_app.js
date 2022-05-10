import Layout from "../components/Layout";
import { UiContextProvider } from "../context/UiContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<UiContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UiContextProvider>
	);
}

export default MyApp;
