import React from 'react'
import { Col, Row } from 'antd'

type Props = {
	style?: React.CSSProperties
} & FinishedProductProps

const ItemNameComponent = (props: Props) => {
	const spec = React.useMemo<React.ReactNode | undefined>(() => {
		switch (props.name.toLowerCase()) {
			default:
				return (
					<Col>
						{props.name} {props.type}
					</Col>
				)
			case 'abolt':
			case 'sagrod':
				return (
					<Col>
						{props.name} {props.type} {props.size} x {props.length} TL{' '}
						{props.threadLength?.join('&')}{' '}
						{props.hexNut && `w/ ${props.hexNut}N${props.washer ? ' & ' : ''}`}{' '}
						{props.washer ? `${props.washer}FW` : ''}
					</Col>
				)
			case 'plate':
				return (
					<Col>
						{props.name} {props.size} x {props.length}{' '}
						{props.holeQuantity ? `w/ ${props.holeQuantity}HOLES` : ''}
					</Col>
				)
		}
	}, [props])

	return (
		<Col span={24}>
			<Row align='middle'>{spec}</Row>
		</Col>
	)
}

export default ItemNameComponent
