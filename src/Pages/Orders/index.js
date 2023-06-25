import { Table, Typography, Space, Avatar, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../API'

const Orders = () => {
    const [loading, setloading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setloading(true)
        getOrders().then(res => {
            setDataSource(res.products)
            setloading(false)
        })
    }, [])

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                loading={loading}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title"
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => <span>${value}</span>
                    },
                    {
                        title: "DiscountedPrice",
                        dataIndex: "discountedPrice",
                        render: (value) => <span>${value}</span>
                    },
                    {
                        title: "Stock",
                        dataIndex: "stock"
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity"
                    },
                    {
                        title: "Total",
                        dataIndex: "total"
                    },
                ]}
                dataSource={dataSource}
                pagination={{
                    pageSize: 5,
                }}
            ></Table>
        </Space>
    )
}

export default Orders