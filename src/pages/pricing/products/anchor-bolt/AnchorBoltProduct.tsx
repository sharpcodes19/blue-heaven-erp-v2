import * as Yup from 'yup'
import _ from 'lodash'
import React from 'react'
import { Button, Col, Layout, message, Row, Typography } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'
import { Form, Formik } from 'formik'
import useData from './useData'
import AddForm from '../_add/AddForm'
import useAddProductToQuotationTable from '../_quotation/useAddProductToQuotationTable'
import instance2 from '../../../../api/instance2'
import ProductSpecSelector from './ProductSpecSelector'
import ProductLookUpResultItem from '../_result/ProductLookUpResultItem'

type AnchorBoltProductProps = {}

const PRODUCT_NAME = 'ABOLT'

const AnchorBoltProduct = (props: AnchorBoltProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()

	const postValidation = Yup.object().shape({
		diameter: Yup.string().required('This field is required.'),
		steel: Yup.string().required('This field is required.'),
		bend: Yup.number().required('This field is required.'),
		lengthByInches: Yup.string().required('This field is required.'),
		lengthByMillimeter: Yup.number().required('This field is required.'),
		thread: Yup.string().required('This field is required.'),
		price: Yup.number().positive().required('This field is required.'),
		hexNut: Yup.string().required('This field is required.'),
		hexNutPrice: Yup.number().positive().required('This field is required.'),
		fW: Yup.string().required('This field is required.'),
		fWPrice: Yup.number().required('This field is required.'),
		totalPerSet: Yup.number().positive().required('This field is required.')
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
						quantity: 1,
						hexNutQuantity: 0,
						fWQuantity: 0
					} as PricingFormProps
				}
				onSubmit={(values) => {
					// instance2().post('/quotation', values.product)
					const washer = values.fWQuantity * (values.product?.fWPrice || 0)
					const nut = values.hexNutQuantity * (values.product?.hexNutPrice || 0)
					const price = +(values.product?.price || 0)

					const product: FinishedProductProps = {
						...values.product!,
						name: PRODUCT_NAME,
						quantity: values.quantity,
						hexNutQuantity: values.hexNutQuantity,
						fWQuantity: values.fWQuantity,
						totalPricePerSet: (washer + nut + price) * values.quantity,
						price: String(washer + nut + price)
					}
					handleSubmit(product)
				}}
			>
				{({ values, submitForm }) => (
					<Form>
						<Row>
							<Col>
								<Typography>
									<Typography.Title level={2}>{PRODUCT_NAME} CALCULATOR</Typography.Title>
									{/* <Typography.Text type='secondary'>
								Click the button to select desired combination of product
								specifications.
							</Typography.Text> */}
								</Typography>
								<div style={{ marginTop: '1rem' }}>
									<Button onClick={loading ? undefined : () => setShowForm(true)} icon={<FileAddOutlined />} loading={loading}>
										Add new
									</Button>
								</div>
							</Col>
						</Row>
						<ProductSpecSelector data={data} />
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
										instance2()
											.put(`/product/abolt/${values.product._id}`, {
												diameter: values.product!.size,
												steel: values.product!.type,
												// lengthByInches?: string
												lengthByMillimeter: values.product!.length_mm,
												bend: values.product!.width,
												thread: values.product!.threadLength ? values.product!.threadLength[0] : undefined,
												price: values.product!.price,
												hexNut: values.product!.hexNut,
												hexNutPrice: values.product!.hexNutPrice,
												// hexNutQuantity?: string
												fW: values.product!.washer,
												fWPrice: values.product!.fWPrice,
												// fWQuantity?: string
												totalPerSet: String(values.product.totalPricePerSet)
												// totalPrice?: string
												// csvSource?: string
											} as AnchorBoltProps)
											.then(({ data }) => {
												messageApi.success({
													content: data.message,
													duration: 5
												})
												resolve(true)
											})
											.catch(reject)
									} else {
										resolve(false)
									}
								})
							}
						/>
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
						instance2()
							.post<ResponseBaseProps>('/product/abolt', values)
							.then(({ data: { message } }) => {
								setSubmitting(false)
								setShowForm(false)
								messageApi.success({
									content: message,
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

export default AnchorBoltProduct
