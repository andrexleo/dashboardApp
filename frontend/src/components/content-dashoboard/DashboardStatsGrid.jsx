import React, { useState, useEffect } from 'react';

export default function DashboardStatsGrid() {
	const [data, setData] = useState(null); // Inicializamos con null para manejar mejor los casos de no datos

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/data");
			const result = await response.json();

			// Guardamos ambos conjuntos de datos en el estado
			setData({
				activeLineData: result.activeLineData,
				estatusOperacionalData: result.estatusOperacionalData,
				utilizationData: result.utilizationData,
				sucursaData: result.sucursaData
			});
		} catch (error) {
			console.error("Error fetching data from API:", error);
		}
	};

	// Llamamos a la API cuando el componente se monta
	useEffect(() => {
		fetchData();
	}, []);

	if (!data) return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos

	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center">
					<img width="64" height="64" src="https://img.icons8.com/external-yogi-aprelliyanto-outline-color-yogi-aprelliyanto/64/external-generator-electric-element-yogi-aprelliyanto-outline-color-yogi-aprelliyanto.png" alt="external-generator-electric-element-yogi-aprelliyanto-outline-color-yogi-aprelliyanto" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Equipos</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.activeLineData.total.subtotal}</strong>
						<span className="text-sm text-green-500 pl-2">+{data.activeLineData.ccu.porcentaje.toFixed(2)}%</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center">
				<img width="65" height="65" src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/external-For-Rent-traveling-and-tourism-smashingstocks-circular-smashing-stocks.png" alt="external-For-Rent-traveling-and-tourism-smashingstocks-circular-smashing-stocks"/>
					                </div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">% Rent Ready</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.estatusOperacionalData.total_porc['Rent Ready'].toFixed(2)}%</strong>
						<span className="text-sm text-green-500 pl-2">--</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center">
					<img width="50" height="50" src="https://img.icons8.com/stickers/50/checked-checkbox.png" alt="checked-checkbox" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">#On Rent</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{data.utilizationData[6].totales}</strong>
						<span className="text-sm text-green-500 pl-2">+{data.activeLineData.total.porcentaje.toFixed(2)}%</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center">
				<img width="96" height="96" src="https://img.icons8.com/fluency/96/discount--v1.png" alt="discount--v1"/>
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">% Utilización</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold"></strong>
						<span className="text-sm text-green-500 pl-2">+{data.activeLineData.total.porcentaje.toFixed(2)}%</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	);
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 border flex-1 border-gray-200 flex items-center">{children}</div>;
}
