import SearchMetrics from "../components/search/SearchMetrics";
import SearchMenu from "../components/search/SearchMenu";
import SearchTable from "../components/search/SearchTable";

export default function Search() {
	return (
		<>
			<SearchMenu /> {/* Left aligned menu for search options */}
			<SearchMetrics/> {/* Center aligned metric data boxes */}
			<SearchTable/> {/* Center aligned table of search results */}
		</>
	)
}
