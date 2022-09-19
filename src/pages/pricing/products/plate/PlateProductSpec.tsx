import React from 'react'
import { Form, Col, InputNumber, Row, Space } from 'antd'
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
				name: 'thickness_inch',
				label: 'Thickness',
				rules
			},
			{
				name: 'length_inch',
				label: 'Length',
				rules
			},
			{
				name: 'width_mm',
				label: 'Width',
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
											field.name === 'perKilogramPrice' || field.name === 'holePricePerPiece' ? '₱' : undefined
										}
										value={formik.values[field.name as keyof PlateProps]}
										onChange={(value) => formik.setFieldValue(field.name, value)}
									/>
								</Form.Item>
							</Col>
						))}
					</Space>
				</Row>
			))}
		</React.Fragment>
	)
}

export default PlateProductSpec
