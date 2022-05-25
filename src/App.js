import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./page/Homepage";
import Films from "./page/Films";
import Serials from "./page/Serials";
import Header from "./components/Header";
import FilmInfo from "./page/FilmInfo";
import Browse from "./page/Browse";
import Person from "./page/Person";
import NoPage from "./page/Nopage";
import Footer from "./components/Footer";

const App = () => {
	return (
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path="/" element={<Homepage/>}/>
					<Route path="/films/:id" element={<FilmInfo/>}/>
					<Route className="container">
						<Route path="/films" element={<Films/>}/>
						<Route path="/serials" element={<Serials/>}/>
						<Route path="/browse/:id" element={<Browse/>}/>
						<Route path="/person/:id" element={<Person/>}/>
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
                <Footer/>
			</BrowserRouter>
	);
};
export default App;