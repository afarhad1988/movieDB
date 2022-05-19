import React from 'react';
import Films from "../Films";
import Search from "../../components/Search";
import Trends from "../Trends";



const Homepage = () => {
	return (
			<div>
				<Search/>
				<div className="container">
					<Films/>
					<Trends/>
				</div>

			</div>
	);
};
export default Homepage;
