import Loading from "../Loading";

export default function SearchMetricBlock({
	title,
	value,
	timeRep,
	isLoading,
}) {
	return (
		<div className="card rounded border-1 shadow-sm h-100 w-100 d-flex">
			<div className="card-body text-center p-2 m-2 d-flex flex-column justify-content-center">
				<h5>{title}</h5>
				{isLoading ? (
					<Loading label="Loading..." />
				) : (
					<>
						<p>
							Average - {value?.average} {timeRep}
						</p>
						<p>
							Median - {value?.median} {timeRep}
						</p>
					</>
				)}
			</div>
		</div>
	);
}
