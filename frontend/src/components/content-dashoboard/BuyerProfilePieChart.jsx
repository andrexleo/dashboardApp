import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default function BuyerProfilePieChart() {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/data");
			const result = await response.json();

			// Crear el nuevo arreglo de datos para el gráfico usando ccu y power
			const chartData = [
				{ name: 'CCU', value: result.activeLineData.ccu.porcentaje }, // Porcentaje de CCU
				{ name: 'Power', value: result.activeLineData.power.porcentaje } // Porcentaje de Power
			];

			setData(chartData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (!data.length) return <div>Loading...</div>; // Mostrar mientras se cargan los datos

	return (
		<div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
			<strong className="text-gray-700 font-medium">Buyer Profile</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={300}>
						<Pie
							data={data}
							cx="50%"
							cy="45%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
