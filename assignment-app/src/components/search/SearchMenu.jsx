import { useState } from "react";
import { useSearch, CATEGORIES } from "../../context/SearchContext";

export default function SearchQuery() {
	const { data, fetchData } = useSearch();
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [inputError, setInputError] = useState(false);

	// Category drop callback; manages selectedCategory state
	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	// Search input callback; manages searchValue state
	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	// Search button submitted; fetches new data OR displays error message; manages error state
	const handleSearchSubmit = () => {
		// If category isn't selected and there isn't a search value, then return all records
		// Otherwise, we show the user and error message
		if (selectedCategory === "" && searchValue !== "") {
			setInputError(true);
			return;
		} else {
			setInputError(false);
		}
		fetchData({ query: selectedCategory, queryValue: searchValue });
	};

	// Resets fields to blank; selectedCategory and searchValue states
	const handleClear = () => {
		setSelectedCategory("");
		setSearchValue("");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-4">
					<p className="mb-3">
						Select data point to filter search by
					</p>
					<select
						className="form-select mb-3"
						value={selectedCategory}
						onChange={handleCategoryChange}
					>
						<option value="">Select a category</option>
						{Object.entries(CATEGORIES).map(([key, value]) => (
							<option key={key} value={key}>
								{value}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<input
						type="text"
						className={`form-control ${
							inputError ? "border-danger" : ""
						}`}
						placeholder="Search By Keyword"
						value={searchValue}
						onChange={handleSearchChange}
					/>
					{inputError && ( // Here we display the error message
						<div className="text-danger small mt-2">
							Please select a category
						</div>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<button
						className="btn btn-light border border-black w-100 mt-3"
						type="button"
						onClick={() => {
							handleSearchSubmit();
							handleClear();
						}}
					>
						Search
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<p className="mt-3">Displaying {data.length} Records</p>
				</div>
			</div>
		</div>
	);
}
