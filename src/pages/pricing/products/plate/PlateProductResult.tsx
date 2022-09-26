import { Descriptions, Tag } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'
import useCalculator from './useCalculator'

type PlateProductResultProps = {
	target: PlateProps
}

const PlateProductResult = (props: PlateProductResultProps) => {
	const formik = useFormikContext<PlateProps>()
	const { totalWithHole, totalWithoutHole, weight } = useCalculator(
		formik.values
	)

	React.useEffect(() => {
		formik.setFieldValue('weight', weight.toFixed(4))
		formik.setFieldValue('totalWithHole', totalWithHole)
		formik.setFieldValue('totalWithoutHole', totalWithoutHole)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weight, totalWithHole, totalWithoutHole])

	return (
		<Descriptions bordered title='CALCULATION RESULT' size='small'>
			<Descriptions.Item label='Weight' span={3}>
				{weight || 0}
				<Tag color='green' style={{ marginLeft: '.5rem' }}>
					{(weight || 0).toFixed(2).concat(' kg')}
				</Tag>
			</Descriptions.Item>
			<Descriptions.Item span={3} label='Total without hole'>
				{totalWithoutHole}
				{
					<Tag color='green' style={{ marginLeft: '.5rem' }}>
						{new Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP'
						}).format(Math.ceil(totalWithoutHole / 5) * 5 || 0)}
					</Tag>
				}
			</Descriptions.Item>
			<Descriptions.Item span={3} label='Total with hole'>
				{totalWithHole}
				{
					<Tag color='green' style={{ marginLeft: '.5rem' }}>
						{new Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP'
						}).format(Math.ceil(totalWithHole / 5) * 5 || 0)}
					</Tag>
				}
			</Descriptions.Item>
		</Descriptions>
	)
}

export default PlateProductResult
