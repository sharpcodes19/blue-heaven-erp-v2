import React from 'react'

type OrderContextProps = {
	children?: React.ReactNode
}

type Props = {
	value: Array<OrderProps> | undefined
	dispatch: React.Dispatch<React.SetStateAction<Array<OrderProps> | undefined>>
}

export const Order = React.createContext<Props | null>(null)

const OrderContext = (props: OrderContextProps) => {
	const [value, dispatch] = React.useState<Array<OrderProps>>()

	return <Order.Provider value={{ value, dispatch }}>{props.children}</Order.Provider>
}

export default OrderContext
