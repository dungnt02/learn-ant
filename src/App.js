import React from 'react'
import AppHeader from './Components/AppHeader'
import SideMenu from './Components/SideMenu'
import PageContent from './Components/PageContent'
import AppFooter from './Components/AppFooter'
import './App.css';
import { Space } from 'antd'

const App = () => {
  return (
    <div className='App'>
      <AppHeader></AppHeader>
      <Space className='SideMenuAndPageContent'>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <AppFooter className='AppFooter'></AppFooter>
    </div>
  )
}

export default App
