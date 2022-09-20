import React from 'react'

type CustomerContextProps = {
	children?: React.ReactNode
}

type Props = {
	value: Array<CustomerProps> | undefined
	dispatch: React.Dispatch<React.SetStateAction<Array<CustomerProps> | undefined>>
}

export const Customer = React.createContext<Props | null>(null)

const CustomerContext = (props: CustomerContextProps) => {
	const [value, dispatch] = React.useState<Array<CustomerProps>>()

	return <Customer.Provider value={{ value, dispatch }}>{props.children}</Customer.Provider>
}

export default CustomerContext
