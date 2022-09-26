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
import useAddProductToQuotationTable from '../_quotation/useAddProductToQuotationTable'

type AnchorBoltProductProps = {}

const PRODUCT_NAME = 'ABOLT'

const AnchorBoltProduct = (props: AnchorBoltProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()

	const postValidation = Yup.object().shape({
		bend: Yup.string().required('This field is required.'),
		standard: Yup.number().required('This field is required.'),
		hexNut: Yup.number().required('This field is required.'),
		fW: Yup.number().required('This field is required.'),
		sizeA: Yup.string().required('This field is required.'),
		inchA: Yup.string().required('This field is required.'),
		typeAnchor: Yup.string().required('This field is required.')
		// .oneOf(_.uniqBy(data, 'type').map(({ type }) => type)),
	})
	const { handleSubmit } = useAddProductToQuotationTable(messageApi)

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
					// instance2().post('/quotation', values.product)
					const product: FinishedProductProps = {
						...values.product!,
						quantity: values.quantity
					}
					handleSubmit(product)
				}}
			>
				{({ submitForm, values }) => (
					<Form>
						<ProductSpecList
							name={PRODUCT_NAME}
							options={options}
							loading={loading}
							onShowForm={setShowForm}
						/>
						<Row>
							<Col>
								<ProductLookUpResultItem
									loading={loading}
									data={data}
									options={options}
									submitForm={submitForm}
									onShowForm={setShowForm}
									onUpdateProductDetails={() =>
										new Promise<boolean>((resolve, reject) => {
											if (values.product && values.product._id) {
												putData(
													`/api/admin/update/anchorBolt/${values.product._id}`,
													{
														bend: values.product.width,
														fW: values.product.washer,
														hexNut: values.product.hexNut,
														inchA: values.product.length,
														sizeA: values.product.size,
														standard: values.product.price,
														typeAnchor: values.product.type,
														total:
															(values.product.price
																? parseFloat(values.product.price)
																: 0) +
															(values.product.washer
																? parseFloat(values.product.washer)
																: 0) +
															(values.product.hexNut
																? parseFloat(values.product.hexNut)
																: 0)
													} as AnchorBoltProps
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
							[originFieldName]: fieldCount
								? Array.from({ length: fieldCount }).fill('0')
								: ''
						})),
						_.ary(_.extend, 2),
						{}
					)}
					onSubmit={(values: any, { setSubmitting }) => {
						postData('/api/admin/add/anchorBolt', values)
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
							.catch(() =>
								messageApi.error(
									'Error! Technical problem has been detected while submmiting your form.'
								)
							)
					}}
					validationSchema={postValidation}
				>
					<AddForm
						visible={showForm}
						onShowForm={setShowForm}
						productName={PRODUCT_NAME}
						options={options}
					/>
				</Formik>
			) : null}
		</Layout.Content>
	)
}

export default AnchorBoltProduct
