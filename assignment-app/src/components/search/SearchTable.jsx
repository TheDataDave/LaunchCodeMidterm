import { useSearch } from "../../context/SearchContext";
import Loading from "../Loading";

export default function SearchTable() {
	const { data, error, isLoading } = useSearch();

	// Dynamically get table headers from dataset
	const keys = !data || data?.length === 0 ? [] : Object.keys(data[0]);

	return (
		<div className="container mt-4">
			{isLoading ? ( 						// First check loading state
				<Loading label="Loading Records..." />
			) : error ? ( 						// Second check error state
				<div className="alert alert-danger" role="alert">
					<p className="fg-red">{error.message}</p>
					<p className="fg-red">{error.supportMessage}<a href='#'>{error.supportEmail}</a></p>
				</div>
			) : !data || data?.length === 0 ? ( // Third verfiy data is present
				<p>No Records To Display</p>
			) : ( 								// Finally display data
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								{keys.map((key) => (
									<th key={key} scope="col">
										{key}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={index}>
									{keys.map((key) => (
										<td key={key}>{item[key]}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
