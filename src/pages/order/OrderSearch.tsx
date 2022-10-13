import { Input, Select } from 'antd'
import { useFormikContext } from 'formik'
import { useDebounce } from 'use-debounce'
import React from 'react'

type Props = {}

const OrderSearch = (props: Props) => {
	const formik = useFormikContext<
		OrderProps & {
			visible: boolean
			searchKeyword: string
			searchType: 'Customer' | 'Item'
		}
	>()
	const [text, setText] = React.useState<string>(formik.values.searchKeyword)
	const [debouncedValue] = useDebounce(text, 500)

	React.useEffect(() => {
		formik.setFieldValue('searchKeyword', debouncedValue)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue])

	const selectBefore = (
		<Select
			defaultValue='Customer'
			className='select-before'
			onChange={(value) => formik.setFieldValue('searchType', value)}
			value={formik.values.searchType}
			style={{ minWidth: 120 }}
		>
			<Select.Option value='Customer'>Customer</Select.Option>
			<Select.Option value='Item'>Item Name</Select.Option>
		</Select>
	)

	return (
		<div style={{ marginBottom: 30 }}>
			<Input
				addonBefore={selectBefore}
				placeholder='Search keyword'
				value={text}
				onChange={(e) => {
					setText(e.target.value)
					// formik.setFieldValue('searchKeyword', e.target.value)
				}}
			/>
		</div>
	)
}

export default OrderSearch
