import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function RecentOrders() {
	const [utilizationData, setUtilizationData] = useState([]);

	// Función para obtener los datos desde la API
	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/data');
			const result = await response.json();

			// Almacena los datos de `utilizacion_por_sucursal` en el estado
			setUtilizationData(result.utilizationData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// Llamada a la API al montar el componente
	useEffect(() => {
		fetchData();
	}, []);

	if (!utilizationData.length) return <div>Loading...</div>; // Mostrar mientras se cargan los datos

	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Utilización por Sucursal</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th>Sucursal</th>
							<th>Utilización</th>
							<th>Off Rent</th>
							<th>On Rent</th>
							<th>Total Activos</th>
						</tr>
					</thead>
					<tbody>
						{utilizationData.map((sucursal, index) => (
							<tr key={index}>
								<td>{sucursal.branch}</td> {/* Nombre de la sucursal */}
								<td>{sucursal.utilization.toFixed(2)}%</td> {/* Tasa de utilización */}
								<td>{sucursal.offRent}</td>
								<td>{sucursal.totales}</td>
								<td>{sucursal.totalActivos}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
