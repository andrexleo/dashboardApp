import React from 'react'
import DashboardStatsGrid from '../content-dashoboard/DashboardStatsGrid'
import TransactionChart from '../content-dashoboard/TransactionChart'
import RecentOrders from '../content-dashoboard/RecentOrders'
import BuyerProfilePieChart from '../content-dashoboard/BuyerProfilePieChart'
import PopularProducts from '../content-dashoboard/PopularProducts'
import MapDashboard from '../map/map'
import ChartComponent from '../Charts/filtrograf'
import ErrorBoundary from '../Charts/errorchart'
import BarChart from '../Charts/chartbars'

export default function Tablero() {


	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
			<div className="flex flex-row gap-4">
				<MapDashboard />
			</div>
			<div className="bg-white">
				
					<BarChart />
		
			</div>
		</div>
	)
}