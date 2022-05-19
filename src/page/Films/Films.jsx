import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "./Films.css"

const Films = () => {
	const [films, setFilms] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		axios(`https://api.themoviedb.org/3/discover/movie?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setFilms(res.data.results)
					setIsLoading(false)
				})
	}, [])

	const formatDate = (date) => {
		const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
		const reversedDate = date.split('-').reverse()
		reversedDate[1] = month[reversedDate[1] - 1]
		return reversedDate.join(' ')
	}

	if (isLoading) {
		return 'Loading....'
	}
	return (
			<div className='container'>
				<h4 className='title'>Что популярно</h4>
				<div className='films scroller'>
					{
						films.map((film) => (
								<div className="film-card">
									<div className="card-img">
										<Link to={`/films/${film.id}`} key={film.id}
											  style={{textDecoration: 'none', color: 'black'}}>
											<img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`}
												 alt="poster"/>
										</Link>
										<div className='film-average'>
											{film.vote_average}
										</div>
									</div>
									<Link to={`/films/${film.id}`}><h4 className='film-title'>{film.title}</h4>
									</Link>
									<p className='film-date'>{formatDate(film.release_date)}</p>
								</div>
						))
					}
				</div>

			</div>

)
	;
};
export default Films;
