import Moment from 'moment'
import React from 'react'
import { Col, Descriptions, Divider, Modal, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

type LineProps = {
	label: string
	value: string
	dividerBelow?: boolean
}

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

	const lines = React.useMemo<Array<LineProps>>(
		() => [
			{
				label: 'Date',
				value: data?.orderDate ? Moment(data.orderDate).format('MMM D, YYYY') : 'n/a'
			},
			{
				label: 'Customer',
				value: data?.customerId || 'n/a',
				dividerBelow: true
			}
		],
		[data]
	)

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
			<Row ref={ref} style={{ padding: 10 }}>
				{lines.map(({ label, value, dividerBelow }, i) => (
					<Col span={24} key={i}>
						<Descriptions
							style={{
								paddingBottom: 0
							}}
							labelStyle={{
								// fontFamily: 'Share',
								// fontWeight: 'bold',
								textTransform: 'uppercase'
							}}
							contentStyle={{
								// fontFamily: 'Share',
								// fontWeight: 'bold',
								textTransform: 'uppercase'
							}}
							size='small'
							column={24}
						>
							<Descriptions.Item label={label}>{value}</Descriptions.Item>
						</Descriptions>
						{dividerBelow ? <Divider plain style={{ margin: '10px 0' }} /> : null}
					</Col>
				))}
			</Row>
		</Modal>
	)
}

export default PrintPreview
