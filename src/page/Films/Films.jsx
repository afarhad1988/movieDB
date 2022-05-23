import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "./Films.css"
import Spinner from "../../components/Spinner";

const Films = () => {
	const [films, setFilms] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [trends, setTrends] = useState([])
	const [trendsLoading, setTrendsLoading] = useState(true)
	const [time, setTime] = useState('day')


	useEffect(() => {
		axios(`https://api.themoviedb.org/3/discover/movie?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setFilms(res.data.results)
					setIsLoading(false)
				})
	}, [])
	useEffect(() => {
		axios(`https://api.themoviedb.org/3/trending/movie/${time}?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setTrends(res.data.results)
					setTrendsLoading(false)

				})
	}, [time])
	const formatDate = (date) => {
		const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
		const reversedDate = date.split('-').reverse()
		reversedDate[1] = month[reversedDate[1] - 1]
		return reversedDate.join(' ')
	}
	if (isLoading || trendsLoading) {
		return <Spinner/>
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
											<img src={`/t/p/w220_and_h330_face${film.poster_path}`}
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
				<div className='trend'>
					<div className='selector'>
						<h4 className='title title-trend'>В тренде</h4>
						<div className='selector-buttons'>
							<button onClick={(e)=> setTime('day')} className='selector-btn btn-day'>Cегодня</button>
							<button onClick={(e)=> setTime('week')} className='selector-btn btn-week'>На этой неделе</button>
						</div>

					</div>

					<div className='films scroller'>
						{
							trends.map((trend) => (
									<div className="film-card">
										<div className="card-img">
											<Link to={`/films/${trend.id}`} key={trend.id}
												  style={{textDecoration: 'none', color: 'black'}}>
												<img src={`/t/p/w220_and_h330_face${trend.poster_path}`}
													 alt="poster"/>
											</Link>
											<div className='film-average'>
												{trend.vote_average}
											</div>
										</div>
										<Link to={`/films/${trend.id}`}><h4 className='film-title'>{trend.title}</h4>
										</Link>
										<p className='film-date'>{formatDate(trend.release_date)}</p>
									</div>
							))
						}

					</div>
				</div>
			</div>
	)
			;
};
export default Films;
