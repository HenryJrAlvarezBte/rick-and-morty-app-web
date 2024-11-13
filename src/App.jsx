import React from 'react';
import './App.css';
import LocationInfo from './components/LocationInfo.jsx';

function App() {
	return (
		<div className="App">
			<div className="header-image"></div>

			<h1>Rick and Morty</h1>

			<LocationInfo />
		</div>
	);
}

export default App;
