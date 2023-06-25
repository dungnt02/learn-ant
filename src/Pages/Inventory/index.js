import { Table, Typography, Space, Avatar, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { getInventory } from '../../API'

const Inventory = () => {
    const [loading, setloading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setloading(true)
        getInventory().then(res => {
            setDataSource(res.products)
            setloading(false)
        })
    }, [])

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Inventory</Typography.Title>
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
                        title: "Rating",
                        dataIndex: "rating",
                        render: (rating) => {
                            return <Rate value={rating} allowHalf disabled></Rate>
                        }
                    },
                    {
                        title: "Stock",
                        dataIndex: "stock"
                    },
                    {
                        title: "Rating",
                        dataIndex: "rating"
                    },
                    {
                        title: "Thumbnail",
                        dataIndex: "thumbnail",
                        render: (link) => {
                            return <Avatar src={link}></Avatar>
                        }
                    },
                    {
                        title: "Brand",
                        dataIndex: "brand"
                    },
                    {
                        title: "Category",
                        dataIndex: "category"
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

export default Inventory