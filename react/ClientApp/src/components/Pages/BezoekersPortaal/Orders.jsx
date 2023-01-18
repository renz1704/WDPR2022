import { useEffect } from "react"

const Orders = (props) => {

    const tickets = props.orders.map(order => {
        return (
            <li key={order.id}>

                <br></br>
                <br></br>
                <p>OrderId: {order.id}</p>
                <p>Bedrag: €{order.payment.amount}</p>
                <br></br>
                <p>Gereserveerde stoelen</p>
                {order.tickets.map(ticket => {
                    return (
                        <>
                            <p key={ticket.id}> Stoelnummer: {ticket.seat.seatNumber}
                                <p>Rij: Database doesn't contain row number</p>
                                <p>Rank: {ticket.seat.row.rank}</p>
                                <p>Zaal: {ticket.performance.room.roomNumber} </p>
                                <p>Show: {ticket.performance.show.name} </p>
                                <p>Aanvang: {ticket.performance.startTime}</p>

                            </p>
                            <br></br>
                        </>
                    )
                })}

            </li>

        )
    })


    return (
        <>
            <ul>
                {tickets}
            </ul>
        </>
    )
}

export default Orders;