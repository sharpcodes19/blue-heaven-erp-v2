import _ from 'lodash'
import Moment from 'moment'
import React from 'react'
import { Col, Descriptions, Divider, Modal, Row, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import parseName from './useName'

type LineProps = {
	label: string
	value: React.ReactNode
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
				value: (data?.orderDate
					? Moment(data.orderDate).format('MMM D, YYYY')
					: 'n/a'
				).toUpperCase()
			},
			{
				label: 'Quotation No.',
				value: (data?.quotationNumber || 'n/a').toUpperCase()
			},
			{
				label: 'Customer',
				value: (data?.customerId || 'n/a').toUpperCase(),
				dividerBelow: true
			}
		],
		[data]
	)

	const items = React.useMemo<Array<LineProps>>(
		() => [
			{
				label: 'Items',
				value:
					data?.items.map((product) => (
						<Col span={24}>
							<Typography style={{ flex: 1 }}>
								<Typography.Text>
									{new Intl.NumberFormat('en-PH', {
										style: 'currency',
										currency: 'PHP'
									}).format(+(product.price || 0))}
								</Typography.Text>
								<Typography.Text>x{product.quantity}</Typography.Text>
								<Typography.Text>{parseName(product)}</Typography.Text>
								<Typography.Text>Lead Time: {product.lead || 'N/A'}</Typography.Text>
							</Typography>
						</Col>
					)) || 'n/a'
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
			width={840}
			okText='Print'
			cancelText='Close'
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
							contentStyle={
								{
									// fontFamily: 'Share',
									// fontWeight: 'bold',
								}
							}
							size='small'
							column={24}
						>
							<Descriptions.Item label={label}>
								<Row>{value}</Row>
							</Descriptions.Item>
						</Descriptions>
						{dividerBelow ? <Divider plain style={{ margin: '10px 0' }} /> : null}
					</Col>
				))}
				<Col span={24}>
					<Descriptions>
						<Descriptions.Item label='ITEMS'>{''}</Descriptions.Item>
					</Descriptions>
					{items.map(({ label, value }) => (
						<ul className='print-list'>
							<li>{value}</li>
						</ul>
					))}
				</Col>
				<Col>
					<Descriptions>
						<Descriptions.Item label='TOTAL'>
							{new Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP'
							}).format(
								_.sum(data?.items.map((product) => product.totalPricePerSet || 0))
							)}
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		</Modal>
	)
}

export default PrintPreview
