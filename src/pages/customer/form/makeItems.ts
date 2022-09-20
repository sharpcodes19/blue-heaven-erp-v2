type ItemProps = {
	label: string
	key: keyof CustomerProps
	type?: 'number'
}

const items: Array<ItemProps> = [
	{
		key: 'name',
		label: 'Full name'
	},
	{
		key: 'tin',
		label: 'TIN'
	},
	{
		key: 'email',
		label: 'Email'
	},
	{
		key: 'address',
		label: 'Address'
	},
	{
		key: 'contact',
		label: 'Contact'
	},
	{
		key: 'discount',
		label: 'Discount',
		type: 'number'
	},
	{
		key: 'status',
		label: 'Status'
	},
	{
		key: 'remarks',
		label: 'Remarks'
	}
]

export default items
