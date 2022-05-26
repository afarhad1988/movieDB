import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import Spinner from "../../components/Spinner";
import FastAverageColor from "fast-average-color";

const Serials = () => {
	const {id} = useParams()
	const [serialsInfo, setSerialsInfo] = useState({})
	const [actors, setActors] = useState([])
	const [trailers, setTrailers] = useState([])
	const [color, setColor] = useState('')
	const [actorsLoading, setActorsLoading] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	function onImageLoad(e) {
		new FastAverageColor().getColorAsync(e.target).then((imgColor) => {
			setColor(`rgba(${imgColor.value.slice(0, 3).join(',')}, 0.5)`)
		})
	}

	useEffect(() => {
		axios(`https://api.themoviedb.org/3/tv/${id}?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setSerialsInfo(res.data)
					setIsLoading(false)
				})
	}, [id])
	useEffect(() => {
		axios(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setActors(res.data.cast)
					setActorsLoading(false)
				})
	}, [id])
	useEffect(() => {
		axios(`https://api.themoviedb.org/3/movie/${id}/videos?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setTrailers(res.data.results)
				})
	})
	if (isLoading || actorsLoading) {
		return <Spinner/>
	}
	return (
			<div className='filmsInfo'>
				<div className='backdrop' style={{
					marginTop: 30,
					backgroundImage: `url(/t/p/w1920_and_h800_multi_faces${serialsInfo.backdrop_path})`
				}}>
					<div className='custom-bg' style={{
						backgroundColor: color, paddingTop: 30,
						paddingBottom: 30
					}}>
						<div className="container">
							<div className='row'>
								<div className="col-3">
									<img onLoad={onImageLoad} crossOrigin='anonymous'
										 style={{borderRadius: 10, width: 300}}
										 src={setSerialsInfo.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_face${serialsInfo.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
										 alt="poster" className=''/>
								</div>
								<div className="col-9">
									<h4 className='filmsInfo-title'>{serialsInfo.name} <span
											style={{fontWeight: 400}}>({serialsInfo.first_air_date.slice(0, 4)})</span>
									</h4>
									<span style={{color: 'white'}}>{serialsInfo.first_air_date.toString().split('-').reverse().join('/')} ({serialsInfo.production_countries[0]?.iso_3166_1})</span>
									{
										serialsInfo.genres?.map((genre, idx) => (
												<span style={{marginLeft: 5, color: 'white'}} key={idx}>
											{genre.name}
										</span>
										))
									}
									<span style={{color: 'white'}}>
								{serialsInfo.runtime !== null ? Math.floor(serialsInfo.runtime / 60) > 0 ? ` ${Math.floor(serialsInfo.runtime / 60)}h ${serialsInfo.runtime % 60}min` : `${serialsInfo.runtime % 60}min` : "－"}
							</span>
									<div className='filmsInfo-average'>
										{serialsInfo.vote_average}
									</div>
									<p className='filmsInfo-tagline'>{serialsInfo.tagline}</p>
									<p className='filmsInfo-review'>Обзор</p>
									<p className='filmsInfo-overview'>{serialsInfo.overview}</p>
									{
										serialsInfo.production_companies.map(company =>
												<span className='filmsInfo-company' key={company.id}>
										{company.name}
									</span>)
									}

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container" style={{marginTop: 15}}>
					<h4 className='title'>В главных ролях</h4>
					<div className="scroller">
						{
							actors.slice(0, 10).map(actor =>
									<div className="film-card">

										<Link to={`/person/${actor.id}`} key={actor.id}>
											<img className='actor-img'
												 src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
												 alt=""/>
										</Link>
										<Link to={`/person/${actor.id}`}><h4 className="actor-name">{actor.name}</h4>
										</Link>
										<p className="bold-actor-role">{actor.character}</p>


									</div>
							)
						}

					</div>
				</div>

				<div className="container">
					<h3 className='trailer-title'>Трейлер</h3>
					<div className="row">

						{
							trailers.map(el =>
									<ReactPlayer key={el.id} url={`https://www.youtube.com/watch?v=${el.key}`}
												 className='col-6'/>
							)
						}
						<div className="col-6">
							<h3>Факты</h3>
							<p><b>Исходное название: </b><span>{serialsInfo.original_name}</span></p>
							<p><b>Статус: </b>{serialsInfo.status === "Returning Series" ? "Выпущено" : '-'}</p>
							<p><b>Оригинальный язык: </b>{serialsInfo.original_language}</p>
						</div>
					</div>
				</div>
			</div>
	);
};
export default Serials;