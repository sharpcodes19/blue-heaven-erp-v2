import { MessageInstance } from 'antd/lib/message'
import React from 'react'
import { SelectedQuotation } from '../../../../contexts/SelectedQuotationContext'

type Props = {
	handleSubmit: (product: FinishedProductProps) => any
}

const useAddProductToQuotationTable = (messageApi: MessageInstance): Props => {
	const selectedQuotation = React.useContext(SelectedQuotation)!

	const handleSubmit = React.useCallback(
		(product: FinishedProductProps) => {
			const newItems =
				selectedQuotation.value && selectedQuotation.value.items instanceof Array
					? [product, ...selectedQuotation.value.items]
					: [product]

			selectedQuotation.dispatch((prevState) => ({
				...prevState!,
				items: newItems
			}))
			messageApi.success("Product added to quotation's table.", 5)
		},
		[selectedQuotation, messageApi]
	)

	return { handleSubmit }
}

export default useAddProductToQuotationTable
