import React from 'react'

type FinishedProductContextProps = {
	children?: React.ReactNode
}

type Props = {
	value: Array<FinishedProductProps> | undefined
	dispatch: React.Dispatch<React.SetStateAction<Array<FinishedProductProps> | undefined>>
}

export const FinishedProduct = React.createContext<Props | null>(null)

const FinishedProductContext = (props: FinishedProductContextProps) => {
	const [value, dispatch] = React.useState<Array<FinishedProductProps>>()

	return <FinishedProduct.Provider value={{ value, dispatch }}>{props.children}</FinishedProduct.Provider>
}

export default FinishedProductContext
