import { Descriptions, Modal, Row } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

type Props = {}

const PrintPreview = (props: Props) => {
	const navigate = useNavigate()
	const location = useLocation()
	const state = location.state as any
	const data: OrderProps | undefined = state.data
	const ref = React.useRef<HTMLDivElement | null>(null)

	const handlePrint = useReactToPrint({
		content: () => ref.current
	})

	React.useEffect(() => {
		if (!data) return navigate('../')
	}, [navigate, data])

	return (
		<Modal
			open={!!data}
			title='Print Preview'
			onOk={handlePrint}
			onCancel={() => navigate('../')}
		>
			<div ref={ref}>
				<Descriptions
					labelStyle={{
						fontFamily: 'Share',
						textTransform: 'uppercase',
						fontWeight: 'bold'
					}}
					contentStyle={{
						fontFamily: 'Share',
						textTransform: 'uppercase',
						fontWeight: 'bold'
					}}
				>
					<Descriptions.Item label='Customer Name'>{data?.customerId}</Descriptions.Item>
				</Descriptions>
			</div>
		</Modal>
	)
}

export default PrintPreview
