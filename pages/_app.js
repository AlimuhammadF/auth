import Layout from "../components/Layout";
import { UiContextProvider } from "../context/UiContext";
import "../styles/globals.css";
import "../styles/nprogress.css";
import Router from "next/router";
import nprogress from "nprogress";
import { SessionProvider } from "next-auth/react";

Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeComplete", nprogress.done);
Router.events.on("routeChangeError", nprogress.done);

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<UiContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UiContextProvider>
		</SessionProvider>
	);
}
