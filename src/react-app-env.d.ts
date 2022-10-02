/// <reference types="react-scripts" />

type QuotationProps = {
	_id?: string
	items?: Array<FinishedProductProps>
	customerId: string
	timeLead?: number
	label: string
	createdAt?: Date
	updatedAt?: Date
}

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

type BalancePaymentProps = {
	amount: number
	paymentMethod?: string
	paymentDate?: string
}

type EditableTableRowProps = {
	__new__?: boolean
	__update__?: boolean
}

type OrderProps = {
	_id?: string
	// quotationId: string
	orderDate?: Date
	items: Array<FinishedProductProps & EditableTableRowProps>
	dueDate?: Date
	status?: Array<string>
	totalCost?: number
	amountPaid?: number
	paymentMethod?: string
	paymentDate?: string
	ewtAmount?: number
	balancePayment?: Array<BalancePaymentProps & EditableTableRowProps>
	remarks?: string
	deliveryDate?: string
	shippingFee?: number
	deliveryLocation?: string
	invoiceNumber?: string
	customerId?: string
	createdAt?: Date
	updatedAt?: Date
}

type ResponseBaseProps<T = unknown> = {
	date: Date
	message: string
	packet?: T | null
}

type RawMaterialProps = {
	_id?: string
	name: string
	type?: string
	diameter?: string
	weight?: string
	price?: string
	quantity?: string
	orderDate?: string
	deliveredDate?: string
	remarks?: string
	createdAt?: Date
	updatedAt?: Date
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
	washer?: string
	hexNut?: string
	unit?: string
}

type BasePathname = 'pricing' | 'order' | 'inventory' | 'customer'

type AnchorBoltProps = {
	_id?: string
	sizeA?: string
	inchA?: string
	mm?: string
	bend?: string
	standard?: number
	hexNut?: string
	fW?: string
	total?: number
	typeAnchor?: string
}

type SagRodProps = {
	_id?: string
	size?: string
	cuttingCost?: number
	threading?: Array<string>
	bending?: string
	DateCreated?: Date
	type?: string
}

type PlateProps = {
	// _id?: string
	thickness_mm?: number
	length_mm?: number
	width_mm?: number
	perKilogramPrice?: number
	holeQuantity?: number
	holePricePerPiece?: number
	weight?: number
	totalWithoutHole?: number
	totalWithHole?: number
	quantity?: number
	remarks?: string
}

type HexBoltProps = {
	_id?: string
	hType: string
	threadValue: string
	clenght: string
	cType: string
	cost: string
	DateCreated: Date
}

type UBoltProps = {
	_id?: string
	Material?: string
	pipeSize?: string
	Price?: number
	uboltSize?: string
	DateCreated?: Date
	unit?: string
}

type JBoltProps = {
	_id?: string
	jboltDiameter?: string
	Lenght?: string
	Price?: number
	DateCreated?: Date
}

type DynaBoltProps = {
	_id?: string
	dynaboltSize: string
	Length: string
	Price: string
	DateCreated: Date
}

type HangerProps = {
	_id?: string
	Type: string
	Size: string
	Price: string
}

type CylindricalProps = {
	_id?: string
	cyndicalSize: string
	Price: string
	DateCreated: Date
}

type TurnBuckleProps = {
	_id?: string
	millimeter: string
	turnBuckle: string
	pipeSize: string
	price: string
	DateCreated: Date
}

type LagScrewProps = {
	_id?: string
	screwLength: string
	screwSize: string
	price: string
}

type PricingFormProps = {
	selection: FinishedProductProps // pre-selected product
	quantity: number
	product?: FinishedProductProps // this one is the item the will be transferred to quantity section
}

type CustomerProps = {
	_id?: string
	name?: string
	tin?: string
	email?: string
	contact?: string
	address?: string
	discount?: string
	status?: string
	remarks?: string
	sourceId?: string
}
