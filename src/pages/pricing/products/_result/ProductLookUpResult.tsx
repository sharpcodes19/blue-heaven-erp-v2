import { Button, Col, Descriptions, InputNumber, message, Row, Space, Typography } from 'antd'
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
						<Typography.Text type='danger'>Unable to complete the update request.</Typography.Text>
						<Typography.Text type='danger'>It is either we cannot find the product id.</Typography.Text>
						<Typography.Text type='danger'>Product ID: {formik.values.product?._id}</Typography.Text>
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
						{Object.keys(props.target).map((key) =>
							props.target[key as keyof FinishedProductProps] instanceof Date || key === '_id' ? null : (
								<Descriptions.Item label={key} key={key} span={3}>
									{props.target[key as keyof FinishedProductProps] instanceof Array ? (
										(props.target[key as keyof FinishedProductProps] as []).map((_, index) => (
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
										))
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
				<Col span={18}>
					<Button
						type='ghost'
						style={{ marginTop: '1rem' }}
						onClick={submmiting ? undefined : handleUpdate}
						disabled={!enableUpdateButton}
						loading={submmiting}
					>
						Update new changes to database.
					</Button>
					<Space align='center' style={{ marginTop: '1rem' }}>
						<InputNumber
							min={1}
							defaultValue={1}
							addonBefore='Quantity'
							onChange={(value) => {
								formik.setFieldValue('quantity', value)
							}}
							value={formik.values.quantity}
						/>
						<Button type='primary' onClick={props.submitForm} icon={<ShoppingCartOutlined />}>
							Add to current Quotation table
						</Button>
					</Space>
				</Col>
			</Row>
		</React.Fragment>
	)
}

export default ProductLookUpResult
