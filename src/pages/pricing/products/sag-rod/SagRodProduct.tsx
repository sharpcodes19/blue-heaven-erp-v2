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

type SagRodProductProps = {}

const PRODUCT_NAME = 'SAGROD'

const SagRodProduct = (props: SagRodProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)
	const [messageApi, contextHolder] = message.useMessage()

	const postValidation = Yup.object().shape({
		bending: Yup.string().required('This field is required.'),
		cuttingCost: Yup.number().required('This field is required.'),
		size: Yup.string().required('This field is required.'),
		type: Yup.string().required('This field is required.').oneOf(['CRS', '41401045']),
		threading: Yup.array().min(1, 'This field should be at least 1 parameter.').of(Yup.number().required())
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
				onSubmit={(values) => {}}
			>
				{({ submitForm, initialValues }) => (
					<Form>
						<Row>
							<Col span={12}>
								<ProductSpecList name={PRODUCT_NAME} options={options} loading={loading} onShowForm={setShowForm} />
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<ProductLookUpResultItem
									data={data}
									options={options}
									submitForm={submitForm}
									onShowForm={setShowForm}
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
						postData(values.type === 'CRS' ? '/api/admin/add/Asszabtcrs' : '/api/admin/add/Asszabt41401045', values)
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

export default SagRodProduct
