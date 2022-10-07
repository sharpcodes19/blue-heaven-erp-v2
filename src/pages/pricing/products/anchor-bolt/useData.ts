import React from 'react'
import _ from 'lodash'
import axios, { AxiosResponse } from 'axios'
import instance2 from '../../../../api/instance2'

type Props = {
	data: Array<FinishedProductProps>
	options: Array<SelectablePricingOptionProps>
	loading: boolean
}

const useData = (productName: string): Props => {
	const [data, setData] = React.useState<Array<FinishedProductProps>>([])
	const [options, setOptions] = React.useState<
		Array<SelectablePricingOptionProps>
	>([])
	const [loading, setLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		;(async () => {
			setLoading(true)
			let allData: Array<FinishedProductProps> = []
			const endpoints: Array<string> = ['/product/abolt']
			const responses: Array<
				AxiosResponse<ResponseBaseProps<Array<AnchorBoltProps>>>
			> = await axios.all(
				endpoints.map((endpoint) => instance2().get(endpoint))
			)
			for (let i = 0; i < responses.length; i++) {
				allData.push(
					...responses[i].data
						.packet!.filter(
							(p) =>
								p.diameter &&
								p.steel &&
								p.bend &&
								p.lengthByMillimeter !== 'per inch' &&
								p.lengthByInches !== 'per inch' &&
								p.hexNut &&
								p.fW &&
								p.thread
						)
						.map((p) => ({
							name: productName,
							_id: p._id,
							hexNut: p.hexNut,
							width: p.bend,
							washer: p.fW,
							length: p.lengthByInches,
							size: p.diameter,
							price: p.price,
							type: p.steel,
							threadLength: [p.thread!],
							hexNutPrice: +(p.hexNutPrice || 0),
							washerPrice: +(p.fWPrice || 0),
							totalPricePerSet: +(p.totalPerSet || 0),
							length_mm: p.lengthByMillimeter
						}))
				)
			}

			setOptions(
				_.sortBy(
					[
						{
							unit: 'in',
							accessor: 'size',
							originFieldName: 'diameter',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.size,
										value: item.size
									})),
									'label'
								),
								'label'
							),
							label: 'Diameter'
						},
						{
							accessor: 'type',
							originFieldName: 'steel',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.type,
										value: item.type
									})),
									'label'
								),
								'label'
							),
							label: 'Steel'
						},
						{
							unit: 'in',
							accessor: 'length',
							originFieldName: 'lengthByInches',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.length,
										value: item.length
									})),
									'label'
								),
								'label'
							),
							label: 'Length (in)'
						},
						{
							unit: 'mm',
							accessor: 'length_mm',
							originFieldName: 'lengthByMillimeter',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.length_mm,
										value: item.length_mm
									})),
									'label'
								),
								'label'
							),
							hideStepComponent: true,
							isNumber: true,
							label: 'Length (mm)'
						},
						{
							accessor: 'width',
							originFieldName: 'bend',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.width,
										value: item.width
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							label: 'Bend'
						},
						{
							accessor: 'price',
							originFieldName: 'price',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.price,
										value: item.price
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true,
							label: 'Price'
						},
						{
							accessor: 'hexNut',
							originFieldName: 'hexNut',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.hexNut,
										value: item.hexNut
									})),
									'label'
								),
								'label'
							),
							label: 'Hex Nut'
						},
						{
							accessor: 'hexNutPrice',
							originFieldName: 'hexNutPrice',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.hexNutPrice,
										value: item.hexNutPrice
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true,
							label: 'Hex Nut Price'
						},
						{
							accessor: 'washer',
							originFieldName: 'fW',
							options: _.sortBy(
								_.uniqBy(
									allData.map((item) => ({
										label: item.washer,
										value: item.washer
									})),
									'label'
								),
								'label'
							),
							label: 'Washer'
						},
						{
							accessor: 'fWPrice',
							originFieldName: 'fWPrice',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.fWPrice,
										value: item.fWPrice
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true,
							label: 'Washer Price'
						},
						{
							accessor: 'threadLength',
							originFieldName: 'thread',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label:
											item.threadLength instanceof Array
												? item.threadLength[0]
												: String(item.threadLength) || '',
										value:
											item.threadLength instanceof Array
												? item.threadLength[0]
												: String(item.threadLength) || ''
									})),
									'label'
								),
								'label'
							),
							isCurrency: true,
							isNumber: true,
							label: 'Thread Length'
							// hideStepComponent: true
						},
						{
							accessor: 'totalPricePerSet',
							originFieldName: 'totalPerSet',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.totalPricePerSet,
										value: item.totalPricePerSet
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true,
							label: 'Total Price per Set'
						}
					],
					['label', 'value']
				)
			)
			setData(allData)
			setLoading(false)
		})()

		return () => {
			setData([])
			setOptions([])
			setLoading(true)
		}
	}, [productName])

	return {
		data,
		options,
		loading
	}
}

export default useData
