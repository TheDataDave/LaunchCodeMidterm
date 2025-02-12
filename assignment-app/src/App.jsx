import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PageNotFound404 from "./pages/PageNotFound404";
import { SearchProvider } from "./context/SearchContext";

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
			<SearchProvider> {/* Wrap context around the routes so we don't lose the state */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="*" element={<PageNotFound404 />} />
				</Routes>
			</SearchProvider>
		</div>
	);
}

export default App;
