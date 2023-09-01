import React from 'react'

function TicketsFilter({onFilterChange}) {
    return (
            <form>
                 <div className="form-group">
                <input
                    className="filter-text"
                    type="filter"
                    placeholder="Filter By Ticket Number or Description"
                    onChange={onFilterChange}
                />
            </div>
            </form>
           
    )
}

export default TicketsFilter
