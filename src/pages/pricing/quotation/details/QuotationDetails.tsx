import _ from 'lodash'
import { AutoComplete, Col, Descriptions, Row, Select } from 'antd'
import React from 'react'
import { Customer } from '../../../../contexts/CustomerContext'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'

type QuotationDetailsProps = {}

const labelStyle = {
	transform: 'translateY(4px)'
}

const QuotationDetails = (props: QuotationDetailsProps) => {
	const { value: selectedOrder, dispatch } = React.useContext(SelectedQuotation)!
	const customers = React.useContext(Customer)!

	const options = React.useMemo<Array<any> | undefined>(
		() =>
			customers.value?.map((customer) => ({
				value: customer.name,
				key: customer._id
			})),
		[customers.value]
	)

	return (
		<Row style={{ marginTop: '1rem' }}>
			<Col span={10}>
				<Descriptions>
					<Descriptions.Item label='Customer Name' labelStyle={labelStyle}>
						{/* <Select
							options={_.sortBy(options, 'label')}
							style={{ width: '100%' }}
							onChange={(value) => {
								dispatch((prevState) => ({
									...prevState!,
									customerId: value
								}))
							}}
						/> */}
						<AutoComplete
							style={{ width: '100%' }}
							options={_.sortBy(options, 'label')}
							placeholder='Search customer name'
							filterOption={(inputValue, option) => option!.label?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
							onChange={(value) => {
								dispatch({
									...selectedOrder!,
									customerId: value
								})
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
