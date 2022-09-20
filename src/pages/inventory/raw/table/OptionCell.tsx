import { Button, Col, message, Popconfirm, Row } from 'antd'
import { EditFilled, DeleteFilled } from '@ant-design/icons'
import React from 'react'
import { useFormikContext } from 'formik'
import { FinishedProduct } from '../../../../contexts/ProductContext'
import instance2 from '../../../../api/instance2'

type OptionCellProps = {
	record: RawMaterialProps
}

const OptionCell = (props: OptionCellProps) => {
	const formik = useFormikContext<RawMaterialProps & { visible: boolean }>()
	const { dispatch, value } = React.useContext(FinishedProduct)!
	const [messageApi, alertContext] = message.useMessage()

	const handleUpdate = React.useCallback(() => {
		formik.setValues({
			...props.record,
			visible: true
		})
	}, [formik, props.record])

	const handleDelete = React.useCallback(() => {
		instance2()
			.delete<ResponseBaseProps<Array<RawMaterialProps>>>(`/inventory/finished-product/${props.record._id}`)
			.then((res) => {
				dispatch(value?.filter((customer) => customer._id !== props.record._id))
				messageApi.success(res.data.message)
			})
	}, [props.record._id, messageApi, value, dispatch])

	return (
		<Row align='middle' gutter={10}>
			{alertContext}
			<Col>
				<Button type='dashed' icon={<EditFilled />} style={{ border: 'none' }} onClick={handleUpdate} />
			</Col>
			<Col>
				<Popconfirm title={`Are you sure to delete ${props.record.name}?`} onConfirm={handleDelete}>
					<Button type='ghost' danger icon={<DeleteFilled />} style={{ border: 'none' }} />
				</Popconfirm>
			</Col>
		</Row>
	)
}

export default OptionCell
