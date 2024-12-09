import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context'
import Search from './Search';

const Navbar = () => {
    const { user } = useAppContext();
    return (
        <nav className='bg-blue-400 mb-2 gap-x-4 py-2 flex flex-row'>
            <h2 className='text-lg pl-2'>IDM Rolemanagement for Roleowners</h2>
            <div className="nav-links">
                <NavLink to='/roles'>Roles</NavLink>
            </div>
            <Search />
            <div className='justify-self-end text-xs pr-2'>{user.email}<br />{user.fullName ? `${user.fullName}` : ''} </div>
        </nav >

    )
}

export default Navbar