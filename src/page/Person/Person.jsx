import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";
import './Person.css'

const Person = () => {
	const {id} = useParams()
	const [person, setPerson] = useState({})
	const [personFilm, setPersonFilm] = useState([])
	const [personLoading, setPersonLoading] = useState(true)
	const [personFilmLoading, setPersonFilmLoading] = useState(true)
	useEffect(() => {
		axios(`https://api.themoviedb.org/3/person/${id}?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setPerson(res.data)
					setPersonLoading(false)
				})
		axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setPersonFilm(res.data.cast)
					setPersonFilmLoading(false)
				})
	}, [id])
	const formatDate2 = (date) => {
		const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
		const reversedDate = date.split('-').reverse()
		reversedDate[1] = month[reversedDate[1] - 1]
		return reversedDate.join(' ')
	}
	if (personLoading || personFilmLoading )  {
		return <Spinner/>
	}
	return (
			<div className='person'>
				<div className='container'>
					<div className='row'>
						<div className="col-4">
							<div className='person-image'>
								<img src={person.profile_path ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${person.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
									 alt="" className='person-img'/>
							</div>
							<h4 className='title-info'>Персональная информация</h4>
							<p className='person-about'><b>Известность
								за: </b><span>{person.known_for_department === 'Acting' ? "Актерское" +
									" исскуство" : "-"}</span></p>
							<p className='person-about'>
								<b>Пол: </b><span>{person.gender === 2 ? "Мужской" : "Женский"}</span></p>
							<p className='person-about'><b>Дата
								рождения: </b><span>{formatDate2(person.birthday)}</span></p>
							<p className='person-about'><b>Место
								рождения: </b><span>{formatDate2(person.place_of_birth)}</span></p>
							<div>
								<p className='person-about'><b>Также известность как: </b></p>
								{
									person?.also_known_as?.map(el => (
											<p className='title-description'>{el}</p>
									))
								}
							</div>
						</div>
						<div className="col-8">
							<h2 className='person-name'>{person.name}</h2>
							<h3 className='person-biography'>Биография</h3>
							<p className='biography-about'>{person.biography? person.biography : <i>Нет информации</i>}</p>
							<h3 className='person-film'>Известность за:</h3>
							<div className='scroller'>
								{
									personFilm.slice(0, 10).map(el => (
											<div className="film-card">
												<div className="card-img">
													<Link to={`/films/${el.id}`} key={el.id}>
														<img src={el.poster_path ? `https://www.themoviedb.org/t/p/w150_and_h225_bestv2/${el.poster_path}` : 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'}
															 alt="" className='actor__img actors__img'/>

													</Link>

												</div>
												<Link to={`/films/${el.id}`} className="title-name">{el.title}</Link>
											</div>
									))
								}
							</div>

						</div>
					</div>
				</div>

			</div>
	);
};
export default Person;
