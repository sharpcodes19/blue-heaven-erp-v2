import { Descriptions } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import useCalculator from './useCalculator'

type PlateProductResultProps = {
	target: PlateProps
}

const PlateProductResult = (props: PlateProductResultProps) => {
	const formik = useFormikContext<PlateProps>()
	const { totalWithHole, totalWithoutHole, weight } = useCalculator(formik.values)

	React.useEffect(() => {
		formik.setFieldValue('weight', weight.toFixed(4))
		formik.setFieldValue('totalWithHole', totalWithHole)
		formik.setFieldValue('totalWithoutHole', totalWithoutHole)
		console.log(123)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weight, totalWithHole, totalWithoutHole])

	return (
		<Descriptions bordered title='CALCULATION RESULT' size='small'>
			<Descriptions.Item label='Weight' span={3}>
				{weight}
			</Descriptions.Item>
			<Descriptions.Item span={3} label='Total without hole'>
				{totalWithoutHole}
			</Descriptions.Item>
			<Descriptions.Item span={3} label='Total with hole'>
				{totalWithHole}
			</Descriptions.Item>
		</Descriptions>
	)
}

export default PlateProductResult
