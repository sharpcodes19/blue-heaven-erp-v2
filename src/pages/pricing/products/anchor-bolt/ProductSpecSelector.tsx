import { AutoComplete, Col, Descriptions, Row } from 'antd'
import { useFormikContext } from 'formik'
import _ from 'lodash'

type Props = {
	data: Array<FinishedProductProps>
}

const ProductSpecSelector = (props: Props) => {
	const formik = useFormikContext<PricingFormProps>()

	return (
		<Row style={{ marginTop: '1rem' }} gutter={10} wrap>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Diameter'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.size,
										value: item.size
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.size', value)
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Steel'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.type,
										value: item.type
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.type', value)
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Length (mm)'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.length_mm,
										value: item.length_mm
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.length_mm', value)
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Bend'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.width,
										value: item.width
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.width', value)
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Thread'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.threadLength ? item.threadLength[0] : '',
										value: item.threadLength ? item.threadLength[0] : ''
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.threadLength', [value])
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Hex Nut'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.hexNut,
										value: item.hexNut
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.hexNut', value)
							}}
						/>
						{/* <AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: new Intl.NumberFormat('en-PH', {
											style: 'currency',
											currency: 'PHP'
										}).format(+(item.hexNutPrice || 0)),
										value: String(item.hexNutPrice)
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.HexNutPrice', value)
							}}
						/> */}
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={3}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Washer'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.washer,
										value: item.washer
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.washer', value)
							}}
						/>
						{/* <AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: new Intl.NumberFormat('en-PH', {
											style: 'currency',
											currency: 'PHP'
										}).format(+(item.fWPrice || 0)),
										value: String(item.fWPrice)
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.fWPrice', value)
							}}
						/> */}
					</Descriptions.Item>
				</Descriptions>
			</Col>
			<Col span={2}>
				<Descriptions layout='vertical'>
					<Descriptions.Item label='Price'>
						<AutoComplete
							style={{ width: '100%' }}
							options={_.uniqBy(
								_.sortBy(
									props.data.map((item) => ({
										label: item.price,
										value: item.price
									})),
									'label'
								),
								'label'
							)}
							onChange={(value) => {
								formik.setFieldValue('selection.price', value)
							}}
						/>
					</Descriptions.Item>
				</Descriptions>
			</Col>
		</Row>
	)
}

export default ProductSpecSelector
