import { Button, Divider, Row } from 'antd'
import { useFormikContext } from 'formik'
import ProductFields from './RawMaterialField'

type RawMaterialFormProps = {}

const RawMaterialForm = (props: RawMaterialFormProps) => {
	const formik = useFormikContext<RawMaterialProps>()

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

export default RawMaterialForm
