import { DollarCircleOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers, getInventory, getOrders, getRevenue } from '../../API'
import Chart from 'chart.js/auto';

import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)
    useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total);
            setRevenue(res.discountedTotal)
        })
        getInventory().then(res => {
            setInventory(res.total);
        })
        getCustomers().then(res => {
            setCustomers(res.total);
        })
    }, [])

    return (
        <div>
            <Space size={20} direction='vertical'>
                <Typography.Title level={4}>Dashboard</Typography.Title>
                <Space direction='horizontal'>
                    <DashboardCard
                        icon={<ShoppingCartOutlined
                            style={{
                                color: "purple",
                                backgroundColor: 'rgba(0,255,255,.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}>
                        </ShoppingCartOutlined>}
                        title={"Orders"}
                        value={orders}>
                    </DashboardCard>
                    <DashboardCard
                        icon={<ShopOutlined
                            style={{
                                color: "purple",
                                backgroundColor: 'rgba(0,255,255,.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        ></ShopOutlined>}
                        title={"Inventory"}
                        value={inventory}>
                    </DashboardCard>
                    <DashboardCard
                        icon={<UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: 'rgba(0,255,255,.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        ></UserOutlined>}
                        title={"Customers"}
                        value={customers}>
                    </DashboardCard>
                    <DashboardCard
                        icon={<DollarCircleOutlined
                            style={{
                                color: "purple",
                                backgroundColor: 'rgba(0,255,255,.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        ></DollarCircleOutlined>}
                        title={"Revenue"}
                        value={revenue}>
                    </DashboardCard>
                </Space>
                <Space>
                    <RecentOrders></RecentOrders>
                    <DashboardChart></DashboardChart>
                </Space>
            </Space>
        </div>
    )
}

const DashboardCard = ({ title, value, icon }) => {
    return (
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

const RecentOrders = () => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getOrders().then(res => {
            setDataSource(res.products)
            setLoading(false)
        })
    }, [])
    return (
        <>
            <Typography.Title>Recent Orders</Typography.Title>
            <Table
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title',
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                    },
                    {
                        title: 'Price',
                        dataIndex: 'discountedPrice',
                    }
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </>
    )
}

const DashboardChart = () => {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    })
    useEffect(() => {
        getRevenue().then(res => {
            const labels = res.carts.map(cart => {
                return `User-${cart.userId}`
            })
            const data = res.carts.map(cart => {
                return cart.discountedTotal
            })
            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                    },
                ],
            };
            setRevenueData(dataSource)
        })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };
    return (
        <Card style={{ width: 500, height: 350 }}>
            <Bar options={options} data={revenueData} />
        </Card>
    );
}

export default Dashboard