import { Button, Col, Row, Table } from 'antd'
import { FieldArray } from 'formik'
import React from 'react'
import Moment from 'moment'
import useColumns from './useColumns'

type PartialPaymentProps = {}

const PartialPayment = (props: PartialPaymentProps) => {
	const { columns } = useColumns()

	return (
		<FieldArray
			name='balancePayment'
			render={(formik) => (
				<Row justify='end'>
					<Col style={{ marginBottom: 5 }}>
						<Button
							type='primary'
							onClick={() =>
								formik.unshift({
									amount: 0,
									paymentMethod: 'N/A',
									paymentDate: Moment().toDate(),
									__new__: true
								} as PartialPaymentProps)
							}
						>
							Add payment row
						</Button>
					</Col>
					<Col span={24}>
						<Table
							dataSource={formik.form.values.balancePayment}
							columns={columns}
							size='small'
						/>
					</Col>
				</Row>
			)}
		/>
	)
}

export default PartialPayment
