import React, { useEffect, useState } from 'react'
import RoleList from '../components/RoleList'
import { getRoles } from '../queries/roles'
import { useAppContext } from '../context'
const Roles = () => {
  const { search } = useAppContext();
  const [roles, setRoles] = useState([]);
  const fetchData = async (search) => {
    if (!search) return;
    const data = await getRoles(searchStr);
    setRoles(data);
  }
  useEffect(() => {
    fetchData();


  }, [])

  return (
    <>
      {/* <Search search={search} setSearch={setSearch} /> */}
      <RoleList search={search} />
    </>
  )
}

export default Roles