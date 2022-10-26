import { Button, Col, Descriptions, InputNumber, message, Row, Typography } from 'antd'
import { FieldArray, useFormikContext } from 'formik'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import ProductLookUpResultItemField from './ProductLookUpResultItemField'

type ProductLookUpResultProps = {
	submitForm: () => any
	target: FinishedProductProps
	onShowForm: (value: boolean) => any
	onUpdateProductDetails: () => Promise<boolean>
}

const ProductLookUpResult = (props: ProductLookUpResultProps) => {
	const formik = useFormikContext<PricingFormProps>()
	const [enableUpdateButton, setEnableUpdateButton] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()
	const [submmiting, setSubmitting] = React.useState<boolean>(false)

	const handleUpdate = React.useCallback(() => {
		if (formik.values.product && formik.values.product._id) {
			setSubmitting(true)
			props
				.onUpdateProductDetails()
				.catch((err) => {}) // TODO: add error alert here.
				.finally(() => {
					setSubmitting(false)
					setEnableUpdateButton(false)
				})
		} else {
			messageApi.error({
				content: (
					<Typography>
						<Typography.Text type='danger'>
							Unable to complete the update request.
						</Typography.Text>
						<Typography.Text type='danger'>
							It is either we cannot find the product id.
						</Typography.Text>
						<Typography.Text type='danger'>
							Product ID: {formik.values.product?._id}
						</Typography.Text>
					</Typography>
				)
			})
		}
	}, [formik.values.product, messageApi, props])

	return (
		<React.Fragment>
			{contextHolder}
			<Row style={{ marginTop: '1rem' }}>
				<Col>
					<Descriptions bordered title='PRODUCT DETAILS' size='small'>
						{(props.target.name.toLowerCase() === 'abolt'
							? [
									'size',
									'type',
									'length',
									'length_mm',
									'width',
									'threadLength',
									'hexNut',
									'hexNutPrice',
									'washer',
									'fWPrice',
									'cutLength',
									'price',
									'totalPricePerSet'
							  ]
							: Object.keys(props.target)
						).map((key) =>
							key === 'createdAt' || key === 'updatedAt' || key === '_id' ? null : (
								<Descriptions.Item label={key} key={key} span={3}>
									{props.target[key as keyof FinishedProductProps] instanceof Array ? (
										(props.target[key as keyof FinishedProductProps] as []).map(
											(_, index) => (
												<FieldArray
													key={index}
													name={`${key}.${index}`}
													render={({ name, form }) => (
														<ProductLookUpResultItemField
															name={name as keyof FinishedProductProps}
															target={form.values.selection}
															onEnableUpdateButton={setEnableUpdateButton}
														/>
													)}
												/>
											)
										)
									) : (
										<ProductLookUpResultItemField
											onEnableUpdateButton={setEnableUpdateButton}
											name={key as keyof FinishedProductProps}
											target={props.target}
										/>
									)}
								</Descriptions.Item>
							)
						)}
					</Descriptions>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Button
						type='ghost'
						style={{ marginTop: '1rem' }}
						onClick={submmiting ? undefined : handleUpdate}
						disabled={!enableUpdateButton}
						loading={submmiting}
					>
						Update new changes to database.
					</Button>
				</Col>
				{props.target.name === 'ABOLT' ? (
					<Col span={24} style={{ marginTop: '1rem' }}>
						<InputNumber
							min={0}
							defaultValue={1}
							addonBefore='Hex Nut Qty'
							onChange={(value) => {
								formik.setFieldValue('hexNutQuantity', value)
							}}
							value={formik.values.hexNutQuantity}
							style={{
								maxWidth: 170,
								marginRight: 10
							}}
						/>
						<InputNumber
							min={0}
							defaultValue={1}
							addonBefore='FW Qty'
							onChange={(value) => {
								formik.setFieldValue('fWQuantity', value)
							}}
							value={formik.values.fWQuantity}
							style={{
								maxWidth: 130,
								marginRight: 10
							}}
						/>
						<InputNumber
							min={0}
							defaultValue={0}
							addonBefore='Weight'
							onChange={(value) => {
								formik.setFieldValue('weight', value)
							}}
							value={formik.values.weight}
							style={{
								maxWidth: 130,
								marginRight: 10
							}}
						/>
					</Col>
				) : null}
				<Col span={24} style={{ marginTop: '1rem' }}>
					<InputNumber
						min={1}
						defaultValue={1}
						addonBefore='Quantity'
						onChange={(value) => {
							formik.setFieldValue('quantity', value)
						}}
						value={formik.values.quantity}
						style={{
							maxWidth: 150,
							marginRight: 10
						}}
					/>
					<InputNumber
						min={0}
						defaultValue={0.0}
						addonBefore='Add Price Percentage'
						addonAfter='%'
						onChange={(value) => {
							formik.setFieldValue('pricePercentage', value)
						}}
						value={formik.values.pricePercentage}
						style={{
							maxWidth: 250,
							marginRight: 10
						}}
						step={0.1}
					/>
					<Button
						type='primary'
						onClick={props.submitForm}
						icon={<ShoppingCartOutlined />}
					>
						Add to current Quotation table
					</Button>
				</Col>
			</Row>
		</React.Fragment>
	)
}

export default ProductLookUpResult
