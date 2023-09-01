import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TicketForm from '../components/TicketForm';
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { getTickets, reset } from '../features/ticket/ticketSlice'
import TicketsTable from '../components/TicketsTable';

function Dashboard() {

  const [filterField, setFilterData] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tickets, isLoading, isError, message } = useSelector((state) =>
    state.tickets)

  useEffect(() => {
    if (isError) {

      toast.error(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getTickets())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])


  const onFilterChange = (e) => {
    e.preventDefault();
    setFilterData(e.target.value)

  }

  const filteredTickets = tickets.filter((ticket) => {
    return ticket?.description?.toLowerCase().includes(filterField?.toLowerCase()) ||
    ticket?.ticket_number?.toLowerCase().includes(filterField?.toLowerCase())
  })



  if (isLoading) {
    return <Spinner />
  }
  return <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Tickets Dashboard</p>
    </section>
    <TicketForm  onFilterChange={onFilterChange}/>

    <section className="content">
      {tickets.length > 0 ? (

        <div className="">

          <TicketsTable tickets={filteredTickets} />

        </div>
      ) : (<h3>You have not set any tickets.</h3>)}
    </section>
  </>
}

export default Dashboard
