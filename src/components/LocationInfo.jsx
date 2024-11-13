import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFecth';
import ResidentInfo from './ResidentCard';

const LocationInfo = () => {
	const [locationId, setLocationId] = useState(
		Math.floor(Math.random() * 126) + 1,
	);
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const residentsPerPage = 8;

	const {
		data: location,
		loading,
		error,
	} = useFetch(
		locationId
			? `https://rickandmortyapi.com/api/location/${locationId}`
			: null,
	);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);

		if (value.trim() !== '') {
			handleSearch(value);
		} else {
			setSuggestions([]);
		}
	};

	const handleSearch = async (value) => {
		try {
			const response = await fetch(
				`https://rickandmortyapi.com/api/location?name=${value}`,
			);
			const data = await response.json();
			setSuggestions(data.results || []);
		} catch (err) {
			console.error('Error fetching location suggestions', err);
		}
	};

	const handleLocationSelect = (id) => {
		setLocationId(id);
		setInputValue('');
		setSuggestions([]);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	if (loading) return <p>Cargando...</p>;

	if (error) return <p>Hubo un error al cargar los datos.</p>;

	const indexOfLastResident = currentPage * residentsPerPage;
	const indexOfFirstResident = indexOfLastResident - residentsPerPage;
	const currentResidents = location?.residents.slice(
		indexOfFirstResident,
		indexOfLastResident,
	);

	const totalPages = Math.ceil(location?.residents.length / residentsPerPage);

	return (
		<div>
			<div className="card-busqueda">
				<h2>Información de la Locación</h2>
				<input
					className="locations"
					type="text"
					placeholder="Escribe el nombre de la locación"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<div className="suggestions-list">
					{suggestions.map((suggestion) => (
						<div
							key={suggestion.id}
							onClick={() => handleLocationSelect(suggestion.id)}
							className="suggestion-item"
						>
							{suggestion.name}
						</div>
					))}
				</div>
			</div>

			{location && (
				<>
					<div className="card__dimension">
						<h3>{location.name}</h3>
						<p>Tipo: {location.type}</p>
						<p>Dimensión: {location.dimension}</p>
						<p>Cantidad de residentes: {location.residents.length}</p>
					</div>

					<div className="residents-container">
						{currentResidents?.map((url, index) => (
							<ResidentInfo key={index} url={url} />
						))}
					</div>

					<div className="pagination">
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								className={currentPage === index + 1 ? 'active' : ''}
							>
								{index + 1}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default LocationInfo;
