import React from 'react'
import convert from 'convert-units'

type Props = {
	weight: number
	totalWithoutHole: number
	totalWithHole: number
}

const STEEL = 785

const useCalculator = ({
	thickness_inch,
	length_inch,
	width_mm,
	perKilogramPrice,
	holeQuantity,
	holePricePerPiece
}: PlateProps): Props => {
	const [weight, setWeight] = React.useState<number>(0)
	const [totalWithoutHole, setTotalWithoutHole] = React.useState<number>(0)
	const [totalWithHole, setTotalWithHole] = React.useState<number>(0)

	React.useEffect(() => {
		const thickness = Math.round(convert(thickness_inch).from('in').to('mm')) / 1000
		const length = Math.round(convert(length_inch).from('in').to('mm')) / 1000
		const width = width_mm! / 100

		const weight = thickness * length * width
		setWeight(weight)

		const total = weight * STEEL * perKilogramPrice!
		// INFO: Round up by 5
		// Math.ceil(x/5)*5
		const totalWithoutHole = Math.ceil(total / 5) * 5
		setTotalWithoutHole(totalWithoutHole)

		const totalWithHole = holeQuantity! * holePricePerPiece! + totalWithoutHole
		setTotalWithHole(totalWithHole)
	}, [thickness_inch, length_inch, width_mm, perKilogramPrice, holeQuantity, holePricePerPiece])

	return {
		weight,
		totalWithoutHole,
		totalWithHole
	}
}

export default useCalculator
