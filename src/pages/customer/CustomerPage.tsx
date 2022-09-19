import { Layout, Typography } from 'antd'
import React from 'react'
import instance2 from '../../api/instance2'
import CustomerTable from './CustomerTable'

type CustomerPageProps = {}

const CustomerPage = (props: CustomerPageProps) => {
	const [data, setData] = React.useState<Array<CustomerProps>>([])

	React.useEffect(() => {
		instance2()
			.get<ResponseBaseProps<Array<CustomerPageProps>>>('/customer')
			.then((res) => setData(res.data.packet!))
	}, [])

	return (
		<Layout.Content>
			<Typography.Title level={2}>CUSTOMERS</Typography.Title>
			<CustomerTable data={data} />
		</Layout.Content>
	)
}

export default CustomerPage
