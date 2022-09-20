import _ from 'lodash'
import { Col, Row, Tag, Tooltip, Typography } from 'antd'
import { ColumnType } from 'antd/lib/table'
import OptionCell from './OptionCell'

const columns: Array<ColumnType<FinishedProductProps>> = [
	{
		title: 'Product Name',
		dataIndex: 'name',
		key: _.uniqueId('name'),
		fixed: 'left',
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
		// filters: [
		// 	{
		// 		text: 'N/A',
		// 		value: 'null'
		// 	}
		// ],
		// onFilter: (value, record: FinishedProductProps) => {
		// 	if (!record.name) return false

		// 	return record.name.indexOf(value as string) === 0
		// },
		sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
			var x = a.name?.toLowerCase() || ''
			var y = b.name?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		}
	},
	{
		title: 'Thread Type & Length(s)',
		dataIndex: 'threadType',
		key: _.uniqueId('thread'),
		sorter: (a: FinishedProductProps, b: FinishedProductProps) => {
			var x = a.threadType?.toLowerCase() || ''
			var y = b.threadType?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		width: 190,
		render: (value, record) => (
			<Row>
				<Col>
					<Tooltip title='Thread Length'>
						<Typography>
							<Tag color={value ? 'forestgreen' : 'volcano'}>{value || 'N/A'}</Tag>
						</Typography>
					</Tooltip>
				</Col>
				<Col>
					{record.threadLength?.map((value) => (
						<Tag color='pink'>{value}</Tag>
					))}
				</Col>
			</Row>
		)
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
		width: 110
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
		width: 115
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
	},
	{
		title: 'Action',
		dataIndex: '_id',
		key: _.uniqueId('action'),
		render: (_, record: FinishedProductProps) => <OptionCell record={record} />,
		width: 90
	}
]

export default columns
