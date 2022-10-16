import { Button, Col, Divider, Row } from 'antd'
import { useFormikContext } from 'formik'
import ProductFields from './ProductFields'
import RawMaterialField from './RawMaterialField'

type ProductFormProps = {}

const ProductForm = (props: ProductFormProps) => {
	const formik = useFormikContext<FinishedProductProps>()

	return (
		<Row gutter={10}>
			<Col span={13}>
				<ProductFields />
			</Col>
			<Col>
				<Divider type='vertical' style={{ height: '100%' }} />
			</Col>
			<Col span={10}>
				<RawMaterialField />
			</Col>
			<Divider />
			<Row justify='end'>
				<Button htmlType='submit' type='primary' loading={formik.isSubmitting}>
					Submit
				</Button>
			</Row>
		</Row>
	)
}

export default ProductForm
