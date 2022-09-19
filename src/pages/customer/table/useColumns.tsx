import { Col, Row, Tag, Tooltip, Typography } from 'antd'
import { ColumnType } from 'antd/lib/table'
import OptionCell from './OptionCell'

const columns: Array<ColumnType<CustomerProps>> = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		fixed: 'left',
		render: (value, record: CustomerProps) => {
			const invalid = !record.status || record.status === 'null' || record.status.toLowerCase() === 'n/a'

			return (
				<Row gutter={3} wrap={false} align='middle'>
					<Col>
						<Tooltip title='Status'>
							<Tag color={invalid ? 'volcano' : 'geekblue'}>{invalid ? 'N/A' : record.status}</Tag>
						</Tooltip>
					</Col>
					<Col>
						<Typography.Text>{value}</Typography.Text>
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
		// onFilter: (value, record: CustomerProps) => {
		// 	if (!record.name) return false

		// 	return record.name.indexOf(value as string) === 0
		// },
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.name?.toLowerCase() || ''
			var y = b.name?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		}
	},
	{
		title: 'TIN',
		dataIndex: 'tin',
		key: 'tin',
		fixed: 'left',
		width: 150,
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.tin?.toLowerCase() || ''
			var y = b.tin?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		render: (value) => {
			if (!value || value === 'null' || value.toLowerCase() === 'n/a') return <Tag color='volcano'>N/A</Tag>
			return value
		}
	},
	{
		title: 'Email Address',
		dataIndex: 'email',
		key: 'email',
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.email?.toLowerCase() || ''
			var y = b.email?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		render: (value) => {
			if (!value || value === 'null' || value.toLowerCase() === 'n/a') return <Tag color='volcano'>N/A</Tag>
			return value
		},
		width: 230,
		ellipsis: true
	},
	{
		title: 'Contact No.',
		dataIndex: 'contact',
		key: 'contact',
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.contact?.toLowerCase() || ''
			var y = b.contact?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		render: (value) => {
			if (!value || value === 'null' || value.toLowerCase() === 'n/a') return <Tag color='volcano'>N/A</Tag>
			return value
		},
		width: 140
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.address?.toLowerCase() || ''
			var y = b.address?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		render: (value) => {
			if (!value || value === 'null' || value.toLowerCase() === 'n/a') return <Tag color='volcano'>N/A</Tag>
			return value
		},
		ellipsis: true
	},
	{
		title: 'Discount',
		dataIndex: 'discount',
		key: 'discount',
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.discount?.toLowerCase() || ''
			var y = b.discount?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		width: 120
	},
	{
		title: 'Remarks',
		dataIndex: 'remarks',
		key: 'remarks',
		sorter: (a: CustomerProps, b: CustomerProps) => {
			var x = a.remarks?.toLowerCase() || ''
			var y = b.remarks?.toLowerCase() || ''
			return x < y ? -1 : x > y ? 1 : 0
		},
		ellipsis: true
	},
	{
		title: 'Action',
		dataIndex: '_id',
		key: '_id',
		render: (_, record: CustomerProps) => <OptionCell record={record} />,
		width: 90
	}
]

export default columns
