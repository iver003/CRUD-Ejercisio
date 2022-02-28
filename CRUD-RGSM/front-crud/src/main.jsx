import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

const API = import.meta.env.VITE_API_URL;

const client = new ApolloClient({
	connectToDevTools: true,
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: API,
	}),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
