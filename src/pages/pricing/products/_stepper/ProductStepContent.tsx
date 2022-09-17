import React from 'react'
import { Radio, Skeleton } from 'antd'
import styled from 'styled-components'
import { useFormikContext } from 'formik'

type ProductStepContentProps = {
	activeStepIndex: number
	loading: boolean
} & SelectablePricingOptionProps

const ProductStepContent = (props: ProductStepContentProps) => {
	const formik = useFormikContext<PricingFormProps>()

	return (
		<Container>
			<Skeleton loading={props.loading} />
			{!props.loading && (
				<Radio.Group
					options={props.options}
					optionType='button'
					value={formik.values.selection[props.accessor as keyof FinishedProductProps]}
					onChange={(e) => {
						formik.setFieldValue('selection', {
							...formik.values.selection,
							[props.accessor]: e.target.value
						})
					}}
					buttonStyle='solid'
				/>
			)}
		</Container>
	)
}

const Container = styled.div`
	min-height: 160px;
	background-color: #fafafa;
	border: 1px dashed #e9e9e9;
	border-radius: 2px;
	margin: 2rem 0;
	padding: 10px;
`

export default ProductStepContent
