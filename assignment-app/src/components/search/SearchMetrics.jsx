import { useSearch } from "../../context/SearchContext";
import useDataMetrics from "../../hooks/useDataMetrics";
import SearchMetricBlock from "./SearchMetricBlock";

export default function SearchMetrics() {
	const { data, isLoading } = useSearch();
	const { appUsage, screenOnTime, numberOfApps, age } = useDataMetrics(
		data,
		"en-US"
	);

	return (
		<div className="container">
			<div className="row p-3 align-items-stretch">
				{" "}
				<div className="col-md-6 col-lg-3 d-flex">
					{" "}
					<SearchMetricBlock
						title="App Usage Time (min/day)"
						value={appUsage}
						timeRep="Minutes"
						isLoading={isLoading}
					/>
				</div>
				<div className="col-md-6 col-lg-3 d-flex">
					<SearchMetricBlock
						title="Screen On Time (hours/day)"
						value={screenOnTime}
						timeRep="Hours"
						isLoading={isLoading}
					/>
				</div>
				<div className="col-md-6 col-lg-3 d-flex">
					<SearchMetricBlock
						title="Number of Apps Installed"
						value={numberOfApps}
						timeRep="Apps"
						isLoading={isLoading}
					/>
				</div>
				<div className="col-md-6 col-lg-3 d-flex">
					<SearchMetricBlock
						title="Age"
						value={age}
						timeRep="Years Old"
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}
