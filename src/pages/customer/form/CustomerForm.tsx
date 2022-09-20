import { Button, Divider, Form, Input, InputNumber, Row } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import items from './makeItems'

type CustomerFormProps = {}

const CustomerForm = (props: CustomerFormProps) => {
	const formik = useFormikContext<CustomerProps>()

	return (
		<React.Fragment>
			{items.map(({ key, label, type }) => (
				<Form.Item label={label} key={key}>
					{type === 'number' ? (
						<InputNumber
							value={formik.values[key]}
							onChange={(value) => formik.setFieldValue(key, value)}
							status={formik.errors[key] && formik.touched[key] ? 'error' : undefined}
							min='0'
						/>
					) : (
						<Input
							value={formik.values[key]}
							onChange={(e) => formik.setFieldValue(key, e.target.value)}
							status={formik.errors[key] && formik.touched[key] ? 'error' : undefined}
						/>
					)}
				</Form.Item>
			))}
			<Divider />
			<Row justify='end'>
				<Button htmlType='submit' type='primary' loading={formik.isSubmitting}>
					Submit
				</Button>
			</Row>
		</React.Fragment>
	)
}

export default CustomerForm
