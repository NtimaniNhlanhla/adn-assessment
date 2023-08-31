import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TicketForm from '../components/TicketForm';
import Spinner from '../components/Spinner'
import {toast } from 'react-toastify'
import { getTickets, reset} from '../features/ticket/ticketSlice'
import TicketItem from '../components/TicketsTable';

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const { tickets, isLoading, isError, message} = useSelector((state) =>
    state.tickets) 

  useEffect(() => {
    if(isError) {
      
      toast.error(message)
    }
    if(!user) {
      navigate('/login')
    }
    
    dispatch(getTickets())

    return () => {
      dispatch(reset())
    }

  },[user, navigate, isError, message, dispatch])


  if(isLoading) {
    return <Spinner />
  }
  
  return <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Tickets Dashboard</p>
      </section>
      <TicketForm />

      <section className="content">
        {tickets ? (

          <div className="">
            
              <TicketItem tickets={tickets.tickets} />
          
          </div>
        ) : (<h3>You have not set any tickets.</h3>) }
      </section>
  </>
}

export default Dashboard
