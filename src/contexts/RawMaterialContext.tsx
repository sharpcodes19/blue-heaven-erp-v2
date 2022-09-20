import React from 'react'

type RawMaterialContextProps = {
	children?: React.ReactNode
}

type Props = {
	value: Array<RawMaterialProps> | undefined
	dispatch: React.Dispatch<React.SetStateAction<Array<RawMaterialProps> | undefined>>
}

export const RawMaterial = React.createContext<Props | null>(null)

const RawMaterialContext = (props: RawMaterialContextProps) => {
	const [value, dispatch] = React.useState<Array<RawMaterialProps>>()

	return <RawMaterial.Provider value={{ value, dispatch }}>{props.children}</RawMaterial.Provider>
}

export default RawMaterialContext
