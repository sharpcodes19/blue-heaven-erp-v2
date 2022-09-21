import _ from 'lodash'
import Moment from 'moment'
import { AutoComplete, Col, Row, Tag, Typography } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import React from 'react'
import instance2 from '../../../api/instance2'
import { SelectedQuotation } from '../../../contexts/SelectedQuotationContext'

type OrderSelectorProps = {}

const DEFAULT_OPTION: DefaultOptionType = {
	label: '** NEW QUOTATION **',
	value: '** NEW QUOTATION **'
}

const QuotationSelector = (props: OrderSelectorProps) => {
	// const customers = React.useContext(Customer)!
	const onSearch = React.useCallback((search: string) => {}, [])
	const [loading, setLoading] = React.useState<boolean>(true)
	const [options, setOptions] = React.useState<Array<DefaultOptionType>>([DEFAULT_OPTION])
	const { value, dispatch } = React.useContext(SelectedQuotation)!
	const [data, setData] = React.useState<Array<QuotationProps>>([])

	React.useEffect(() => {
		instance2()
			.get<ResponseBaseProps<Array<QuotationProps>>>('/quotation?sort=desc')
			.then(({ data: { packet } }) => {
				const filteredPacket = packet?.filter(({ _id }) => _id) || []
				setData(filteredPacket)
				const quotations = filteredPacket.map(({ label, _id, updatedAt }) => {
					return {
						label: (
							<Row gutter={5}>
								<Col>
									<Typography>
										<Typography.Text>{label}</Typography.Text>
									</Typography>
								</Col>
								<Col>
									<Tag color='pink'>{Moment(updatedAt).format('MMM DD, YYYY')}</Tag>
								</Col>
							</Row>
						),
						value: label,
						key: _id
					}
				})
				setOptions([DEFAULT_OPTION, ..._.uniqBy(quotations, 'value')])
			})
			.finally(() => setLoading(false))

		return () => {
			setLoading(true)
			setOptions([DEFAULT_OPTION])
		}
	}, [])

	return (
		<AutoComplete
			showSearch
			onSearch={onSearch}
			options={options}
			disabled={options.length <= 1 && loading}
			style={{ width: '100%' }}
			placeholder='Search customer with previous quotation data'
			onChange={(value, option) => {
				if (value === DEFAULT_OPTION.value) return dispatch(undefined)
				dispatch(data.filter((quotation) => quotation.label === value)[0])
			}}
		/>
	)
}

export default QuotationSelector
