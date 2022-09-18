import * as Yup from 'yup'
import _ from 'lodash'
import React from 'react'
import { Col, Layout, message, Row } from 'antd'
import { Form, Formik } from 'formik'
import ProductSpecList from '../ProductSpecList'
import ProductLookUpResultItem from '../_result/ProductLookUpResultItem'
import useData from './useData'
import AddForm from '../_add/AddForm'
import postData from '../postData'
import putData from '../putData'

type UBoltProductProps = {}

const PRODUCT_NAME = 'U-BOLT'

const UBoltProduct = (props: UBoltProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()

	const postValidation = Yup.object().shape({
		pipeSize: Yup.string().required('This field is required.'),
		Price: Yup.number().required('This field is required.'),
		uboltSize: Yup.string().required('This field is required.'),
		Material: Yup.string().required('This field is required.')
	})

	return (
		<Layout.Content>
			{contextHolder}
			<Formik
				initialValues={
					{
						selection: {
							name: PRODUCT_NAME
						},
						quantity: 1
					} as PricingFormProps
				}
				onSubmit={(values) => {
					if (values.product) {
						const product: FinishedProductProps = {
							...values.product,
							quantity: values.quantity
						}
						console.log(product)
					}
				}}
			>
				{({ submitForm, values }) => (
					<Form>
						<Row>
							<Col span={13}>
								<ProductSpecList name={PRODUCT_NAME} options={options} loading={loading} onShowForm={setShowForm} />
							</Col>
						</Row>
						<Row>
							<Col span={11}>
								<ProductLookUpResultItem
									loading={loading}
									data={data}
									options={options}
									submitForm={submitForm}
									onShowForm={setShowForm}
									onUpdateProductDetails={() =>
										new Promise<boolean>((resolve, reject) => {
											if (values.product && values.product._id && values.product.unit) {
												putData(
													values.product && values.product.unit === 'mm'
														? '/api/admin/update/uboltmm/'.concat(values.product._id)
														: values.product && values.product.unit === 'cm'
														? '/api/admin/update/uboltcm/'.concat(values.product._id)
														: '',
													{
														Material: values.product.type,
														pipeSize: values.product.length,
														uboltSize: values.product.size,
														Price: values.product.price,
														unit: values.product.unit,
														_id: values.product._id,
														DateCreated: values.product.createdAt
													} as UBoltProps
												)
													.then((success) => {
														messageApi.open({
															type: success ? 'success' : 'warning',
															content: success
																? 'Success! Product details has been updated.'
																: 'Failed. Cannot update the product. Please check the values if valid.',
															duration: 5
														})
														resolve(success)
													})
													.catch(reject)
											} else {
												resolve(false)
											}
										})
									}
								/>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
			{options?.length ? (
				<Formik
					initialValues={_.transform(
						options.map(({ originFieldName, fieldCount }) => ({
							[originFieldName]: fieldCount ? Array.from({ length: fieldCount }).fill('0') : ''
						})),
						_.ary(_.extend, 2),
						{}
					)}
					onSubmit={(values: any, { setSubmitting }) => {
						postData(values.unit === 'mm' ? '/api/admin/add/uboltmm' : '/api/admin/add/uboltcm', values)
							.then((success) => {
								setSubmitting(false)
								setShowForm(false)
								messageApi.open({
									type: success ? 'success' : 'warning',
									content: success
										? 'Success! Your form has been submitted.'
										: 'Failed. Cannot add your form at the moment. Please try again later.',
									duration: 5
								})
							})
							.catch(() => messageApi.error('Error! Technical problem has been detected while submmiting your form.'))
					}}
					validationSchema={postValidation}
				>
					<AddForm visible={showForm} onShowForm={setShowForm} productName={PRODUCT_NAME} options={options} />
				</Formik>
			) : null}
		</Layout.Content>
	)
}

export default UBoltProduct
