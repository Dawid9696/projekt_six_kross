import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";
import "./App.scss";
import { setContext } from "@apollo/client/link/context";

//IMPORTED COMPONENTS
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";
import ShopPage from "./components/ShopPage";
import ScrollToTop from "./components/ScrollToTop";
import LoginRegister from "./components/LoginRegister";

export const LogoContext = React.createContext();

const httpLink = createHttpLink({
	uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	const logo =
		"https://kross.eu/media/cache/filemanager_original/images/logo/logo.png";

	return (
		<MyApp>
			<ApolloProvider client={client}>
				<LogoContext.Provider value={logo}>
					<Router>
						<ScrollToTop />
						<Navbar />
						<Switch>
							<Route path={"/"} exact component={MainPage} />
							<Route path={"/Shop"} exact component={ShopPage} />
							<Route path={"/Rowery/:id"} exact component={DetailPage} />
							<Route path={"/LoginRegister"} exact component={LoginRegister} />
						</Switch>
					</Router>
				</LogoContext.Provider>
			</ApolloProvider>
		</MyApp>
	);
}

export default App;

const MyApp = styled.div`
	margin: 0px;
	padding: 0px;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
`;
