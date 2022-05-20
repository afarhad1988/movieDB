import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";
import './Person.css'

const Person = () => {
	const {id} = useParams()
	const[person, setPerson] = useState({})
	const [personLoading, setPersonLoading] = useState(true)
	useEffect(()=>{
		axios(`https://api.themoviedb.org/3/person/${id}?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res)=>{
					setPerson(res.data)
					setPersonLoading(false)
				})
	},[id])
	const formatDate = (date) => {
		const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
		const reversedDate = date.split('-').reverse()
		reversedDate[1] = month[reversedDate[1] - 1]
		return reversedDate.join(' ')
	}
	if(personLoading){
		return <Spinner/>
	}
	return (
			<div className='container'>
				<div className='row'>
					<div className="col-4">
						<img src={person.profile_path ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${person.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
							 alt="" className='person-img'/>
						<h4>Персональная информация</h4>
						<p className='person-about'><b>Известность за: </b><span>{person.known_for_department === 'Acting' ? "Актерское" +
								" исскуство" : "-"}</span></p>
						<p className='person-about'><b>Пол: </b><span>{person.gender === 2 ? "Мужской" : "Женский"}</span></p>
						<p className='person-about'><b>Дата рождения: </b><span>{formatDate(person.birthday)}</span></p>
						<p className='person-about'><b>Место рождения: </b><span>{formatDate(person.place_of_birth)}</span></p>



					</div>

				</div>
			</div>

	);
};
export default Person;
