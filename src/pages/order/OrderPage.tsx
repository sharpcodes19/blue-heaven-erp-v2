import { Layout, message, Modal, Typography } from 'antd'
import { Formik } from 'formik'
import Moment from 'moment'
import React from 'react'
import instance2 from '../../api/instance2'
import { Customer } from '../../contexts/CustomerContext'
import { Order } from '../../contexts/OrderContext'
import OrderForm from './form/OrderForm'
import OrderTable from './OrderTable'
import { Route, Routes } from 'react-router-dom'
import PrintPreview from './print/PrintPreview'
import { RawMaterial } from '../../contexts/RawMaterialContext'

type OrderPageProps = {}

export type DateRange = {
	from: Date | null
	to: Date | null
}

const OrderPage = (props: OrderPageProps) => {
	const [messageApi, alertContext] = message.useMessage()
	const { value: customers, dispatch: setCustomers } = React.useContext(Customer)!
	const { value: rawMaterials, dispatch: setRawMaterials } =
		React.useContext(RawMaterial)!
	const [dateRange, setDateRange] = React.useState<DateRange>({
		from: Moment().startOf('month').startOf('day').toDate(),
		to: Moment().endOf('month').endOf('day').toDate()
	})
	const { value: orders, dispatch: setOrders } = React.useContext(Order)!

	React.useEffect(() => {
		;(async () => {
			if (!customers || !customers.length) {
				const {
					data: { packet: customers }
				} = await instance2().get<ResponseBaseProps<Array<CustomerProps>>>('/customer')
				setCustomers(customers!)
			}
			if (!rawMaterials || !rawMaterials.length) {
				const {
					data: { packet: materials }
				} = await instance2().get<ResponseBaseProps<Array<RawMaterialProps>>>(
					'/inventory/raw-material'
				)
				setRawMaterials(materials!)
			}
			const {
				data: { packet: orders }
			} = await instance2().get<ResponseBaseProps<Array<OrderProps>>>(
				`/order?sort=desc&from=${Moment(dateRange.from).format('YYYY-MM-DD')}&to=${Moment(
					dateRange.to
				).format('YYYY-MM-DD')}`
				// '/order?sort=desc'
			)
			setOrders(orders || [])
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageApi, dateRange])

	return (
		<Formik
			initialValues={
				{
					visible: false,
					searchKeyword: '',
					searchType: 'Customer'
				} as OrderProps & {
					visible: boolean
					searchKeyword: string
					searchType: 'Customer' | 'Item'
				}
			}
			onSubmit={async (values, { setFieldValue, setSubmitting }) => {
				try {
					await instance2()({
						method: values._id ? 'put' : 'post',
						url: `/order/${values._id || ''}`,
						data: {
							...values,
							__v: undefined
						}
					})
					const isPUT = !!values._id
					if (isPUT) {
						const updatedData = orders?.map((order) =>
							order._id === values._id ? values : order
						)
						setOrders(updatedData)
					} else {
						setOrders((prevState) => [values, ...(prevState || [])])
					}
				} catch (err) {
				} finally {
					setFieldValue('visible', false)
					setSubmitting(false)
				}
			}}
		>
			{({ isSubmitting, resetForm, submitForm, values }) => (
				<React.Fragment>
					<Layout.Content>
						{alertContext}
						<Typography.Title level={2}>ORDERS</Typography.Title>
						<OrderTable {...dateRange} onChangeDateRange={setDateRange} />
					</Layout.Content>
					<Modal
						onOk={submitForm}
						okText='Save Changes'
						open={values.visible}
						title='Edit order'
						onCancel={() => {
							resetForm()
						}}
						width={992}
						confirmLoading={isSubmitting}
					>
						<OrderForm />
					</Modal>
					<Routes>
						<Route path='print' element={<PrintPreview />} />
					</Routes>
				</React.Fragment>
			)}
		</Formik>
	)
}

export default OrderPage
