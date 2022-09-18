import React from 'react'
import { Col, Layout, Modal, Row } from 'antd'
import { Form, Formik } from 'formik'
import ProductSpecList from '../ProductSpecList'
import ProductLookUpResultItem from '../_result/ProductLookUpResultItem'
import useData from './useData'
import AddForm from '../_add/AddForm'

type SagRodProductProps = {}

const PRODUCT_NAME = 'SAGROD'

const SagRodProduct = (props: SagRodProductProps) => {
	const { data, options, loading } = useData(PRODUCT_NAME)
	const [showForm, setShowForm] = React.useState<boolean>(false)

	return (
		<Layout.Content>
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
								<ProductLookUpResultItem data={data} options={options} submitForm={submitForm} />
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
			<AddForm visible={showForm} onShowForm={setShowForm} productName={PRODUCT_NAME} options={options} />
		</Layout.Content>
	)
}

export default SagRodProduct
