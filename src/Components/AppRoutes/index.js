import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard'
import Inventory from '../../Pages/Inventory'
import Orders from '../../Pages/Orders'
import Customers from '../../Pages/Customers'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard></Dashboard>}></Route>
            <Route path='/inventory' element={<Inventory></Inventory>}></Route>
            <Route path='/orders' element={<Orders></Orders>}></Route>
            <Route path='/customers' element={<Customers></Customers>}></Route>
        </Routes>
    )
}

export default AppRoutes