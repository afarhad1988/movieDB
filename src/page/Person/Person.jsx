import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Person = () => {
	const {id} = useParams()
	const[person, setPerson] = useState([])
	useEffect(()=>{
		axios(``)
	},[id])
	return (
			<div className='container'>
				Person
			</div>
	);
};
export default Person;
