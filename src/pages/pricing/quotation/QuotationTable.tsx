import { Col, Table } from 'antd'
import React from 'react'
import { SelectedQuotation } from '../../../contexts/SelectedQuotationContext'
import columns from './table/useColumns'

type QuotationTableProps = {}

const QuotationTable = (props: QuotationTableProps) => {
	const selectedQuotation = React.useContext(SelectedQuotation)!

	return (
		<Col span={24} style={{ marginTop: '1rem' }}>
			<Table
				columns={columns}
				dataSource={selectedQuotation.value?.items}
				size='small'
				scroll={{ x: 'calc(700px + 50%)' }}
			/>
		</Col>
	)
}

export default QuotationTable
