import React, { useState} from 'react';
import './Search.css'
import background from '../../assets/images/search-background.jpg'







const Search = () => {
	const [search, setSearch] = useState('')


	const handleInput = (e)=>{
		setSearch(e.target.value)
	}
    const handleSearch = (e)=>{
		if(e.key === 'Enter'){
              handleClick()
		}
	}
   const handleClick = ()=>{

	}





	return (
			<div className='search' style={{backgroundImage: `url(${background})`, backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
					<div className="container">
						<h1 className='search-title'>Добро пожаловать.</h1>
						<h4 className='search-subtitle' >Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h4>
						<form action="" className='search-form'>
							<input className='search-input' type="text" placeholder='Найти фильм, сериал, персону.....' onKeyPress={handleSearch} onChange={(handleInput)}/>
							<input className='search-submit' type="submit" value='Search' onClick={(handleClick)} disabled={!search.trim()}/>
						</form>
					</div>
			</div>
	);
};
export default Search;
