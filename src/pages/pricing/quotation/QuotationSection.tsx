import { Button, Col, Descriptions, Form, Row, Typography } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { SelectedQuotation } from '../../../contexts/SelectedQuotationContext'
import QuotationDetails from './details/QuotationDetails'
import QuotationSelector from './QuotationSelector'
import QuotationTable from './QuotationTable'

type QuotationSectionProps = {}

const QuotationSection = (props: QuotationSectionProps) => {
	const [showForm, setShowForm] = React.useState<boolean>(false)
	// const { value, dispatch } = React.useContext(SelectedQuotation)!

	return (
		<Row style={{ marginBottom: '3rem' }}>
			<Typography>
				<Typography.Title level={3}>QUOTATION DETAILS</Typography.Title>
			</Typography>
			<Row>
				<Col span={24}>
					<QuotationDetails />
				</Col>
			</Row>
			<Row>
				<QuotationTable />
			</Row>
		</Row>
	)
}

export default QuotationSection
