import _ from 'lodash'
import {
	Button,
	Col,
	Form,
	InputNumber,
	List,
	Popconfirm,
	Row,
	Select,
	Tooltip,
	Typography
} from 'antd'
import React, { Fragment } from 'react'
import instance2 from '../../../../api/instance2'
import { RawMaterial } from '../../../../contexts/RawMaterialContext'
import { FieldArray, useFormikContext } from 'formik'
import { Order } from '../../../../contexts/OrderContext'

type Props = {}

const RawMaterialField = (props: Props) => {
	const { value: rawMaterials, dispatch: setRawMaterials } =
		React.useContext(RawMaterial)!
	const { value: orders } = React.useContext(Order)!
	const [selectedMaterial, setSelectedMaterial] = React.useState<{
		_id: string
		name: string
	} | null>(null)
	const [selectedQuantity, setSelectedQuantity] = React.useState<number>(0)
	const formik = useFormikContext<FinishedProductProps>()

	React.useEffect(() => {
		if (!rawMaterials)
			instance2()
				.get<ResponseBaseProps<Array<RawMaterialProps>>>('/inventory/raw-material', {
					params: { sort: 'desc' }
				})
				.then(({ data: { packet } }) => packet!)
				.then(setRawMaterials)

		return () => {
			setSelectedMaterial(null)
			setSelectedQuantity(1)
		}
	}, [rawMaterials, setRawMaterials])

	return (
		<Row>
			<Col span={24} style={{ marginBottom: '1rem' }}>
				<Typography>
					<Typography.Title style={{ fontSize: 14 }}>Used Raw Materials</Typography.Title>
				</Typography>
				<Select
					style={{ width: '100%' }}
					showSearch
					options={_.uniqBy(
						_.sortBy(
							rawMaterials?.map((item) => ({
								label: `${item.name} ${item.type} ${item.diameter}`,
								value: item._id
							})),
							'label'
						),
						'label'
					)}
					filterOption={(inputValue, option) =>
						_.includes(option?.label.toLowerCase(), inputValue.toLowerCase().trim())
					}
					notFoundContent={null}
					onSelect={(_: string, option: any) => {
						setSelectedMaterial({
							name: option.label,
							_id: option.value
						})
					}}
				/>
			</Col>
			<FieldArray
				name='materials'
				render={({ unshift, form }) => (
					<Fragment>
						<Col span={13}>
							<Form.Item label='Quantity'>
								<InputNumber
									min={0}
									max={
										+(
											rawMaterials?.filter(
												(material) => material._id === selectedMaterial?._id
											)[0]?.quantity || 0
										)
									}
									onChange={(value) => setSelectedQuantity(value)}
									value={selectedQuantity}
									addonAfter={
										<React.Fragment>
											<Tooltip title='Maximum Quantity'>
												<span>{` / ${
													rawMaterials?.filter(
														(material) => material._id === selectedMaterial?._id
													)[0]?.quantity || 0
												} pcs`}</span>
											</Tooltip>
										</React.Fragment>
									}
								/>
							</Form.Item>
						</Col>
						<Col style={{ marginLeft: '1ch' }}>
							<Popconfirm
								title='Are you sure?'
								onConfirm={() => {
									if (selectedMaterial) {
										unshift({
											name: selectedMaterial.name,
											_id: selectedMaterial._id,
											quantity: selectedQuantity
										})
									}
								}}
							>
								<Button type='primary'>Add to list below</Button>
							</Popconfirm>
						</Col>
						<Col span={24}>
							<List
								bordered
								size='small'
								dataSource={form.values.materials}
								renderItem={(item: { name: string; _id: string; quantity: number }) => (
									<List.Item>
										<Typography.Text>
											{item.quantity}x {item.name}
										</Typography.Text>
									</List.Item>
								)}
								rowKey={({ _id }) => _id}
							/>
						</Col>
					</Fragment>
				)}
			/>
			<Col span={24} style={{ marginTop: '1rem' }}>
				<Typography>
					<Typography.Title style={{ fontSize: 14 }}>
						Target Quotation Number
					</Typography.Title>
				</Typography>
				<Select
					style={{ width: '100%' }}
					showSearch
					options={_.uniqBy(
						_.sortBy(
							orders
								?.filter((order) => order.quotationNumber)
								.map((order) => ({
									label: `${order.quotationNumber} - ${
										order.customerId || '***UNNAMED CUSTOMER***'
									}`,
									value: order.quotationNumber
								})),
							'label'
						),
						'label'
					)}
					filterOption={(inputValue, option) =>
						_.includes(option?.label.toLowerCase(), inputValue.toLowerCase().trim())
					}
					notFoundContent={null}
					onSelect={(value: string, option: any) => {
						formik.setFieldValue('quotationId', value)
					}}
				/>
			</Col>
		</Row>
	)
}

export default RawMaterialField
