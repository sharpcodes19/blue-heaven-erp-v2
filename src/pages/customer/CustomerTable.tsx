import React from 'react'
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Table } from 'antd'
import { useDebounce } from 'use-debounce'
import columns from './table/useColumns'

type CustomerTableProps = {
	data: Array<CustomerProps>
}

const CustomerTable = (props: CustomerTableProps) => {
	const [text, setText] = React.useState<string>('')
	const [value] = useDebounce(text, 500)

	const data = React.useMemo<Array<CustomerProps>>(() => {
		if (!value) return props.data

		return props.data.filter((a) => a.name?.toLowerCase().includes(value.toLowerCase()))
	}, [props.data, value])

	return (
		<Row>
			<Col span={24}>
				<Row style={{ marginBottom: '1rem' }} justify='space-between'>
					<Col span={6}>
						<Input
							placeholder='Search customer name'
							addonBefore={<SearchOutlined />}
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>
					</Col>
					<Col>
						<Button type='primary' icon={<UserAddOutlined />}>
							Add new customer
						</Button>
					</Col>
				</Row>
				<Table columns={columns} dataSource={data} size='small' scroll={{ x: 'calc(700px + 50%)' }} />
			</Col>
		</Row>
	)
}

export default CustomerTable
