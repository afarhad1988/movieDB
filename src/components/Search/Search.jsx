import React, { useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Search.css'
import background from '../../assets/images/search-background.jpg'


const Search = () => {
	const [search, setSearch] = useState('')
    let navigate = useNavigate

	const handleInput = (e)=>{
		setSearch(e.target.value)
	}
    const handleSearch = (e)=>{
		if(e.key === 'Enter'){
              navigate(`/browse/${search}`)
		}
	}
   const handleClick = () =>{
	   navigate(`/browse/${search}`)
   }




	return (
			<div className='search' style={{backgroundImage: `url(${background})`, backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
					<div className="container">
						<h1 className='search-title'>Добро пожаловать.</h1>
						<h4 className='search-subtitle' >Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h4>
						<form action="" className='search-form'>
							<input className='search-input' type="text" placeholder='Найти фильм, сериал, персону.....' onKeyPress={handleSearch} onChange={(handleInput)}/>
							<Link to={`/browse/${search}`}><input className='search-submit' type="submit" value='Search' onClick={(handleClick)} disabled={!search.trim()}/></Link>
						</form>
					</div>
			</div>
	);
};
export default Search;
