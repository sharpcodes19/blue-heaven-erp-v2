import { Button, Col, Descriptions, InputNumber, Row, Space, Typography } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'

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
									<Typography>
										<Typography.Text editable={key === '_id' ? false : true}>
											{(props.target as any)[key]}
										</Typography.Text>
									</Typography>
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
