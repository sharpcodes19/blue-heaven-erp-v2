import { Form, Layout, message, Modal, Typography } from 'antd'
import * as Yup from 'yup'
import { Formik } from 'formik'
import React from 'react'
import instance2 from '../../api/instance2'
import CustomerTable from './CustomerTable'
import CustomerForm from './form/CustomerForm'
import { Customer } from '../../contexts/CustomerContext'

type CustomerPageProps = {}

const CustomerPage = (props: CustomerPageProps) => {
	const { dispatch } = React.useContext(Customer)!
	const [messageApi, alertContext] = message.useMessage()

	const getAll = React.useCallback(
		() =>
			new Promise<ResponseBaseProps<Array<CustomerProps>>>((resolve, reject) =>
				instance2()
					.get<ResponseBaseProps<Array<CustomerProps>>>('/customer?sort=desc')
					.then((res) => resolve(res.data))
					.catch(reject)
			),
		[]
	)

	React.useEffect(() => {
		getAll()
			.then((data) => data.packet?.filter((customer) => customer._id) || [])
			.then(dispatch)
			.catch((err) => {
				messageApi.error({
					content: `Unable to get customers data. Please check your internet connection. Error: ${err.message}`,
					duration: 10
				})
			})
	}, [messageApi, getAll, dispatch])

	return (
		<Layout.Content>
			{alertContext}
			<Typography.Title level={2}>CUSTOMERS</Typography.Title>
			<Formik
				validationSchema={Yup.object().shape({
					address: Yup.string().required('This field is required.'),
					contact: Yup.string().required('This field is required.'),
					discount: Yup.number().required('This field is required.'),
					email: Yup.string().required('This field is required.').email('Not supported email format.'),
					name: Yup.string().required('This field is required.'),
					tin: Yup.string().required('This field is required.')
				})}
				initialValues={
					{
						_id: undefined,
						address: '',
						contact: '',
						discount: '',
						email: '',
						name: '',
						remarks: '',
						status: '',
						tin: '',
						visible: false
					} as CustomerProps & { visible: boolean }
				}
				onSubmit={async (customer, { resetForm, setFieldValue }) => {
					const postResponse = await instance2()({
						method: customer._id ? 'put' : 'post',
						url: `/customer/${customer._id || ''}`,
						data: {
							...customer
						}
					})
					const getAllResponse = await getAll()
					const newData = getAllResponse.packet
					if (newData) {
						messageApi.success(postResponse.data.message, 5)
						dispatch(newData)
						setFieldValue('visible', false)
						resetForm()
					}
				}}
			>
				{({ submitForm, values, initialValues, resetForm, setFieldValue }) => (
					<React.Fragment>
						<CustomerTable onShowForm={(value) => setFieldValue('visible', value)} />
						<Modal
							open={values.visible}
							title='Add new customer'
							footer={null}
							onCancel={() => {
								setFieldValue('visible', false)
								resetForm()
							}}
						>
							<Form autoComplete='off' initialValues={initialValues} onFinish={submitForm}>
								<CustomerForm />
							</Form>
						</Modal>
					</React.Fragment>
				)}
			</Formik>
		</Layout.Content>
	)
}

export default CustomerPage
