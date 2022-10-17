import React from 'react'
import { Divider } from 'antd'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import SagRodProduct from './products/sag-rod/SagRodProduct'
import AnchorBoltProduct from './products/anchor-bolt/AnchorBoltProduct'
import HexBoltProduct from './products/hex-bolt/HexBoltProduct'
import UBoltProduct from './products/u-bolt/UBoltProduct'
import JBoltProduct from './products/j-bolt/JBoltProduct'
import DynaBoltProduct from './products/dyna-bolt/DynaBoltProduct'
import HangerProduct from './products/hanger/HangerProduct'
import CylindricalProduct from './products/cylindrical/CylindricalProduct'
import TurnBuckleProduct from './products/turn_buckle/TurnBuckleProduct'
import LagScrewProduct from './products/lag_screw/LagScrewProduct'
import PlateProduct from './products/plate/PlateProduct'
import QuotationSection from './quotation/QuotationSection'
import SelectedQuotationContext from '../../contexts/SelectedQuotationContext'

type PricingPageProps = {}

const PricingPage = (props: PricingPageProps) => {
	return (
		<Layout.Content>
			<SelectedQuotationContext>
				<QuotationSection />
				<Divider />
				<Outlet />
				<Routes>
					<Route path='sag-rod' element={<SagRodProduct />} />
					<Route path='anchor-bolt' element={<AnchorBoltProduct />} />
					<Route path='hex-bolt' element={<HexBoltProduct />} />
					<Route path='u-bolt' element={<UBoltProduct />} />
					<Route path='j-bolt' element={<JBoltProduct />} />
					<Route path='dyna-bolt' element={<DynaBoltProduct />} />
					<Route path='hanger' element={<HangerProduct />} />
					<Route path='cylindrical' element={<CylindricalProduct />} />
					<Route path='turn-buckle' element={<TurnBuckleProduct />} />
					<Route path='lag-screw' element={<LagScrewProduct />} />
					<Route path='plate' element={<PlateProduct />} />

					<Route path='*' element={<Navigate replace to='sag-rod' />} />
				</Routes>
			</SelectedQuotationContext>
		</Layout.Content>
	)
}

export default PricingPage
