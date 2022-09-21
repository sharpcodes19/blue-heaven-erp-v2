import React from 'react'
import { Button, Col, Form, InputNumber, Row, Space } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Formik } from 'formik'
import ProductSpecList from '../ProductSpecList'
import PlateProductResult from './PlateProductResult'
import PlateProductSpec from './PlateProductSpec'

type PlateProductProps = {}

const PRODUCT_NAME: string = 'PLATE'

const PlateProduct = (props: PlateProductProps) => {
	return (
		<Row>
			<ProductSpecList noPostForm name={PRODUCT_NAME} onShowForm={() => {}} />
			<Formik
				initialValues={
					{
						thickness_inch: 0,
						length_inch: 0,
						width_mm: 0,
						perKilogramPrice: 0,
						holeQuantity: 0,
						holePricePerPiece: 0,
						quantity: 1
					} as PlateProps
				}
				onSubmit={(values) => {
					const product: FinishedProductProps = {
						holeQuantity: String(values.holeQuantity),
						remarks: `Price per hole: ${values.holePricePerPiece}, Price per kilo: ${values.perKilogramPrice}`,
						length: String(values.length_inch),
						width: String(values.width_mm),
						weight: String(values.weight),
						name: PRODUCT_NAME,
						quantity: values.quantity,
						size: String(values.thickness_inch)
					}
				}}
			>
				{({ initialValues, handleSubmit, setFieldValue, values }) => (
					<Col span={24}>
						<Form autoComplete='off' initialValues={initialValues} onFinish={handleSubmit}>
							<Row>
								<Col>
									<PlateProductSpec />
								</Col>
							</Row>
							<Row>
								<Col>
									<PlateProductResult target={values} />
								</Col>
							</Row>
							<Form.Item>
								<Space align='center' style={{ marginTop: '1rem' }}>
									<InputNumber
										min={1}
										defaultValue={1}
										addonBefore='Quantity'
										onChange={(value) => {
											setFieldValue('quantity', value)
										}}
										value={values.quantity}
									/>
									<Button type='primary' htmlType='submit' icon={<ShoppingCartOutlined />}>
										Add to current Quotation table
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</Col>
				)}
			</Formik>
		</Row>
	)
}

export default PlateProduct
