import React from 'react'

type SelectedQuotationContextProps = {
	children?: React.ReactNode
}

type Props = {
	value: QuotationProps | undefined
	dispatch: React.Dispatch<React.SetStateAction<QuotationProps | undefined>>
}

export const SelectedQuotation = React.createContext<Props | null>(null)

const SelectedQuotationContext = (props: SelectedQuotationContextProps) => {
	const [value, dispatch] = React.useState<QuotationProps>()

	return <SelectedQuotation.Provider value={{ value, dispatch }}>{props.children}</SelectedQuotation.Provider>
}

export default SelectedQuotationContext
