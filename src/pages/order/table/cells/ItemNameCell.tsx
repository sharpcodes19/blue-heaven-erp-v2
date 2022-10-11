import { Row } from 'antd'
import ItemNameComponent from './ItemNameComponent'

type Props = {
	record: OrderProps
}

const ItemNameCell = (props: Props) => {
	return (
		<Row>
			{props.record.items.map((item, i) => (
				<ItemNameComponent
					{...item}
					key={item._id}
					style={{
						marginBottom: i > props.record.items.length - 1 ? undefined : 3
					}}
				/>
			))}
		</Row>
	)
}

export default ItemNameCell
