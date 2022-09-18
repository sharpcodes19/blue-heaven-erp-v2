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
			const endpoints: Array<string> = ['/api/admin/get/query/uboltcm', '/api/admin/get/query/uboltmm']
			const responses: Array<
				AxiosResponse<{
					allUser: Array<UBoltProps>
				}>
			> = await axios.all(endpoints.map((endpoint) => instance().get(endpoint)))
			for (let i = 0; i < responses.length; i++) {
				allData.push(
					...responses[i].data.allUser
						.filter((p) => p.Material && p.pipeSize && p.uboltSize)
						.map((p) => ({
							name: productName,
							type: p.Material,
							length: p.pipeSize,
							size: p.uboltSize,
							price: String(p.Price),
							// unit: p.unit,
							_id: p._id,
							createdAt: p.DateCreated,
							unit: i === 0 ? 'cm' : 'mm'
						}))
				)
			}

			setOptions(
				_.sortBy(
					[
						{
							accessor: 'unit',
							alwaysEnabled: true,
							options: [
								{ label: 'cm', value: 'cm' },
								{ label: 'mm', value: 'mm' }
							],
							originFieldName: 'unit'
						},
						{
							accessor: 'type',
							originFieldName: 'Material',
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
							originFieldName: 'uboltSize',
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
							originFieldName: 'pipeSize',
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
							accessor: 'price',
							originFieldName: 'Price',
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
