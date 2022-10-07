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

type DynaBoltProductProps = {}

const PRODUCT_NAME = 'DYNABOLT'

const DynaBoltProduct = (props: DynaBoltProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()

	const postValidation = Yup.object().shape({
		dynaboltSize: Yup.string().required('This field is required.'),
		Price: Yup.number().required('This field is required.'),
		Length: Yup.string().required('This field is required.')
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
					const product: FinishedProductProps = {
						...values.product!,
						quantity: values.quantity,
						totalPricePerSet: values.quantity * +(values.product?.price || 0)
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
									productName={PRODUCT_NAME}
									loading={loading}
									data={data}
									options={options}
									submitForm={submitForm}
									onShowForm={setShowForm}
									onUpdateProductDetails={() =>
										new Promise<boolean>((resolve, reject) => {
											if (values.product && values.product._id) {
												putData(
													`/api/admin/update/dynabolt/${values.product._id}`,
													{
														_id: values.product._id,
														DateCreated: values.product.createdAt,
														dynaboltSize: values.product.size,
														Length: values.product.length
													} as DynaBoltProps
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
						postData('/api/admin/add/dynabolt', values)
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

export default DynaBoltProduct
