import React from 'react'
import { Col, Row, Tag, Tooltip, Typography } from 'antd'

type Props = {
	style?: React.CSSProperties
} & FinishedProductProps

const ItemNameComponent = (props: Props) => {
	const spec = React.useMemo<React.ReactNode | undefined>(() => {
		switch (props.name.toLowerCase()) {
			default:
				return undefined
			case 'abolt':
				return (
					<Col>
						{props.type ? (
							<Tooltip title='Type or Material'>
								<Tag color='green'>{props.type}</Tag>
							</Tooltip>
						) : null}
						{props.size ? (
							<Tooltip title='Diameter'>
								<Tag color='orange'>{props.size}</Tag>
							</Tooltip>
						) : null}
						{props.length ? (
							<Tooltip title='Length'>
								<Tag color='geekblue'>{props.length}</Tag>
							</Tooltip>
						) : null}
						{props.width ? (
							<Tooltip title='Bend'>
								<Tag color='darkslateblue'>{props.width}</Tag>
							</Tooltip>
						) : null}
					</Col>
				)
		}
	}, [props])

	return (
		<Col span={24}>
			<Row align='middle'>
				<Col
					style={{
						marginRight: 10,
						...props.style
					}}
				>
					<Typography>
						<Typography.Text>{props.name}</Typography.Text>
					</Typography>
				</Col>
				{spec}
			</Row>
		</Col>
	)
}

export default ItemNameComponent
