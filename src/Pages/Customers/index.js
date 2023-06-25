import { Table, Typography, Space, Avatar, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../../API'

const Customers = () => {
    const [loading, setloading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        setloading(true)
        getCustomers().then(res => {
            setDataSource(res.users)
            setloading(false)
        })
    }, [])

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table
                loading={loading}
                columns={[
                    {
                        title: "Photo",
                        dataIndex: "image",
                        render: (link) => {
                            return <Avatar src={link}></Avatar>
                        }
                    },
                    {
                        title: "First Name",
                        dataIndex: "firstName",
                    },
                    {
                        title: "LastName",
                        dataIndex: "lastName",
                    },
                    {
                        title: "Email",
                        dataIndex: "email"
                    },
                    {
                        title: "Phone",
                        dataIndex: "phone"
                    },
                    {
                        title: "Address",
                        dataIndex: "address",
                        render: (address) => {
                            return <span>{address.address}, {address.city}</span>
                        }
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

export default Customers