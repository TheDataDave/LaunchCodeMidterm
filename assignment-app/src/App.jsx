/*
Known issues: When initially loading the search page I get a loading message, but 
subsequent page loads have a slight delay.
I've tried (and didn't work): memo, suspense, link: intent, render
*/
import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound404 from "./pages/PageNotFound404";
import Loading from "./components/Loading";

// Don't want to load all of the data when loading the app
const SearchProvider = lazy(() =>
	import("./context/SearchContext").then((module) => ({
		default: module.SearchProvider,
	}))
);
const Search = lazy(() => import("./pages/Search"));

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
				<Link to="/" className="navbar-brand ms-4 nav-link">
					User Behavior Data
				</Link>
				<Link
					to="/search"
					className="navbar-brand ms-4 nav-link text-secondary fs-6 fw-bold"
				>
					Search Through Dataset
				</Link>
			</nav>
			<hr />
			<Suspense fallback={<Loading label="Page loading please wait."/>}>
				<SearchProvider>
					{" "}
					{/* Wrap context around the routes so we don't lose the state */}
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/search" element={<Search />} />
							<Route path="*" element={<PageNotFound404 />} />
						</Routes>
				</SearchProvider>
			</Suspense>
		</div>
	);
}

export default App;
