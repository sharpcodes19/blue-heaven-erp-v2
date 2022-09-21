import _ from 'lodash'
import { Col, Descriptions, Row, Select } from 'antd'
import React from 'react'
import { Customer } from '../../../../contexts/CustomerContext'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'

type QuotationDetailsProps = {}

const labelStyle = {
	transform: 'translateY(4px)'
}

const QuotationDetails = (props: QuotationDetailsProps) => {
	const { dispatch } = React.useContext(SelectedQuotation)!
	const customers = React.useContext(Customer)!

	const options = React.useMemo<Array<any> | undefined>(
		() =>
			customers.value?.map((customer) => ({
				label: customer.name,
				value: customer._id
			})),
		[customers.value]
	)

	return (
		<Row style={{ marginTop: '1rem' }}>
			<Col span={10}>
				<Descriptions>
					<Descriptions.Item label='Customer Name' labelStyle={labelStyle}>
						<Select
							options={_.sortBy(options, 'label')}
							style={{ width: '100%' }}
							onChange={(value) => {
								dispatch((prevState) => ({
									...prevState!,
									customerId: value
								}))
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
				{/* <Descriptions>
					<Descriptions.Item label='Time Lead' labelStyle={labelStyle}>
						<InputNumber
							value={value?.timeLead || 0}
							onChange={(value) => dispatch((prevState) => ({ ...prevState!, timeLead: value || 0 }))}
						/>
					</Descriptions.Item>
				</Descriptions> */}
			</Col>
		</Row>
	)
}

export default QuotationDetails
