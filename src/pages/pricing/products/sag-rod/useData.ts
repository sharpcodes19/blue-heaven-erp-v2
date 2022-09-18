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
	const [options, setOptions] = React.useState<Array<SelectablePricingOptionProps>>([])
	const [loading, setLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		;(async () => {
			setLoading(true)
			let allData: Array<FinishedProductProps> = []
			const endpoints: Array<string> = ['/api/admin/get/query/Asszabtcrs', '/api/admin/get/query/Asszabt41401045']
			const responses: Array<
				AxiosResponse<{
					allUser: Array<SagRodProps>
				}>
			> = await axios.all(endpoints.map((endpoint) => instance().get(endpoint)))
			for (let i = 0; i < responses.length; i++) {
				allData.push(
					...responses[i].data.allUser
						.filter((product) => product.size && product.bending && product.threading && product.cuttingCost)
						.map((product) => ({
							name: productName,
							size: String(product.size),
							price: String(product.cuttingCost),
							width: String(product.bending),
							_id: String(product._id),
							threadLength:
								product.threading instanceof Array
									? product.threading.map((item) => String(item))
									: [String(product.threading)],
							type: i === 0 ? 'CRS' : '41401045'
						}))
				)
			}

			setOptions(
				_.sortBy(
					[
						{
							accessor: 'type',
							alwaysEnabled: true,
							options: [
								{ label: 'CRS', value: 'CRS' },
								{ label: '4140 / 1045', value: '41401045' }
							],
							originFieldName: 'type'
						},
						{
							unit: 'mm',
							accessor: 'size',
							originFieldName: 'size',
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
							accessor: 'threadLength',
							fieldCount: 2,
							originFieldName: 'threading',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.threadLength?.join('x').trim(),
										value: item.threadLength
									})),
									'label'
								),
								'label'
							)
						},
						{
							accessor: 'width',
							originFieldName: 'bending',
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
							accessor: 'price',
							originFieldName: 'cuttingCost',
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
