import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, TablePagination } from '@mui/material'
import React, { useState } from 'react'
import * as  moment from 'moment/moment'

function TicketsTable({ tickets }) {

  const columns = [
    { id: 'ticket_number', name: 'Ticket Number' },
    { id: 'description', name: 'Description' },
    { id: 'created_date', name: 'Created Date' }
  ]

  const onPageChange = (e, newPage) => {
    setPage(newPage);
  }

  const onRowsPerPageChange = (e) => {
    setRowPerPage(+e.target.value)
    setPage(0)
  }

  const [page, setPage] = useState(0)
  const [rowPerPage, setRowPerPage] = useState(10)
  return (
    <div className=''>
      <div>
        <Paper sx={{ width: '100%' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell className='tableCell' style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets && tickets
                  .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                  .map((ticket, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{ticket.ticket_number}</TableCell>
                        <TableCell>{ticket.description}</TableCell>
                        <TableCell>{moment(ticket.created_date).format('DD/MM/YYYY')}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            page={page}
            rowsPerPage={rowPerPage}
            count={tickets.length}
            component='div'
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          >

          </TablePagination>
        </Paper>
      </div>

    </div>
  )
}

export default TicketsTable
