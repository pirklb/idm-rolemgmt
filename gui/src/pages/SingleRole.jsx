import { useLoaderData, useNavigation, useParams } from 'react-router';
import { getRoleByRouteId } from '../queries/roles'
import { getEmployees } from '../queries/employees';
import { getRoleMembers } from '../rest-requests/get-rolemembers';
import { useState } from 'react';
import { IoTrashBinSharp } from "react-icons/io5";
import { useAppContext } from '../context';
import { deleteRoleMember } from '../rest-requests/delete-rolemember';
import { addRoleMember } from '../rest-requests/add-rolemember';

const loader = async ({ request, params }) => {
  console.log('SingleRole,loader started');
  const roleId = decodeURIComponent(params.routeId);
  //console.log('loader', roleId);
  const roleDetails = await getRoleByRouteId(roleId);
  const roleMembers = await getRoleMembers(roleId);
  //console.log('loader roleMembers=', roleMembers);
  console.log('SingleRole,loader finished');
  return { roleDetails, roleMembers };
}

const Header = ({ role }) => {
  return <div className='bg-blue-50 rounded p-2 my-4' ><h3>{role.name}</h3><p>{role.description}</p>

  </div>
}

const Members = ({ members, reason, onRemoveRoleMember }) => {
  if (members.length === 0) return <div className='border border-spacing-2 rounded py-2 px-1'><h3 className='pb-2'><strong>No</strong> direct role members</h3></div>
  return <div className='border border-spacing-2 rounded py-2'>
    <h3 className='pb-2 px-1'>Direct role members</h3>
    <ul>
      {members.sort((a, b) => a.recipientFullName.localeCompare(b.recipientFullName)).map(member =>
        <li className='py-2 odd:bg-blue-50 bg-blue-100 px-1 flex flex-row gap-2 align-middle' key={member.recipientDn} title={member.description}>
          {reason && <IoTrashBinSharp className='cursor-pointer' title={`remove ${member.recipientFullName} from this role`} onClick={() => onRemoveRoleMember(member.recipientDn)} />}<span>{member.recipientFullName}</span>
        </li>
      )
      }
    </ul>
  </div>
}

const SingleRole = () => {
  const navigation = useNavigation();
  const [reason, setReason] = useState(import.meta.env.MODE === 'development' ? 'test' : '');
  const [possibleMembersFilter, setPossibleMembersFilter] = useState('');
  const [possibleMembers, setPossibleMembers] = useState([]);

  const { user } = useAppContext();
  const handleRemoveRoleMember = async (recipientDn) => {
    const completeReason = `${reason} (${user?.cn || 'anonymous'})`;
    //console.log('User', user);
    //console.log(`removing ${recipientDn} from role '${role.id}' - reason '${completeReason}'`);
    const result = await deleteRoleMember({ roleId: role.id, memberId: recipientDn, reason: completeReason });
    console.log('SingleRole, handleRemoveRoleMember, result:', result);
  }
  const handleAddRoleMember = async (recipientDn) => {
    const completeReason = `${reason} (${user?.cn || 'anonymous'})`;
    const result = await addRoleMember({ roleId: role.id, memberId: recipientDn, reason: completeReason });
    console.log('SingleRole, handleAddRoleMember, result:', result);
  }

  const handleKeyUp = async (e) => {
    if (e.key === 'Enter') {
      if (possibleMembersFilter === '') return;
      const { status, employees } = await getEmployees(possibleMembersFilter);
      if (status !== true) return;
      setPossibleMembers(employees.filter(e => e.cn.match(/\d$/)).filter(e => e?.employeeStatus === 'active').filter(e => !members.find(m => m.recipientDn === e.dn)));
    }
  }

  const routeId = decodeURIComponent(useParams());
  const { roleDetails, roleMembers } = useLoaderData();
  const { role } = roleDetails;
  const members = roleMembers.result;
  //const possibleMembers =
  //console.log('SingleRole members', members);
  console.log('SingleRole, navigation.state=', navigation.state);
  if (navigation.state.toLowerCase() === 'loading') {
    console.log('SingleRole, loading ...');
    return <h2>Loading ...</h2>
  }
  return (
    <>
      <SingleRole.Header role={role} />
      <SingleRole.Members members={members} reason={reason} onRemoveRoleMember={handleRemoveRoleMember} />
      <div className="rounded border border-slate-200 my-2">
        <div className="p-2 flex flex-row gap-2 border rounded border-slate-200">
          <label htmlFor='single-role-reason'>reason</label>
          <input type="text" placeholder="enter the reason" id="single-role-reason" className="rounded m-x2 border border-slate-200 w-full" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>

        <div className="rounded border border-slate-200 my-2 p-2">
          <div className="p-2 flex flex-row gap-2">
            <label className="text-nowrap" htmlFor='single-role-search-possible-members'>new member</label>
            <input type="text" placeholder="search for possible member" id="single-role-search-possible-members" className="rounded m-x2 border border-slate-200 w-full" value={possibleMembersFilter} onChange={(e) => setPossibleMembersFilter(e.target.value)} onKeyUp={(e) => handleKeyUp(e)} />
          </div>
          {possibleMembers.length > 0 && <ul>
            {possibleMembers.sort((a, b) => a.fullName.localeCompare(b.fullName)).map(member => <li className='p-0.5 flex flex-row gap-6' key={member.dn} onClick={() => handleAddRoleMember(member.dn)}><span>{member.fullName}</span><span>{member.email}</span></li>)}
          </ul>}
          <div>

          </div>

        </div>
      </div>
    </>
  )
}

SingleRole.Header = Header;
SingleRole.Members = Members;
export default SingleRole;
export { loader as singleRoleLoader };