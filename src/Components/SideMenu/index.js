import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')
    useEffect(() => {
        const pathname = location.pathname
        setSelectedKeys(pathname)
    }, [location.pathname])

    const navigate = useNavigate()
    return (
        <div className='SideMenu'>
            <Menu
                onClick={(item) => {
                    navigate(item.key)
                }}
                selectedKeys={[selectedKeys]}
                items={[
                    {
                        label: 'Dashboard',
                        icon: <AppstoreOutlined></AppstoreOutlined>,
                        key: '/',
                    },
                    {
                        label: 'Orders',
                        icon: <ShopOutlined></ShopOutlined>,
                        key: '/orders'
                    },
                    {
                        label: 'Inventory',
                        icon: <ShoppingCartOutlined></ShoppingCartOutlined>,
                        key: '/inventory'
                    },
                    {
                        label: 'Customers',
                        icon: <UserOutlined></UserOutlined>,
                        key: '/customers'
                    },
                ]}>

            </Menu>
        </div>
    )
}

export default SideMenu