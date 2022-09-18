import { Typography } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'

type ProductLookUpResultItemFieldProps = {
	name: keyof FinishedProductProps
	target: FinishedProductProps
}

const ProductLookUpResultItemField = (props: ProductLookUpResultItemFieldProps) => {
	const formik = useFormikContext<PricingFormProps>()

	const handleChange = React.useCallback(
		(value: string) => {
			formik.setFieldValue('product', {
				...formik.values.product,
				[props.name]: value
			})
		},
		[formik, props.name]
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
				{String(props.target[props.name])}
			</Typography.Text>
		</Typography>
	)
}

export default ProductLookUpResultItemField
