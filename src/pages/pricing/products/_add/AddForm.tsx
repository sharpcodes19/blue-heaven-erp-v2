import _ from 'lodash'
import { Input, InputNumber, Modal } from 'antd'
import { Form, Formik } from 'formik'
import React from 'react'
import FormField from './FormField'

type AddFormProps = {
	productName: string
	visible: boolean
	onShowForm: (value: boolean) => any
	options: Array<SelectablePricingOptionProps>
}

const AddForm = (props: AddFormProps) => {
	const [initialValues, setInitialValues] = React.useState<any>(null)

	React.useEffect(() => {
		if (props.options) {
			setInitialValues(
				_.transform(
					props.options.map(({ originFieldName, fieldCount }) => ({
						[originFieldName]: fieldCount ? Array.from({ length: fieldCount }).fill('') : ''
					})),
					_.ary(_.extend, 2),
					{}
				)
			)
		}

		return () => {
			setInitialValues(null)
		}
	}, [props.options])

	return (
		<Modal
			title={`Add look-up pricing for ${props.productName}`}
			open={props.visible}
			onCancel={() => props.onShowForm(false)}
		>
			{initialValues !== null && (
				<Formik initialValues={initialValues} onSubmit={(values) => {}}>
					<Form style={{ display: 'flex', flexDirection: 'column', gap: '1ch' }}>
						{props.options?.map(({ accessor, fieldCount, isNumber, originFieldName }) => (
							<div style={{ display: 'flex', gap: '1ch' }} key={accessor}>
								{Array.from({ length: fieldCount || 1 }).map((_, index) => {
									return (
										<FormField
											addonBefore={index === 0 ? accessor : undefined}
											name={(originFieldName || accessor).concat(fieldCount ? `.${index}` : '')}
											isNumber={isNumber}
										/>
									)
								})}
							</div>
						))}
					</Form>
				</Formik>
			)}
		</Modal>
	)
}

export default AddForm
