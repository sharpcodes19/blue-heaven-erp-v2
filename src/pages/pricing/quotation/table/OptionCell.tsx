import { Button, Col, message, Popconfirm, Row } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import React from 'react'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'

type OptionCellProps = {
	record: FinishedProductProps
	index: number
}

const OptionCell = (props: OptionCellProps) => {
	const { dispatch } = React.useContext(SelectedQuotation)!
	const [messageApi, alertContext] = message.useMessage()

	const handleDelete = React.useCallback(() => {
		dispatch((prevState) => ({
			...prevState!,
			items: prevState?.items?.filter((product, index) => index !== props.index)
		}))
		messageApi.success('Successfully remove product from the list.', 5)
	}, [props.index, messageApi, dispatch])

	return (
		<Row align='middle' gutter={10}>
			{alertContext}
			{/* <Col>
				<Button type='dashed' icon={<EditFilled />} style={{ border: 'none' }} onClick={handleUpdate} />
			</Col> */}
			<Col>
				<Popconfirm
					title={`Are you sure to delete this record?`}
					onConfirm={handleDelete}
				>
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
