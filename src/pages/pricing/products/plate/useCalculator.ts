import React from 'react'
import convert from 'convert-units'

type Props = {
	weight: number
	totalWithoutHole: number
	totalWithHole: number
}

const STEEL = 785

const useCalculator = ({
	thickness_mm,
	length_mm,
	width_mm,
	perKilogramPrice,
	holeQuantity,
	holePricePerPiece
}: PlateProps): Props => {
	const [weight, setWeight] = React.useState<number>(0)
	const [totalWithoutHole, setTotalWithoutHole] = React.useState<number>(0)
	const [totalWithHole, setTotalWithHole] = React.useState<number>(0)
	// const formik = useFormikContext<PlateProps>()

	React.useEffect(() => {
		// const thickness = Math.round(convert(thickness_mm).from('in').to('mm')) / 1000
		// const length = Math.round(convert(length_mm).from('in').to('mm')) / 1000
		const width = (width_mm || 0) / 100

		const weight =
			((((thickness_mm || 0) / 1000) * (length_mm || 0)) / 1000) * width
		setWeight(weight)

		const total = weight * STEEL * (perKilogramPrice || 0)
		console.log(total)
		// INFO: Round up by 5
		// Math.ceil(x/5)*5
		// const totalWithoutHole = Math.ceil(total / 5) * 5
		setTotalWithoutHole(total)

		const totalWithHole = holeQuantity! * holePricePerPiece! + total
		setTotalWithHole(totalWithHole)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		thickness_mm,
		length_mm,
		width_mm,
		perKilogramPrice,
		holeQuantity,
		holePricePerPiece
	])

	return {
		weight,
		totalWithoutHole,
		totalWithHole
	}
}

export default useCalculator
