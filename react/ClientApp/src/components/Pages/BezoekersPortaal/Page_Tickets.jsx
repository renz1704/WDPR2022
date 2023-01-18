import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import { useState, useEffect } from 'react';
import UserService from '../../../services/UserService';
import axios from 'axios';
import Tickets from './Orders';
import Orders from './Orders';

function Page_Tickets() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7293/api/Order/getReservations?email=${UserService.getUser().email}`)
            .then(res => {
                setOrders(res.data)
                console.log(res.data)
            })
    }, [])

    return (

        <>
            <BezoekersPortaalHeader></BezoekersPortaalHeader>
            <h1>Ordergeschiedenis</h1>
            <Orders orders={orders}></Orders>
        </>
    )

}
export default Page_Tickets