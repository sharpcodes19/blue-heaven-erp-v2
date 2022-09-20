import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Table } from 'antd'
import { useDebounce } from 'use-debounce'
import columns from './table/useColumns'
import { RawMaterial } from '../../../contexts/RawMaterialContext'

type RawMaterialTableProps = {
	onShowForm: (value: boolean) => any
}

const RawMaterialTable = (props: RawMaterialTableProps) => {
	const [text, setText] = React.useState<string>('')
	const [debouncedValue] = useDebounce(text, 500)
	const { value } = React.useContext(RawMaterial)!

	const data = React.useMemo<Array<RawMaterialProps> | undefined>(() => {
		if (!debouncedValue || !value) return value

		return value.filter((a) => a.name?.toLowerCase().includes(debouncedValue.toLowerCase()))
	}, [value, debouncedValue])

	return (
		<Row>
			<Col span={24}>
				<Row style={{ marginBottom: '1rem' }} justify='space-between'>
					<Col span={6}>
						<Input
							placeholder='Search item name'
							addonBefore={<SearchOutlined />}
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>
					</Col>
					<Col>
						<Button type='primary' onClick={() => props.onShowForm(true)}>
							Add new raw material
						</Button>
					</Col>
				</Row>
				<Table
					loading={data === undefined}
					columns={columns}
					dataSource={data}
					size='small'
					scroll={{ x: 'calc(700px + 50%)' }}
				/>
			</Col>
		</Row>
	)
}

export default RawMaterialTable
