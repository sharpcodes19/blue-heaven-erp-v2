import React from 'react'
import type { CheckboxOptionType } from 'antd'
import { Radio } from 'antd'

type ProductsProps = {
	onChange: (product: string) => any
	selected: string
	items: Array<CheckboxOptionType>
}

const Products = (props: ProductsProps) => {
	return (
		<Radio.Group
			options={props.items}
			optionType='button'
			value={props.selected}
			onChange={(e) => props.onChange(e.target.value)}
			buttonStyle='solid'
		/>
	)
}

export default Products
