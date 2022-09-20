import React from 'react'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { FieldArray, useFormikContext } from 'formik'

type ProductFieldsProps = {}

const ProductFields = (props: ProductFieldsProps) => {
	const formik = useFormikContext<FinishedProductProps>()

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
					<Col span={12}>
						<Form.Item label='Size/Diameter'>
							<Input
								value={formik.values.size}
								status={formik.errors.size && formik.touched.size ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('size', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Length'>
							<Input
								value={formik.values.length}
								status={formik.errors.length && formik.touched.length ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('length', e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={12}>
				<Form.Item label='Thread Type'>
					<Input
						value={formik.values.threadType}
						status={formik.errors.threadType && formik.touched.threadType ? 'error' : undefined}
						onChange={(e) => formik.setFieldValue('threadType', e.target.value)}
					/>
				</Form.Item>
			</Col>
			<Col span={12}>
				<FieldArray
					name='threadLength'
					render={({ replace }) => (
						<Form.Item label='Thread Length'>
							<Row gutter={10}>
								{Array.from({ length: 2 }).map((_, index) => (
									<Col span={12}>
										<Input
											value={formik.values.threadLength![index]}
											onChange={(e) => replace(index, e.target.value)}
											status={formik.errors.threadLength && formik.touched.threadLength ? 'error' : undefined}
										/>
									</Col>
								))}
							</Row>
						</Form.Item>
					)}
				/>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={12}>
						<Form.Item label='Bend/Width'>
							<Input
								value={formik.values.width}
								status={formik.errors.width && formik.touched.width ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('width', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Finish Type'>
							<Input
								value={formik.values.finishType}
								status={formik.errors.finishType && formik.touched.finishType ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('finishType', e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={12}>
						<Form.Item label='Weight'>
							<Input
								value={formik.values.weight}
								status={formik.errors.weight && formik.touched.weight ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('weight', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Cut Length'>
							<Input
								value={formik.values.cutLength}
								status={formik.errors.cutLength && formik.touched.cutLength ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('cutLength', e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={10}>
						<Form.Item label='Hole Quantity'>
							<InputNumber
								value={formik.values.holeQuantity}
								status={formik.errors.holeQuantity && formik.touched.holeQuantity ? 'error' : undefined}
								onChange={(value) => formik.setFieldValue('holeQuantity', value)}
							/>
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item label='Hole Sizes'>
							<Select
								mode='tags'
								style={{ width: '100%' }}
								placeholder='Input hole size'
								onChange={(values: Array<string>) => formik.setFieldValue('holeSizes', values)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={6}>
						<Form.Item label='Lead'>
							<Input
								value={formik.values.lead}
								status={formik.errors.lead && formik.touched.lead ? 'error' : undefined}
								onChange={(e) => formik.setFieldValue('lead', e.target.value)}
							/>
						</Form.Item>
					</Col>
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
						<Form.Item label='Price/piece'>
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

export default ProductFields
