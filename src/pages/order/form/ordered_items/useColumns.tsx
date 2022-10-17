import _ from 'lodash'
import { ColumnType } from 'antd/lib/table'
import { Col, InputNumber, Row, Tag, Tooltip, Typography } from 'antd'
import React from 'react'
import ItemNameCell from '../../table/cells/ItemNameCell'
import { FieldArray } from 'formik'
import OptionCell from './OptionCell'

type Props = {
	columns: Array<ColumnType<FinishedProductProps & EditableTableRowProps>>
}

const useColumns = (): Props => {
	const columns = React.useMemo<
		Array<ColumnType<FinishedProductProps & EditableTableRowProps>>
	>(
		() => [
			{
				title: 'Options',
				dataIndex: '_id',
				key: _.uniqueId('_id'),
				render: (_, record) => <OptionCell record={record} />,
				width: 90
			},
			{
				title: 'Product Name',
				dataIndex: 'name',
				key: _.uniqueId('name'),
				render: (_, product: FinishedProductProps) => {
					const record: OrderProps = {
						items: [product]
					}
					return <ItemNameCell record={record} />
				},
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.name?.toLowerCase() || ''
					var y = b.name?.toLowerCase() || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 320
			},
			{
				title: 'Finish Type',
				dataIndex: 'finishType',
				key: _.uniqueId('finishType'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.finishType || ''
					var y = b.finishType || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 120
			},
			{
				title: 'Weight',
				dataIndex: 'weight',
				key: _.uniqueId('weight'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.weight || ''
					var y = b.weight || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 80
			},
			{
				title: 'Cut Length',
				dataIndex: 'cutLength',
				key: _.uniqueId('cutLength'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.cutLength || ''
					var y = b.cutLength || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 130
			},
			{
				title: 'Holes',
				dataIndex: 'holeQuantity',
				key: _.uniqueId('holeQuantity'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.holeQuantity || ''
					var y = b.holeQuantity || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				render: (value, record) => (
					<Row>
						<Col>
							<Tooltip title='No. of holes'>
								<Typography>
									<Tag color={value ? 'forestgreen' : 'volcano'}>{value || 'N/A'}</Tag>
								</Typography>
							</Tooltip>
						</Col>
						<Col>
							{record.holeSizes?.map((value) => (
								<Tooltip title='Hole size'>
									<Tag color='pink'>{value}</Tag>
								</Tooltip>
							))}
						</Col>
					</Row>
				),
				width: 150
			},
			{
				title: 'Total Price',
				dataIndex: 'totalPricePerSet',
				key: _.uniqueId('totalPricePerSet'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.totalPricePerSet?.toString()?.toLowerCase() || ''
					var y = b.totalPricePerSet?.toString()?.toLowerCase() || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				render: (value) => {
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(value || 0)
					return (
						<Row>
							{value ? (
								amount
							) : (
								<Tooltip title={amount}>
									<Tag color='red'>FREE</Tag>
								</Tooltip>
							)}
						</Row>
					)
				},
				width: 135
			},
			{
				title: 'Price / piece',
				dataIndex: 'price',
				key: _.uniqueId('price'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.price?.toLowerCase() || ''
					var y = b.price?.toLowerCase() || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				render: (value) => {
					const amount = new Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP'
					}).format(value || 0)
					return (
						<Row>
							{value ? (
								amount
							) : (
								<Tooltip title={amount}>
									<Tag color='red'>FREE</Tag>
								</Tooltip>
							)}
						</Row>
					)
				},
				width: 135
			},
			{
				title: 'Quantity',
				dataIndex: 'quantity',
				key: _.uniqueId('quantity'),
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.quantity || ''
					var y = b.quantity || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 250,
				render: (value, record) => {
					return (
						<FieldArray
							name='items'
							render={({ replace, form }) => (
								<InputNumber
									value={value}
									min={1}
									// max={
									// 	+(
									// 		rawMaterials?.filter((material) => material._id === record._id)[0]
									// 			?.quantity || 0
									// 	)
									// }
									onChange={(value) => {
										replace(_.findIndex(form.values.items, record), {
											...record,
											quantity: value,
											totalPricePerSet: +(record.price || 1) * value
										})
									}}
								/>
							)}
						/>
					)
				}
			},
			{
				title: 'Remarks',
				dataIndex: 'remarks',
				key: _.uniqueId('remarks'),
				ellipsis: true
			}
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return { columns }
}

export default useColumns
