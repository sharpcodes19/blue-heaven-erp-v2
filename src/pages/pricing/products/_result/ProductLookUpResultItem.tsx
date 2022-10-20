import _ from 'lodash'
import { useFormikContext } from 'formik'
import React from 'react'
import { Alert, Col, Row } from 'antd'
import ProductLookUpResult from './ProductLookUpResult'
import instance2 from '../../../../api/instance2'

type ProductLookUpResultItemProps = {
	data: Array<FinishedProductProps>
	options: Array<SelectablePricingOptionProps>
	submitForm: () => any
	onShowForm: (value: boolean) => any
	onUpdateProductDetails: () => Promise<boolean>
	loading: boolean
	productName: string
}

type Status = 'info' | 'success' | 'error' | 'warning'

const ProductLookUpResultItem = (props: ProductLookUpResultItemProps) => {
	const formik = useFormikContext<PricingFormProps>()
	const [status, setStatus] = React.useState<Status>('info')

	React.useEffect(() => {
		;(async () => {
			const selectedKeyCount =
				Object.keys(formik.values.selection).length -
				Object.keys(formik.initialValues.selection).length
			const optionKeyCount = props.options.filter(
				(item) => !item.hideStepComponent
			).length
			const finish = selectedKeyCount >= optionKeyCount
			let product: FinishedProductProps | undefined
			if (formik.values.selection.name === 'ABOLT') {
				const response = await instance2().get<ResponseBaseProps<Array<AnchorBoltProps>>>(
					'/product/abolt',
					{
						params: {
							diameter: formik.values.selection.size,
							steel: formik.values.selection.type,
							// lengthByInches?: string
							lengthByMillimeter: formik.values.selection.length_mm,
							bend: formik.values.selection.width,
							thread: formik.values.selection.threadLength
								? formik.values.selection.threadLength[0]
								: undefined,
							price: formik.values.selection.price,
							hexNut: formik.values.selection.hexNut,
							// hexNutPrice: formik.values.selection.hexNutPrice,
							// hexNutQuantity?: string
							fW: formik.values.selection.washer
							// fWPrice: formik.values.selection.fWPrice
							// fWQuantity?: string
							// totalPerSet?: string
							// totalPrice?: string
							// csvSource?: string
						}
					}
				)
				const abolt: AnchorBoltProps | undefined = response.data.packet?.at(0)
				if (abolt)
					product = {
						name: props.productName,
						_id: abolt._id,
						fWPrice: +(abolt.fWPrice || 0),
						hexNut: abolt.hexNut,
						hexNutPrice: +(abolt.hexNutPrice || 0),
						length_mm: abolt.lengthByMillimeter,
						length: abolt.lengthByInches,
						price: abolt.price,
						size: abolt.diameter,
						threadLength: [String(abolt.thread)],
						totalPricePerSet: +(abolt.totalPerSet || 0),
						type: abolt.steel,
						washer: abolt.fW,
						width: abolt.bend,
						cutLength: abolt.cutLength,
						pcsPerLength: abolt.pcsPerLength,
						weight: abolt.weight
					}
			} else {
				product = _.find(props.data, formik.values.selection)
			}

			if (!props.loading) {
				if (finish && product) {
					formik.setFieldValue('product', {
						...product,
						name: props.productName
					})
					setStatus('success')
				} else if (finish && !product) {
					setStatus('error')
				}
			}
		})()

		return () => {
			setStatus('info')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		props.data,
		formik.values.selection,
		props.options,
		formik.initialValues.selection,
		props.loading
	])

	return (
		<Row style={{ marginTop: '2rem' }}>
			<Col span={24}>
				<Alert
					message='Selection Result'
					description={
						status === 'error'
							? 'Cannot find the combination of product specification from our database.'
							: status === 'info'
							? 'After you chose the required specification of the product, the product details will reflect below.'
							: status === 'success'
							? 'The system found the product with the same specification.'
							: 'The system detected unknown action. Please refresh the page if the system is suggesting a wrong product.'
					}
					type={status}
					showIcon
					// action={
					// 	status === 'error' ? (
					// 		<Button type='ghost' size='small' icon={<SaveOutlined />}>
					// 			Add your selection to database
					// 		</Button>
					// 	) : undefined
					// }
				/>
			</Col>
			<Col span={24}>
				{status === 'success' && formik.values.product && (
					<ProductLookUpResult
						submitForm={props.submitForm}
						target={formik.values.product}
						onShowForm={props.onShowForm}
						onUpdateProductDetails={props.onUpdateProductDetails}
					/>
				)}
			</Col>
		</Row>
	)
}

export default ProductLookUpResultItem
