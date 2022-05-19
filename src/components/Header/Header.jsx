import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo.svg'
import './Header.css'

const Header = () => {
	return (
			<header>
				<div className="container header-container">
					<Link to='/' >
						<img src={logo} alt="logo" width={200}/>
					</Link>
					<Link to='/films' style={{textDecoration: 'none'}}>
						<h4 className='category-name'>Фильмы</h4>
					</Link>
					<Link to='/serials' style={{textDecoration: 'none'}}>
						<h4 className='category-name'>Сериалы</h4>
					</Link>
				</div>

			</header>
	);
};
export default Header;
