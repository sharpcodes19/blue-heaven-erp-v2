import { Input, InputNumber } from 'antd'
import { useField } from 'formik'
import React from 'react'

type FormFieldProps = {
	addonBefore: string | undefined
	isNumber?: boolean
	name: string
}

const FormField = (props: FormFieldProps) => {
	const [field, meta, helpers] = useField(props.name)

	const status = React.useMemo<'error' | undefined>(() => (meta.error && meta.touched ? 'error' : undefined), [meta])

	if (props.isNumber)
		return <InputNumber {...props} value={field.value} onChange={(value) => helpers.setValue(value)} status={status} />

	return <Input {...props} value={field.value} onChange={(e) => helpers.setValue(e.target.value)} status={status} />
}

export default FormField
