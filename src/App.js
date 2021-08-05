import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoardComponent from "./components/JobBoardComponent";

function App() {
	const [jobs, setJobs] = useState([]);
	const [filters, setFilters] = useState([]);

	useEffect(() => setJobs(data), []);

	const filterFunc = ({ role, level, tools, languages }) => {
		if (filters.length === 0) {
			return true;
		}

		const tags = [role, level];
		if (tools) {
			tags.push(...tools);
		}

		if (languages) {
			tags.push(...languages);
		}

		return filters.every((filter) => tags.includes(filter));
	};

	const handleTagClick = (tag) => {
		//avoid readding tag
		if (filters.includes(tag)) return;

		setFilters([...filters, tag]);
	};

	const handleFilterClick = (passedFilter) => {
		setFilters(filters.filter((f) => f !== passedFilter));
	};

	const filteredJobs = jobs.filter(filterFunc);

	const clearFilters = () => {
		setFilters([]);
	};

	return (
		<>
			<header className="bg-blue-500 mb-12">
				<img
					className="w-full"
					src="./images/bg-header-desktop.svg"
					alt="bg-image"
				/>
			</header>
			<div className="container m-auto">
				{filters.length > 0 && (
					<div
						className={`flex flex-wrap bg-white shadow-md -my-20 mb-16 mx-10 p-6 rounded z-10 relative`}
					>
						{filters.map((filter) => (
							<span
								className="cursor-pointer mr-4 my-1 rounded font-bold"
								onClick={() => handleFilterClick(filter)}
							>
								<span className="text-blue-500 bg-blue-100  p-2 ">
									{" "}
									{filter}
								</span>
								<span className="bg-blue-500 text-blue-100 p-2 ">
									×
								</span>
							</span>
						))}
						<button
							className="font-bold text-gray-700 ml-auto"
							onClick={clearFilters}
						>
							Clear
						</button>
					</div>
				)}
				{jobs.length === 0 ? (
					<p>Jobs are fetching...</p>
				) : (
					filteredJobs.map((job) => (
						<JobBoardComponent
							job={job}
							key={job.id}
							handleTagClick={handleTagClick}
						/>
					))
				)}
			</div>
		</>
	);
}

export default App;

// TODOS
// 1: Study the design and JSON DONE
// 2: Create the Job Board Component DONE
// 3: Get the data from the JSON DONE
// 4: Pass down the data to the job board component (JBC) DONE
// 5: Style it DONE
// STYLE MOBILE
// 6: Filter it
// 7: Filter the data
