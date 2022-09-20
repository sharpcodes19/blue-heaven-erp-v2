import { Button, Divider, Row } from 'antd'
import { useFormikContext } from 'formik'
import ProductFields from './ProductFields'

type ProductFormProps = {}

const ProductForm = (props: ProductFormProps) => {
	const formik = useFormikContext<FinishedProductProps>()

	return (
		<Row gutter={10}>
			<ProductFields />
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
