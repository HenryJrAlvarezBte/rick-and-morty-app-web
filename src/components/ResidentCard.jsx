import React from 'react';
import { useFetch } from '../hooks/useFecth';

const ResidentInfo = ({ url }) => {
	const { data: resident, loading, error } = useFetch(url);

	if (loading) return <p>Cargando residente...</p>;
	if (error) return <p>Error cargando el residente</p>;

	return (
		<div className="resident-card">
			<img src={resident.image} alt={resident.name} width="100" />
			<h4>{resident.name}</h4>
			<p>Estado: {resident.status}</p>
			<p>Origen: {resident.origin.name}</p>
			<p>Apariciones en episodios: {resident.episode.length}</p>
		</div>
	);
};

export default ResidentInfo;
