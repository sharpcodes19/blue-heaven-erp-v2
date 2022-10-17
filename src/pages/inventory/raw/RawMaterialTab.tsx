import { Form, message, Modal, Row, Typography } from 'antd'
import * as Yup from 'yup'
import { Formik } from 'formik'
import React from 'react'
import RawMaterialTable from './RawMaterialTable'
import instance2 from '../../../api/instance2'
import { RawMaterial } from '../../../contexts/RawMaterialContext'
import RawMaterialForm from './form/RawMaterialForm'

type RawMaterialTabProps = {}

export const DATE_FORMAT = 'MM/DD/YYYY'

const RawMaterialTab = (props: RawMaterialTabProps) => {
	const { dispatch: setRawMaterials } = React.useContext(RawMaterial)!
	const [messageApi, alertContext] = message.useMessage()

	const getAll = React.useCallback(
		() =>
			new Promise<ResponseBaseProps<Array<RawMaterialProps>>>((resolve, reject) =>
				instance2()
					.get<ResponseBaseProps<Array<RawMaterialProps>>>(
						'/inventory/raw-material?sort=desc'
					)
					.then((res) => resolve(res.data))
					.catch(reject)
			),
		[]
	)

	React.useEffect(() => {
		getAll()
			.then((data) => data.packet?.filter((customer) => customer._id) || [])
			.then(setRawMaterials)
			.catch((err) => {
				messageApi.error({
					content: `Unable to get customers data. Please check your internet connection. Error: ${err.message}`,
					duration: 10
				})
			})
	}, [messageApi, getAll, setRawMaterials])

	return (
		<Row>
			{alertContext}
			<Typography.Title level={2}>RAW MATERIALS</Typography.Title>
			<Formik
				validationSchema={Yup.object().shape({
					name: Yup.string().required('This field is required.'),
					// orderDate: Yup.string().required('This field is required.'),
					diameter: Yup.string().required('This field is required.'),
					quantity: Yup.number().positive().required('This field is required.'),
					type: Yup.string().required('This field is required.'),
					weight: Yup.number().positive().required('This field is required.'),
					price: Yup.number().positive().required('This field is required.')
				})}
				initialValues={
					{
						_id: undefined,
						name: '',
						deliveredDate: '',
						orderDate: '',
						diameter: '',
						price: '',
						quantity: '',
						remarks: '',
						type: '',
						weight: '',
						visible: false
					} as RawMaterialProps & { visible: boolean }
				}
				onSubmit={async (raw, { resetForm, setFieldValue }) => {
					const postResponse = await instance2()({
						method: raw._id ? 'put' : 'post',
						url: `/inventory/raw-material/${raw._id || ''}`,
						data: raw
					})
					const getAllResponse = await getAll()
					const newData = getAllResponse.packet
					if (newData) {
						messageApi.success(postResponse.data.message, 5)
						setRawMaterials(newData)
						setFieldValue('visible', false)
						resetForm()
					}
				}}
			>
				{({ submitForm, values, initialValues, resetForm, setFieldValue }) => (
					<React.Fragment>
						<RawMaterialTable onShowForm={(value) => setFieldValue('visible', value)} />
						<Modal
							open={values.visible}
							title='Add new raw material'
							footer={null}
							onCancel={() => {
								setFieldValue('visible', false)
								resetForm()
							}}
							maskClosable={false}
						>
							<Form
								autoComplete='off'
								initialValues={initialValues}
								onFinish={submitForm}
							>
								<RawMaterialForm />
							</Form>
						</Modal>
					</React.Fragment>
				)}
			</Formik>
		</Row>
	)
}

export default RawMaterialTab
