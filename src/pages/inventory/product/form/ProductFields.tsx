import React from 'react'
import { Col, Form, Input, InputNumber, Row } from 'antd'
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
								status={
									formik.errors.length && formik.touched.length ? 'error' : undefined
								}
								onChange={(e) => formik.setFieldValue('length', e.target.value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={11}>
						<Form.Item label='Thread Type'>
							<Input
								value={formik.values.threadType}
								status={
									formik.errors.threadType && formik.touched.threadType
										? 'error'
										: undefined
								}
								onChange={(e) => formik.setFieldValue('threadType', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col span={10}>
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
													status={
														formik.errors.threadLength && formik.touched.threadLength
															? 'error'
															: undefined
													}
												/>
											</Col>
										))}
									</Row>
								</Form.Item>
							)}
						/>
					</Col>
				</Row>
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
								status={
									formik.errors.finishType && formik.touched.finishType
										? 'error'
										: undefined
								}
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
							<InputNumber
								value={formik.values.weight}
								status={
									formik.errors.weight && formik.touched.weight ? 'error' : undefined
								}
								onChange={(value) => formik.setFieldValue('weight', value)}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Cut Length'>
							<InputNumber
								value={+(formik.values.cutLength || 0)}
								status={
									formik.errors.cutLength && formik.touched.cutLength
										? 'error'
										: undefined
								}
								min={0}
								onChange={(value) => formik.setFieldValue('cutLength', value)}
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
								status={
									formik.errors.holeQuantity && formik.touched.holeQuantity
										? 'error'
										: undefined
								}
								onChange={(value) => formik.setFieldValue('holeQuantity', value)}
							/>
						</Form.Item>
					</Col>
					<Col span={14}>
						<Form.Item label='Hole Sizes'>
							{/* <Select
								mode='tags'
								style={{ width: '100%' }}
								placeholder='Input hole size'
								onChange={(values: Array<string>) => formik.setFieldValue('holeSizes', values)}
							/> */}
							<Input
								value={(formik.values.holeSizes || []).join(' x ')}
								status={
									formik.errors.holeSizes && formik.touched.holeSizes
										? 'error'
										: undefined
								}
								onChange={(e) => formik.setFieldValue('holeSizes', [e.target.value])}
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
								status={
									formik.errors.quantity && formik.touched.quantity ? 'error' : undefined
								}
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
				<Row gutter={10}>
					<Col span={13}>
						<Form.Item label='Hex Nut'>
							<Input
								value={formik.values.hexNut}
								status={
									formik.errors.hexNut && formik.touched.hexNut ? 'error' : undefined
								}
								onChange={(e) => formik.setFieldValue('hexNut', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item label='Price per piece'>
							<InputNumber
								value={formik.values.hexNutPrice}
								status={
									formik.errors.hexNutPrice && formik.touched.hexNutPrice
										? 'error'
										: undefined
								}
								min={0}
								onChange={(value) => formik.setFieldValue('hexNutPrice', value)}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Col>
			<Col span={24}>
				<Row gutter={10}>
					<Col span={13}>
						<Form.Item label='Washer'>
							<Input
								value={formik.values.washer}
								status={
									formik.errors.washer && formik.touched.washer ? 'error' : undefined
								}
								onChange={(e) => formik.setFieldValue('washer', e.target.value)}
							/>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item label='Price per piece'>
							<InputNumber
								value={formik.values.fWPrice}
								status={
									formik.errors.fWPrice && formik.touched.fWPrice ? 'error' : undefined
								}
								min={0}
								onChange={(value) => formik.setFieldValue('fWPrice', value)}
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
