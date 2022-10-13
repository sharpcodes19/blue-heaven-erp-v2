import _ from 'lodash'
import { AutoComplete, Col, Descriptions, Row } from 'antd'
import React from 'react'
import { Customer } from '../../../../contexts/CustomerContext'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'
import instance2 from '../../../../api/instance2'

type QuotationDetailsProps = {}

const labelStyle = {
	transform: 'translateY(4px)'
}

const QuotationDetails = (props: QuotationDetailsProps) => {
	const { value: selectedOrder, dispatch } = React.useContext(SelectedQuotation)!
	const { value: customers, dispatch: setCustomers } = React.useContext(Customer)!
	const [options, setOptions] = React.useState<Array<any> | undefined>(
		customers?.map(({ name }) => ({
			label: name,
			value: name
		}))
	)

	React.useEffect(() => {
		;(async () => {
			let _cust: Array<CustomerProps> = []
			if (!customers || !customers.length) {
				const {
					data: { packet }
				} = await instance2().get<ResponseBaseProps<Array<CustomerProps>>>('/customer')
				_cust.push(...packet!)
				setOptions(
					_cust.map(({ name }) => ({
						label: name,
						value: name
					}))
				)
				setCustomers(_cust)
			}
		})()
	}, [customers, setCustomers])

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
							filterOption={(inputValue, option) =>
								option!.label?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
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
