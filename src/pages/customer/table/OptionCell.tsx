import { Button, Col, Row } from 'antd'
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import React from 'react'

type OptionCellProps = {
	record: CustomerProps
}

const OptionCell = (props: OptionCellProps) => {
	return (
		<Row align='middle' gutter={10}>
			<Col>
				<Button type='dashed' icon={<EditFilled />} style={{ border: 'none' }} />
			</Col>
			<Col>
				<Button type='ghost' danger icon={<DeleteFilled />} style={{ border: 'none' }} />
			</Col>
		</Row>
	)
}

export default OptionCell
