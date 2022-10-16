import _ from 'lodash'
import Moment from 'moment'
import { Col, Row, Tag, Tooltip, Typography } from 'antd'
import { ColumnType } from 'antd/lib/table'
import OptionCell from './OptionCell'

const columns: Array<ColumnType<RawMaterialProps>> = [
	{
		title: 'Product Name',
		dataIndex: 'name',
		key: _.uniqueId('name'),
		fixed: 'left',
		render: (value, record: RawMaterialProps) => {
			return `${record.name} ${record.type} ${record.diameter}`
			// <Row align='middle' style={{ gap: 5 }}>
			// 	<Col style={{ marginRight: 10 }}>
			// 		<Typography>
			// 			<Typography.Text>{value}</Typography.Text>
			// 		</Typography>
			// 	</Col>
			// 	<Col>
			// 		{record.type ? (
			// 			<Tooltip title='Type'>
			// 				<Tag color='green'>{record.type}</Tag>
			// 			</Tooltip>
			// 		) : null}
			// 		{record.diameter ? (
			// 			<Tooltip title='Diameter'>
			// 				<Tag color='orange'>{record.diameter}</Tag>
			// 			</Tooltip>
			// 		) : null}
			// 	</Col>
			// </Row>
		},
		// filters: [
		// 	{
		// 		text: 'N/A',
		// 		value: 'null'
		// 	}
		// ],
		// onFilter: (value, record: RawMaterialProps) => {
		// 	if (!record.name) return false

		// 	return record.name.indexOf(value as string) === 0
		// },
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
			var x = a.name?.toLowerCase() || ''
			var y = b.name?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		}
	},
	{
		title: 'Weight/6M',
		dataIndex: 'weight',
		key: _.uniqueId('weight'),
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
			var x = a.weight?.toLowerCase() || ''
			var y = b.weight?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		width: 120
	},
	{
		title: 'Price / piece',
		dataIndex: 'price',
		key: _.uniqueId('price'),
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
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
		width: 120
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		key: _.uniqueId('quantity'),
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
			var x = a.quantity || ''
			var y = b.quantity || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		width: 110,
		render: (value: number) => (
			<Row>
				<Col span={24}>
					<Typography>
						<Typography.Text type={value <= 60 ? 'danger' : 'success'} strong>
							{value}
						</Typography.Text>
					</Typography>
				</Col>
			</Row>
		)
	},
	{
		title: 'Order Date',
		dataIndex: 'orderDate',
		key: _.uniqueId('orderDate'),
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
			if (a.orderDate && b.orderDate)
				return Moment(a.orderDate).isBefore(b.orderDate) ? 1 : 0
			return 0
		},
		render: (value) =>
			value ? (
				<Typography>
					<Typography.Text>{Moment(value).format('MMM DD, YYYY')}</Typography.Text>
				</Typography>
			) : (
				<Tag color='firebrick'>N/A</Tag>
			),
		width: 120
	},
	{
		title: 'Delivered Date',
		dataIndex: 'deliveredDate',
		key: _.uniqueId('deliveredDate'),
		sorter: (a: RawMaterialProps, b: RawMaterialProps) => {
			if (a.deliveredDate && b.deliveredDate)
				return Moment(a.deliveredDate).isBefore(b.deliveredDate) ? 1 : 0
			return 0
		},
		render: (value) =>
			value ? (
				<Typography>
					<Typography.Text>{Moment(value).format('MMM DD, YYYY')}</Typography.Text>
				</Typography>
			) : (
				<Tag color='firebrick'>N/A</Tag>
			),
		width: 130
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
		render: (_, record: RawMaterialProps) => <OptionCell record={record} />,
		width: 90
	}
]

export default columns
