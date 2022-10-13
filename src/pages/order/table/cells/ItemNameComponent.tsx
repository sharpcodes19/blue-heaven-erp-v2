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
			case 'hbolt':
				return (
					<Col>
						{props.name} {props.type} {props.length} {props.threadType}{' '}
						{props.hexNut &&
							props.hexNut !== '0' &&
							`w/ ${props.hexNut}N${props.washer ? ' & ' : ''}`}{' '}
						{props.washer && props.washer !== '0' ? `${props.washer}FW` : ''}
					</Col>
				)
			case 'u-bolt':
			case 'j-bolt':
			case 'dynabolt':
			case 'turn buckle':
			case 'lag screw':
				return (
					<Col>
						{props.name} {props.type} {props.size} x {props.length}
					</Col>
				)
			case 'hanger':
			case 'cylindrical':
				return (
					<Col>
						{props.type}
						{props.name} {props.size}
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
