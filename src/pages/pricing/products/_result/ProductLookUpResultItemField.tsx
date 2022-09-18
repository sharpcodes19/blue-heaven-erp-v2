import { Typography } from 'antd'
import { useField } from 'formik'
import React from 'react'

type ProductLookUpResultItemFieldProps = {
	name: keyof FinishedProductProps
	target: FinishedProductProps
	onEnableUpdateButton: (value: boolean) => any
}

const ProductLookUpResultItemField = (props: ProductLookUpResultItemFieldProps) => {
	// const formik = useFormikContext<PricingFormProps>()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [field, meta, helpers] = useField(`product.${props.name}`)

	const handleChange = React.useCallback(
		(value: string) => {
			// formik.setFieldValue('product', {
			// 	...formik.values.product,
			// 	[props.name]: value
			// })
			helpers.setValue(value)
			props.onEnableUpdateButton(true)
		},
		[helpers, props]
	)

	return (
		<Typography>
			<Typography.Text
				editable={{ onChange: handleChange }}
				type={props.name === 'price' ? 'danger' : undefined}
				style={{
					fontWeight: props.name === 'price' ? '700' : '400'
				}}
			>
				{String(field.value)}
			</Typography.Text>
		</Typography>
	)
}

export default ProductLookUpResultItemField
