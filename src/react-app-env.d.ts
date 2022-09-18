/// <reference types="react-scripts" />

type SelectablePricingOptionProps = {
	options: Array<CheckboxOptionType>
	isNumber?: boolean
	isCurrency?: boolean
	unit?: string
	hideStepComponent?: boolean
	alwaysEnabled?: boolean
	accessor: string
	fieldCount?: number
	originFieldName: string
}

type ResponseBaseProps<T = unknown> = {
	date: Date
	message: string
	packet?: T | null
}

type FinishedProductProps = {
	_id?: string
	name: string
	type?: string
	size?: string
	threadType?: string
	threadLength?: Array<string>
	finishType?: string
	weight?: string
	length?: string
	width?: string
	cutLength?: string
	holeQuantity?: string
	holeSizes?: Array<string>
	price?: string
	quantity?: number
	remarks?: string
	lead?: string
	createdAt?: Date
	updatedAt?: Date
	csvSource?: string
	dueDate?: string
	orderItemId?: string
	quotationId?: string
	orderQuantity?: string
}

type BasePathname = 'pricing' | 'order' | 'inventory' | 'customer'

type AnchorBoltProps = {
	_id?: string
	sizeA: string
	inchA: string
	mm: string
	bend: string
	standard: string
	hexNut: string
	fW: string
	total: string
	typeAnchor: string
}

type SagRodProps = {
	_id?: string
	size: string
	cuttingCost: number
	threading: Array<string>
	bending: number
	DateCreated: Date
	type: string
}

type PlateProps = {}

type HexBoltProps = {
	_id?: string
	boltLenght: string
	cost: string
	diameterValue: string
	materialValue: string
	threadValue: string
	DateCreated: Date
}

type UBoltProps = {
	_id?: string
	Material: string
	pipeSize: string
	Price: number
	uboltSize: string
	DateCreated: Date
}

type JBoltProps = {
	_id?: string
	jboltDiameter: string
	Lenght: string
	Price: number
	DateCreated: Date
}

type DynaBoltProps = {
	_id?: string
	dynaboltSize: string
	Length: string
	Price: number
	DateCreated: Date
}

type HangerProps = {
	_id?: string
	Type: string
	Size: string
	Price: number
}

type CylindricalProps = {
	_id?: string
	cyndicalSize: string
	Price: number
	DateCreated: Date
}

type TurnBuckleProps = {
	_id?: string
	millimeter: string
	turnBuckle: string
	pipeSize: string
	price: number
	DateCreated: Date
}

type LagScrewProps = {
	_id?: string
	screwLength: string
	screwSize: string
	price: number
}

type PricingFormProps = {
	selection: FinishedProductProps // pre-selected product
	quantity: number
	product?: FinishedProductProps // this one is the item the will be transferred to quantity section
}
