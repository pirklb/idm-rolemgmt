import React from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { getRoles } from '../queries/roles';
import { useAppContext } from '../context';

const Search = () => {
    const { user, search, setRoles, setSearch } = useAppContext();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Search, handleSubmit');
        if (!search) return;
        const data = await getRoles(search, user?.cn);
        //console.log('Search, handleSubmit,data', data);
        setRoles(data);
        navigate('/roles');
    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-grow gap-x-2 flex-row'>
            <input name='search' type='search' placeholder='enter your search' disabled={!(user && user.username !== 'anonymous')} value={search} onChange={(e) => setSearch(e.target.value)} className='w-full px-2 rounded' />
            <button>Search</button>
        </form>
    )
}

export default Search