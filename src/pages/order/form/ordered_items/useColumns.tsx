import _ from 'lodash'
import { ColumnType } from 'antd/lib/table'
import { Col, Row, Tag, Tooltip, Typography } from 'antd'
import React from 'react'

type Props = {
	columns: Array<ColumnType<FinishedProductProps & EditableTableRowProps>>
}

const useColumns = (): Props => {
	const columns = React.useMemo<
		Array<ColumnType<FinishedProductProps & EditableTableRowProps>>
	>(
		() => [
			// {
			// 	title: 'Action',
			// 	render: (_, record, index) =>
			// 		record.__new__ ? (
			// 			<Button
			// 				type='primary'
			// 				onClick={() => {
			// 					if (record.__new__ === true) {
			// 						formik.setFieldValue(`items.${index}.__new__`, undefined)
			// 					}
			// 				}}
			// 			>
			// 				Add
			// 			</Button>
			// 		) : (
			// 			<Button
			// 				type='ghost'
			// 				onClick={() => {
			// 					if (!record.__new__ && !record.__update__)
			// 						return formik.setFieldValue(`items.${index}.__update__`, true)
			// 					if (!record.__new__ && record.__update__) {
			// 						return formik.setFieldValue(`items.${index}`, {
			// 							...record,
			// 							__update__: undefined
			// 						})
			// 					}
			// 				}}
			// 			>
			// 				{record.__update__ ? 'Update' : 'Edit'}
			// 			</Button>
			// 		),
			// 	width: 36
			// },
			{
				title: 'Product Name',
				dataIndex: 'name',
				key: _.uniqueId('name'),
				render: (value, record: FinishedProductProps) => {
					return (
						<Row align='middle' style={{ gap: 5 }}>
							<Col style={{ marginRight: 10 }}>
								<Typography>
									<Typography.Text>{value}</Typography.Text>
								</Typography>
							</Col>
							<Col>
								{record.type ? (
									<Tooltip title='Type or Material'>
										<Tag color='green'>{record.type}</Tag>
									</Tooltip>
								) : null}
								{record.size ? (
									<Tooltip title='Size or Diameter'>
										<Tag color='orange'>{record.size}</Tag>
									</Tooltip>
								) : null}
								{record.length ? (
									<Tooltip title='Length'>
										<Tag color='geekblue'>{record.length}</Tag>
									</Tooltip>
								) : null}
								{record.width ? (
									<Tooltip title='Bend or Width'>
										<Tag color='darkslateblue'>{record.width}</Tag>
									</Tooltip>
								) : null}
							</Col>
						</Row>
					)
				},
				sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
					var x = a.name?.toLowerCase() || ''
					var y = b.name?.toLowerCase() || ''
					return x < y ? -1 : x > y ? 1 : 0
				},
				width: 260
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
									<Tag color={value ? 'forestgreen' : 'volcano'}>
										{value || 'N/A'}
									</Tag>
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
				width: 110
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
