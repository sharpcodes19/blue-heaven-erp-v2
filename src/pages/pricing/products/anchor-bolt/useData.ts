import React from 'react'
import _ from 'lodash'
import axios, { AxiosResponse } from 'axios'
import instance from '../../../../api/instance'

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
			const endpoints: Array<string> = ['/api/admin/get/query/anchorBolt']
			const responses: Array<
				AxiosResponse<{
					allUser: Array<AnchorBoltProps>
				}>
			> = await axios.all(endpoints.map((endpoint) => instance().get(endpoint)))
			for (let i = 0; i < responses.length; i++) {
				allData.push(
					...responses[i].data.allUser
						.filter(
							(p) => p.sizeA && p.inchA && p.bend && p.standard && p.typeAnchor
						)
						.map((p) => ({
							name: productName,
							_id: p._id,
							hexNut: p.hexNut,
							width: p.bend,
							washer: p.fW,
							length: p.inchA,
							size: p.sizeA,
							price: String(p.total),
							type: p.typeAnchor,
							threadLength: [p.tl || 'n/a']
						}))
				)
			}

			setOptions(
				_.sortBy(
					[
						{
							accessor: 'type',
							originFieldName: 'typeAnchor',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.type,
										value: item.type
									})),
									'label'
								),
								'label'
							)
						},
						{
							unit: 'in',
							accessor: 'size',
							originFieldName: 'sizeA',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.size,
										value: item.size
									})),
									'label'
								),
								'label'
							)
						},
						{
							unit: 'in',
							accessor: 'length',
							originFieldName: 'inchA',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.length,
										value: item.length
									})),
									'label'
								),
								'label'
							)
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
							)
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
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true
						},
						{
							accessor: 'washer',
							originFieldName: 'fW',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.washer,
										value: item.washer
									})),
									'label'
								),
								'label'
							),
							isNumber: true,
							isCurrency: true,
							hideStepComponent: true
						},
						{
							accessor: 'threadLength',
							originFieldName: 'tl',
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
							isCurrency: true
							// hideStepComponent: true
						},
						{
							accessor: 'price',
							originFieldName: 'standard',
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
							hideStepComponent: true
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
