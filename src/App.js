import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./page/Homepage";
import Films from "./page/Films";
import Serials from "./page/Serials";
import Header from "./components/Header";
import FilmInfo from "./page/FilmInfo";
import SearchInfo from "./page/SearchInfo";

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
						<Route path="/search/:name" element={<SearchInfo/>}/>
						<Route path="/person/:id" element={<SearchInfo/>}/>

					</Route>
				</Routes>

			</BrowserRouter>
	);
};
export default App;