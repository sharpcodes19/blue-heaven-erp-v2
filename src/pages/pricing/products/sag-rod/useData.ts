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
				responses[i].data.allUser
					.filter((product) => product.Size && product.Bending && product.Threading && product.cuttingCost)
					.map((product) => ({
						name: productName,
						size: String(product.Size),
						price: String(product.cuttingCost),
						width: String(product.Bending),
						_id: String(product._id),
						threadLength:
							product.Threading instanceof Array
								? product.Threading.map((item) => String(item))
								: [String(product.Threading)],
						type: i === 0 ? 'CRS' : '41401045'
					}))
					.forEach((product) => {
						allData.push(product)
					})
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
							]
						},
						{
							unit: 'mm',
							accessor: 'size',
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
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.threadLength?.join(',').trim(),
										value: item.threadLength
									})),
									'label'
								),
								'label'
							)
						},
						{
							accessor: 'width',
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
