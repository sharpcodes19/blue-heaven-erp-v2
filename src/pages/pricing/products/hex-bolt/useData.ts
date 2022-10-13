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
			const endpoints: Array<string> = ['/api/admin/get/query/hexbolt']
			const responses: Array<
				AxiosResponse<{
					allUser: Array<HexBoltProps>
				}>
			> = await axios.all(endpoints.map((endpoint) => instance().get(endpoint)))
			for (let i = 0; i < responses.length; i++) {
				allData.push(
					...responses[i].data.allUser
						.filter(
							(p) => p.threadValue && p.boltLenght && p.materialValue && p.threadValue
						)
						.map((p) => ({
							name: productName,
							_id: p._id,
							length: p.boltLenght,
							price: p.cost,
							type: p.materialValue,
							threadType: p.threadValue,
							createdAt: p.DateCreated,
							hexNut: p.hexNut,
							washer: p.fW
						}))
				)
			}

			setOptions(
				_.sortBy(
					[
						{
							accessor: 'type',
							originFieldName: 'threadValue',
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
							unit: 'mm',
							accessor: 'length',
							originFieldName: 'boltLenght',
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
							accessor: 'threadType',
							originFieldName: 'threadValue',
							options: _.uniqBy(
								_.sortBy(
									allData.map((item) => ({
										label: item.threadType,
										value: item.threadType
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
							)
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
							)
						},
						{
							accessor: 'price',
							originFieldName: 'cost',
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
