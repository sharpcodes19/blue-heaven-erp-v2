import Moment from 'moment'
import React from 'react'
import { Col, DatePicker, Form, Input, InputNumber, Row } from 'antd'
import { useFormikContext } from 'formik'

type RawMaterialFieldProps = {}

const RawMaterialField = (props: RawMaterialFieldProps) => {
	const formik = useFormikContext<RawMaterialProps>()

	return (
		<React.Fragment>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={12}>
						<Form.Item label='Item Name'>
							<Input
								value={formik.values.name}
								status={formik.errors.name && formik.touched.name ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('name', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Type'>
							<Input
								value={formik.values.type}
								status={formik.errors.type && formik.touched.type ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('type', e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={15}>
						<Form.Item label='Diameter'>
							<Input
								value={formik.values.diameter}
								status={formik.errors.diameter && formik.touched.diameter ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('diameter', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item label='Weight/6M'>
							<InputNumber
								value={formik.values.weight}
								status={formik.errors.weight && formik.touched.weight ? 'error' : undefined}
								onChange={(value) => formik.setFieldValue('weight', value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={9}>
						<Form.Item label='Quantity'>
							<InputNumber
								value={formik.values.quantity}
								status={formik.errors.quantity && formik.touched.quantity ? 'error' : undefined}
								onChange={(value) => formik.setFieldValue('quantity', value)}
							/>
						</Form.Item>
					</Col>
					<Col span={9}>
						<Form.Item label='Price/6M'>
							<InputNumber
								value={formik.values.price}
								status={formik.errors.price && formik.touched.price ? 'error' : undefined}
								onChange={(value) => formik.setFieldValue('price', value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row>
					<Col span={12}>
						<Form.Item label='Order Date'>
							<DatePicker
								defaultValue={Moment(formik.values.orderDate || new Date())}
								onChange={(value) => formik.setFieldValue('orderDate', value?.toDate())}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Delivered Date'>
							<DatePicker
								defaultValue={formik.values.deliveredDate ? Moment(formik.values.deliveredDate) : undefined}
								onChange={(value) => formik.setFieldValue('deliveredDate', value?.toDate())}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Form.Item label='Remarks'>
					<Input
						value={formik.values.remarks}
						status={formik.errors.remarks && formik.touched.remarks ? 'error' : undefined}
						onChange={(e) => formik.setFieldValue('remarks', e.target.value)}
					/>
				</Form.Item>
			</Col>
		</React.Fragment>
	)
}

export default RawMaterialField
