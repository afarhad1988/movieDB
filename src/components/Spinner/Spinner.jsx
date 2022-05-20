import React from 'react';
import {FadeLoader} from "react-spinners";
import './Spinner.css'


const Spinner = () => {
	return (
			<div className='spinner'>
				<FadeLoader size={40} color={'#01B4E4FF'}  />
			</div>
	);
};
export default Spinner;
