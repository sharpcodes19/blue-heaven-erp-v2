import _ from 'lodash'
import { useFormikContext } from 'formik'
import React from 'react'
import { SaveOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Row } from 'antd'
import ProductLookUpResult from './ProductLookUpResult'

type ProductLookUpResultItemProps = {
	data: Array<FinishedProductProps>
	options: Array<SelectablePricingOptionProps>
	submitForm: () => any
	onShowForm: (value: boolean) => any
	onUpdateProductDetails: () => Promise<boolean>
}

type Status = 'info' | 'success' | 'error' | 'warning'

const ProductLookUpResultItem = (props: ProductLookUpResultItemProps) => {
	const formik = useFormikContext<PricingFormProps>()
	const [status, setStatus] = React.useState<Status>('info')

	React.useEffect(() => {
		const selectedKeyCount =
			Object.keys(formik.values.selection).length - Object.keys(formik.initialValues.selection).length
		const optionKeyCount = props.options.filter((item) => !item.hideStepComponent).length
		const finish = selectedKeyCount >= optionKeyCount
		const product = _.find(props.data, formik.values.selection)
		if (finish && product) {
			formik.setFieldValue('product', product)
		}
		setStatus(finish && product ? 'success' : finish && !product ? 'error' : 'info')

		return () => {
			setStatus('info')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data, formik.values.selection, props.options, formik.initialValues.selection])

	return (
		<Row style={{ marginTop: '2rem' }}>
			<Col span={24}>
				<Alert
					message='Selection Result'
					description={
						status === 'error'
							? 'Cannot find the combination of product specification from our database.'
							: status === 'info'
							? 'After you chose the required specification of the product, the product details will reflect below.'
							: status === 'success'
							? 'The system found the product with the same specification.'
							: 'The system detected unknown action. Please refresh the page if the system is suggesting a wrong product.'
					}
					type={status}
					showIcon
					action={
						status === 'error' ? (
							<Button type='ghost' size='small' icon={<SaveOutlined />}>
								Add your selection to database
							</Button>
						) : undefined
					}
				/>
			</Col>
			<Col span={24}>
				{status === 'success' && formik.values.product && (
					<ProductLookUpResult
						submitForm={props.submitForm}
						target={formik.values.product}
						onShowForm={props.onShowForm}
						onUpdateProductDetails={props.onUpdateProductDetails}
					/>
				)}
			</Col>
		</Row>
	)
}

export default ProductLookUpResultItem
