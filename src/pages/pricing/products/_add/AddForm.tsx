import { Divider, Modal, Typography } from 'antd'
import { Form, useFormikContext } from 'formik'
import React from 'react'
import FormField from './FormField'

type AddFormProps = {
	productName: string
	visible: boolean
	onShowForm: (value: boolean) => any
	options: Array<SelectablePricingOptionProps>
}

const AddForm = (props: AddFormProps) => {
	const formik = useFormikContext()

	return (
		<Modal
			title={`Add look-up pricing for ${props.productName}`}
			open={props.visible}
			maskClosable={false}
			onCancel={() => {
				props.onShowForm(false)
				formik.resetForm()
			}}
			onOk={formik.submitForm}
			confirmLoading={formik.isSubmitting}
			okText='Submit'
			cancelButtonProps={{
				disabled: formik.isSubmitting
			}}
		>
			<Form style={{ display: 'flex', flexDirection: 'column', gap: '1ch' }}>
				{props.options?.map(
					({ label, accessor, fieldCount, isNumber, originFieldName }) => (
						<div style={{ display: 'flex', gap: '1ch' }} key={accessor}>
							{Array.from({ length: fieldCount || 1 }).map((_, index) => {
								return (
									<FormField
										addonBefore={
											index === 0 ? (label || accessor).concat('*') : undefined
										}
										name={(originFieldName || accessor).concat(
											fieldCount ? `.${index}` : ''
										)}
										type={isNumber ? 'number' : undefined}
										key={index}
									/>
								)
							})}
						</div>
					)
				)}
			</Form>
			<Divider />
			<Typography>
				<Typography.Text>
					Fill-up all fields to register your pricing lookup product item.
				</Typography.Text>
			</Typography>
		</Modal>
	)
}

export default AddForm
