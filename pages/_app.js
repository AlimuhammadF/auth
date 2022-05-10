import Layout from "../components/Layout";
import { UiContextProvider } from "../context/UiContext";
import "../styles/globals.css";
import "../styles/nprogress.css";
import Router from "next/router";
import nprogress from "nprogress";

Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeComplete", nprogress.done);
Router.events.on("routeChangeError", nprogress.done);

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
