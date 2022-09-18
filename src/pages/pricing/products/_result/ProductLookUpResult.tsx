import { Button, Col, Descriptions, InputNumber, Row, Space, Typography } from 'antd'
import { FieldArray, useFormikContext } from 'formik'
import React from 'react'
import ProductLookUpResultItemField from './ProductLookUpResultItemField'

type ProductLookUpResultProps = {
	submitForm: () => any
	target: FinishedProductProps
}

const ProductLookUpResult = (props: ProductLookUpResultProps) => {
	const formik = useFormikContext<PricingFormProps>()

	return (
		<React.Fragment>
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
													/>
												)}
											/>
										))
									) : (
										<ProductLookUpResultItemField name={key as keyof FinishedProductProps} target={props.target} />
									)}
								</Descriptions.Item>
							)
						)}
					</Descriptions>
				</Col>
			</Row>
			<Row>
				<Col span={18}>
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
						<Button type='primary' onClick={props.submitForm}>
							Add to current Quotation table
						</Button>
					</Space>
				</Col>
			</Row>
		</React.Fragment>
	)
}

export default ProductLookUpResult
