import { Form, message, Modal, Row, Typography } from 'antd'
import * as Yup from 'yup'
import { Formik } from 'formik'
import React from 'react'
import ProductTable from './ProductTable'
import ProductForm from './form/ProductForm'
import { FinishedProduct } from '../../../contexts/ProductContext'
import instance2 from '../../../api/instance2'
import { RawMaterial } from '../../../contexts/RawMaterialContext'
import { Order } from '../../../contexts/OrderContext'

type ProductTabProps = {}

const ProductTab = (props: ProductTabProps) => {
	const { dispatch: setFinishProduct } = React.useContext(FinishedProduct)!
	const { dispatch: setRawMaterials } = React.useContext(RawMaterial)!
	const { dispatch: setOrders } = React.useContext(Order)!
	const [messageApi, alertContext] = message.useMessage()

	const getAll = React.useCallback(
		() =>
			new Promise<ResponseBaseProps<Array<FinishedProductProps>>>((resolve, reject) =>
				instance2()
					.get<ResponseBaseProps<Array<FinishedProductProps>>>(
						'/inventory/finished-product?sort=desc'
					)
					.then((res) => resolve(res.data))
					.catch(reject)
			),
		[]
	)

	React.useEffect(() => {
		getAll()
			.then((data) => data.packet?.filter((customer) => customer._id) || [])
			.then(setFinishProduct)
			.catch((err) => {
				messageApi.error({
					content: `Unable to get customers data. Please check your internet connection. Error: ${err.message}`,
					duration: 10
				})
			})

		instance2()
			.get<ResponseBaseProps<Array<OrderProps>>>('/order')
			.then((res) => res.data.packet!)
			.then(setOrders)
	}, [messageApi, getAll, setOrders, setFinishProduct])

	return (
		<Row>
			{alertContext}
			<Typography.Title level={2}>FINISHED PRODUCTS</Typography.Title>
			<Formik
				validationSchema={Yup.object().shape({
					name: Yup.string().required('This field is required.'),
					// threadLength: Yup.array().min(1, 'This field should be at least 1 parameter.').of(Yup.number().required()),
					price: Yup.number().positive().required('This field is required.')
				})}
				initialValues={
					{
						_id: undefined,
						name: '',
						threadLength: ['0', '0'],
						threadType: '',
						cutLength: '',
						weight: '',
						width: '',
						finishType: '',
						holeQuantity: '',
						holeSizes: [],
						price: '',
						lead: '',
						length: '',
						remarks: '',
						quantity: 0,
						size: '',
						type: '',
						visible: false,
						materials: [],
						quotationId: ''
					} as FinishedProductProps & {
						visible: boolean
					}
				}
				onSubmit={async (product, { resetForm, setFieldValue }) => {
					product.materials?.forEach(({ _id, quantity }) => {
						instance2()
							.post('/inventory/raw-material/mq', {
								_id,
								amount: quantity
							})
							.then(() =>
								setRawMaterials((prevState) =>
									prevState!.map((rawMaterial) => ({
										...rawMaterial,
										quantity:
											rawMaterial._id === _id
												? String(+(rawMaterial.quantity || 0) - (quantity || 0))
												: rawMaterial.quantity
									}))
								)
							)
					})

					const postResponse = await instance2()({
						method: product._id ? 'put' : 'post',
						url: `/inventory/finished-product/${product._id || ''}`,
						data: {
							...product,
							visible: undefined
						}
					})

					const getAllResponse = await getAll()
					const newData = getAllResponse.packet
					if (newData) {
						messageApi.success(postResponse.data.message, 5)
						setFinishProduct(newData)
						setFieldValue('visible', false)
						resetForm()
					}
				}}
			>
				{({ submitForm, values, initialValues, resetForm, setFieldValue }) => (
					<React.Fragment>
						<ProductTable onShowForm={(value) => setFieldValue('visible', value)} />
						<Modal
							open={values.visible}
							title='Add new finished product'
							footer={null}
							onCancel={() => {
								setFieldValue('visible', false)
								resetForm()
							}}
							width={1020}
							maskClosable={false}
						>
							<Form
								autoComplete='off'
								initialValues={initialValues}
								onFinish={submitForm}
							>
								<ProductForm />
							</Form>
						</Modal>
					</React.Fragment>
				)}
			</Formik>
		</Row>
	)
}

export default ProductTab
