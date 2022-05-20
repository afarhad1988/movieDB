import React from 'react';
import Films from "../Films";
import Search from "../../components/Search";




const Homepage = () => {
	return (
			<div>
				<Search/>
				<div className="container">
					<Films/>
				</div>

			</div>
	);
};
export default Homepage;
