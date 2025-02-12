import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

// Instead of a list I used an Object for a cleaner UI/UX
export const CATEGORIES = {
	model: "Device Model",
	gender: "Gender",
	operatingSystem: "Operating System",
	behaviorClass: "User Behavior Class",
	// ... Other filters as necessary can be added here...
};

//// query and queryValue must be present to filter data
// const filterData = (query, queryValue, data) => {
// 	return !query || !queryValue
// 		? data
// 		: data.filter((item) => {
// 				return item[CATEGORIES[query]]
// 					.toLowerCase()
// 					.includes(queryValue.toLowerCase());
// 		  });
// };

export function SearchProvider({ children }) {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);


	/*
	@param params: Object {query, queryValue} for data filtering

	fetches data from the API with params, sets local states such as data, isLoading, and error
	*/
	const fetchData = (params = { query: "", queryValue: "" }) => {
		// Build URL based on params
		let url = "/api/data/search";
		if (params.query) {
			url += `?filterType=${params.query}`;
			// Only use queryValue AKA keyword if query AKA filterType is provided
			if (params.queryValue) {
				url += `&keyword=${params.queryValue.toLocaleLowerCase()}`;
			}
		}
		fetch(url)
			.then((response) => {
				setIsLoading(true);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Testing server delay
				setTimeout(() => {
					setData(data);
					setIsLoading(false);
				}, 1000);
				// Testing errors
				// throw new Error(`ERROR 500 Records failed to load`)
			})
			.catch((error) => {
				setError({
					message: `ERROR FETCHING DATA: ${error.message}; Please try again later.`,
					supportMessage: `You can contact support at `,
					supportEmail: "support@example.com",
				});
				setIsLoading(false);
			});
	};

	// Initalize data on first load
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<SearchContext.Provider
			value={{ data, isLoading, error, query, setQuery, fetchData }}
		>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearch() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
}
