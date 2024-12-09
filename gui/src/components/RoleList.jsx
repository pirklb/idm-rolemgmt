import React from 'react'
import { useAppContext } from '../context'
import { Link } from 'react-router-dom';

const RoleList = () => {
    const { roles } = useAppContext();
    console.log('RoleList,roles', roles)
    if (!(roles?.roles)) return <div>no roles found</div>;
    return (
        <ul>
            {
                roles.roles.map(r => <li title={r.description} className='p-0.5' key={r.id} ><Link to={encodeURIComponent(r.id)}>{r.name}</Link></li>)
            }

        </ul >
    )
}

export default RoleList