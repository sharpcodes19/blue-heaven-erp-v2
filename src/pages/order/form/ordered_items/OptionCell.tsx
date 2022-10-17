import { Button, Col, message, Popconfirm, Row } from 'antd'
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import React from 'react'
import { useFormikContext } from 'formik'

type OptionCellProps = {
	record: FinishedProductProps & EditableTableRowProps
}

const OptionCell = (props: OptionCellProps) => {
	const formik = useFormikContext<OrderProps>()
	const [messageApi, alertContext] = message.useMessage()

	const handleDelete = React.useCallback(() => {
		formik.setFieldValue(
			'items',
			formik.values.items.filter((item) => item._id !== props.record._id)
		)
		messageApi.success('Product removed from the list.', 5)
	}, [formik, props.record._id, messageApi])

	return (
		<Row align='middle' gutter={10}>
			{alertContext}
			{/* <Col>
				<Button
					type='dashed'
					icon={<EditFilled />}
					style={{ border: 'none' }}
					onClick={props.onToggleEdit}
				/>
			</Col> */}
			<Col>
				<Popconfirm title='Are you sure to delete this record?' onConfirm={handleDelete}>
					<Button
						type='ghost'
						danger
						icon={<DeleteFilled />}
						style={{ border: 'none' }}
					/>
				</Popconfirm>
			</Col>
		</Row>
	)
}

export default OptionCell
