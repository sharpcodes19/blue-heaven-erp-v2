import _ from 'lodash'
import React from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

type SideBarProps = {
	items: MenuProps['items']
	onClick: (e: any) => any
}

const { Sider } = Layout

const SideBar = (props: SideBarProps) => {
	const navigate = useNavigate()

	return (
		<Sider>
			<Menu
				theme='dark'
				mode='inline'
				style={{
					textTransform: 'capitalize'
				}}
				items={props.items}
				onClick={(e) => {
					navigate(`/${_.reverse(e.keyPath).join('/')}`)
					props.onClick(e)
				}}
			/>
		</Sider>
	)
}

export default SideBar
