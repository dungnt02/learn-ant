import React, { useState, useEffect } from 'react'
import { MailOutlined, BellFilled } from '@ant-design/icons'
import { Space, Image, Typography, Badge, Drawer, List } from 'antd'
import { getComments, getOrders } from '../../API'

const AppHeader = () => {
    const [comments, setComments] = useState([])
    const [orders, setOrders] = useState([])
    const [commentsOpen, setcommentsOpen] = useState(false)
    const [nofiticationsOpen, setnofiticationsOpen] = useState(false)
    useEffect(() => {
        getComments().then(res => {
            setComments(res.comments)
        })
        getOrders().then(res => {
            setOrders(res.products)
        })
    }, [])

    return (
        <div className='AppHeader'>
            <Image
                width={40}
                src='https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png'>
            </Image>
            <Typography.Title>Dung's Dashboard</Typography.Title>
            <Space>
                <Badge count={comments.length}>
                    <MailOutlined style={{ fontSize: 24 }} onClick={() => {
                        setcommentsOpen(true)
                    }} />
                </Badge>
                <Badge count={orders.length}>
                    <BellFilled style={{ fontSize: 24 }} onClick={() => {
                        setnofiticationsOpen(true)
                    }} />
                </Badge>
            </Space>
            <Drawer title='Comments' open={commentsOpen} onClose={() => { setcommentsOpen(false) }} maskClosable>
                <List dataSource={comments} renderItem={(item) => {
                    return <List.Item>{item.body}</List.Item>
                }}></List>
            </Drawer>
            <Drawer title='Notifications' open={nofiticationsOpen} onClose={() => { setnofiticationsOpen(false) }} maskClosable>
                <List dataSource={orders} renderItem={(item) => {
                    return <List.Item><Typography.Paragraph strong>{item.title}</Typography.Paragraph> has been ordered!</List.Item>
                }}></List>
            </Drawer>
        </div>
    )
}

export default AppHeader