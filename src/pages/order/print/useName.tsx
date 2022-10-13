const parseName = (product: FinishedProductProps): string => {
	switch (product.name.toLowerCase()) {
		case 'abolt':
		case 'sagrod':
			return `${product.name} ${product.type} ${product.size} x ${
				product.length
			} TL ${product.threadLength?.join('&')} ${
				product.hexNut && product.hexNut !== '0'
					? `w/ ${product.hexNut}N${product.washer ? ' & ' : ''}`
					: ''
			} ${product.washer && product.washer !== '0' ? `${product.washer}FW` : ''}`

		case 'plate':
			return `${product.name} ${product.size} x ${product.length} ${
				product.holeQuantity ? `w/ ${product.holeQuantity}HOLES` : ''
			}`

		case 'hbolt':
			return `${product.name} ${product.type} ${product.length} ${product.threadType} ${
				product.hexNut && product.hexNut !== '0'
					? `w/ ${product.hexNut}N${product.washer ? ' & ' : ''}`
					: ''
			} ${product.washer && product.washer !== '0' ? `${product.washer}FW` : ''}
      `
		case 'u-bolt':
		case 'j-bolt':
		case 'dynabolt':
		case 'turn buckle':
		case 'lag screw':
			return `${product.name} ${product.type || ''} ${product.size} x ${product.length}`

		case 'hanger':
		case 'cylindrical':
			return `${product.type || ''} ${product.name} ${product.size}`
		default:
			return `${product.type} ${product.name}`
	}
}

export default parseName
