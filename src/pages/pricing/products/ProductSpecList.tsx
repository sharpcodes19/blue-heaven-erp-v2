import _ from 'lodash'
import { FileAddOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Steps, Typography } from 'antd'
import React from 'react'
import ProductStepContent from './_stepper/ProductStepContent'

type ProductSpecListProps = {
	name: string
	options?: Array<SelectablePricingOptionProps>
	loading?: boolean
	onShowForm: (value: boolean) => any
	noPostForm?: boolean
}

const ProductSpecList = (props: ProductSpecListProps) => {
	const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0)

	return (
		<Row>
			<Col span={24}>
				<Typography>
					<Typography.Title level={2}>{props.name} CALCULATOR</Typography.Title>
					<Typography.Text type='secondary'>
						Click the button to select desired combination of product
						specifications.
					</Typography.Text>
				</Typography>
				{!props.noPostForm && (
					<div style={{ marginTop: '1rem' }}>
						<Button
							onClick={props.loading ? undefined : () => props.onShowForm(true)}
							icon={<FileAddOutlined />}
							loading={props.loading}
						>
							Add new
						</Button>
					</div>
				)}
				<Divider />
				{props.options ? (
					<div style={{ marginTop: '1rem' }}>
						<Steps current={activeStepIndex}>
							{props.options.map(({ accessor, hideStepComponent }) =>
								hideStepComponent ? null : (
									<Steps.Step key={accessor} title={_.capitalize(accessor)} />
								)
							)}
						</Steps>
						<ProductStepContent
							{...props.options[activeStepIndex]}
							activeStepIndex={activeStepIndex}
							loading={props.loading}
						/>
						<div
							style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}
						>
							<Button
								type='primary'
								disabled={activeStepIndex <= 0}
								onClick={() => setActiveStepIndex((prevState) => prevState - 1)}
							>
								&larr; Previous
							</Button>
							<Button
								type='primary'
								disabled={
									activeStepIndex >=
									props.options.filter((item) => !item.hideStepComponent)
										.length -
										1
								}
								onClick={() => setActiveStepIndex((prevState) => prevState + 1)}
							>
								Next &rarr;
							</Button>
						</div>
					</div>
				) : null}
			</Col>
		</Row>
	)
}

export default ProductSpecList
