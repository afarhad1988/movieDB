import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import './Browse.css'
import Spinner from "../../components/Spinner";

const Browse = () => {
	const {id} = useParams()
	const [browse, setBrowse] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	useEffect(()=>{
		axios(`https://api.themoviedb.org/3/search/movie?query=${id}&api_key=6f19f87e3380315b9573c4270bfc863c`)
				.then((res)=> {
					setBrowse(res.data)
					setIsLoading(false)
				})
	},[id])
	if(isLoading){
		return <Spinner/>
	}
	return (
			<div className='container'>
				<h3 className='title'>Результаты поиска</h3>
				<div className="row">
					{
						browse?.results?.length ? browse?.results?.map(movie =>

									<div key={movie.id} className='actor-col' style={{marginTop:20, borderRadius: 10}}>
										<Link to={`/films/${movie.id}`}>

												<img className='browse-img' style={{borderRadius: 10}}  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png'} alt="" />
												<h4 className="browse-title film-title">{movie.title}</h4>


										</Link>




						</div>
						): <h4>Таких фильмов нет....</h4>
					}
				</div>
			</div>
	);
};
export default Browse;
