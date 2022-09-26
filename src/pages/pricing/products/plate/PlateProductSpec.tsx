import React from 'react'
import { Form, Col, InputNumber, Row, Space, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import { useFormikContext } from 'formik'

type PlateProductSpecProps = {}

const PlateProductSpec = (props: PlateProductSpecProps) => {
	const rules: Array<Rule> = [
		{
			required: true,
			message: 'This field is required.'
		},
		{
			type: 'number',
			message: 'Number only'
		}
	]

	const items = [
		[
			{
				name: 'perKilogramPrice',
				label: 'How much is kilogram per price today?',
				rules
			}
		],
		[
			{
				name: 'thickness_mm',
				label: 'Thickness (mm)',
				rules
			},
			{
				name: 'length_mm',
				label: 'Length (mm)',
				rules
			},
			{
				name: 'width_mm',
				label: 'Width (mm)',
				rules
			}
		],
		[
			{
				name: 'holeQuantity',
				label: 'No. of holes',
				rules
			}
		],
		[
			{
				name: 'holePricePerPiece',
				label: 'Price per hole',
				rules
			}
		]
	]
	const formik = useFormikContext<PlateProps>()

	return (
		<React.Fragment>
			{items.map((fields: any, i) => (
				<Row key={i}>
					<Space>
						{fields.map((field: any) => (
							<Col key={field.name}>
								<Form.Item name={field.name} label={field.label}>
									<InputNumber
										addonBefore={
											field.name === 'perKilogramPrice' ||
											field.name === 'holePricePerPiece'
												? '₱'
												: undefined
										}
										value={formik.values[field.name as keyof PlateProps]}
										onChange={(value) =>
											formik.setFieldValue(field.name, value)
										}
									/>
								</Form.Item>
							</Col>
						))}
					</Space>
				</Row>
			))}
			<Col span={24}>
				<Form.Item name='remarks' label='Remarks'>
					<Input
						value={formik.values.remarks}
						onChange={(e) => formik.setFieldValue('remarks', e.target.value)}
					/>
				</Form.Item>
			</Col>
		</React.Fragment>
	)
}

export default PlateProductSpec
