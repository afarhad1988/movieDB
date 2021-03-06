import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import ReactPlayer from 'react-player'
import Spinner from "../../components/Spinner";


const FilmInfo = () => {
	const {id} = useParams()
	const [filmsInfo, setFilmsInfo] = useState({})
	const [actors, setActors] = useState([])
	const [trailers, setTrailers] = useState([])
	const [actorsLoading, setActorsLoading] = useState(true)
	const [isLoading, setIsLoading] = useState(true)



	useEffect(() => {
		axios(`https://api.themoviedb.org/3/movie/${id}?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res) => {
					setFilmsInfo(res.data)
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
					backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${filmsInfo.backdrop_path})`
				}}>
					<div className='custom-bg' style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingTop: 30,
						paddingBottom: 30
					}}>
						<div className="container">
							<div className='row'>
								<div className="col-3">
									<img
										 style={{borderRadius: 10, width: 300}}
										 src={filmsInfo.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_face${filmsInfo.poster_path}` : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'}
										 alt="poster" className=''/>
								</div>
								<div className="col-9">
									<h4 className='filmsInfo-title'>{filmsInfo.title} <span
											style={{fontWeight: 400}}>({filmsInfo.release_date.slice(0, 4)})</span></h4>
									<span style={{color: 'white'}}>{filmsInfo.release_date.toString().split('-').reverse().join('/')} ({filmsInfo.production_countries[0]?.iso_3166_1})</span>
									{
										filmsInfo.genres?.map((genre, idx) => (
												<span style={{marginLeft: 5, color: 'white'}} key={idx}>
											{genre.name}
										</span>
										))
									}
									<span style={{color: 'white'}}>
								{filmsInfo.runtime !== null ? Math.floor(filmsInfo.runtime / 60) > 0 ? ` ${Math.floor(filmsInfo.runtime / 60)}h ${filmsInfo.runtime % 60}min` : `${filmsInfo.runtime % 60}min` : "???"}
							</span>
									<div className='filmsInfo-average'>
										{filmsInfo.vote_average}
									</div>
									<p className='filmsInfo-tagline'>{filmsInfo.tagline}</p>
									<p className='filmsInfo-review'>??????????</p>
									<p className='filmsInfo-overview'>{filmsInfo.overview}</p>
									{
										filmsInfo.production_companies.map(company =>
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

                <div className="row">


                 <div className="col-10">
					 <h4 className='title'>?? ?????????????? ??????????</h4>
					 <div className="scroller">
						 {
							 actors.slice(0, 10).map(actor =>
									 <div className="film-card" >

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
					<div className="col-2">
						<h3 className="facts-title">??????????</h3>
						<p className='filmsInfo-facts'><b>???????????????? ????????????????</b></p>
						<span >{filmsInfo.original_title}</span>
						<p className='filmsInfo-facts'><b>????????????</b></p>
						<span >{filmsInfo.status === "Released" ? "????????????????" : '-'}</span>
						<p className='filmsInfo-facts'><b>????????????</b></p>
						{filmsInfo.budget ? <span>${filmsInfo.budget.toLocaleString()}</span> : "???"}
						<p className='filmsInfo-facts'><b>?????????? </b></p>
						{filmsInfo.revenue ? <span>${filmsInfo.revenue.toLocaleString()}</span> : "???"}
						<p className='filmsInfo-facts'><b>???????????????????????? ????????</b></p>
						<span >{filmsInfo.original_language}</span>
					</div>
				</div>
				</div>
				<div className="container">
					<h3 className='trailer-title'>??????????????</h3>
					<div className="row">

						{
							trailers.map(el =>
									<ReactPlayer key={el.id} url={`https://www.youtube.com/watch?v=${el.key}`}
												 className='col-6'/>
							)
						}
					</div>
				</div>
			</div>
	);
};
export default FilmInfo;
