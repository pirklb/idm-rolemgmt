import axios from "axios"

export const deleteRoleMember = async ({ roleId, memberId, reason }) => {
    if (!roleId || !memberId || !reason) {
        console.log('deleteRoleMember, at least one parameter is missing');
        return;
    }
    const routeId = encodeURIComponent(roleId);
    const body = { memberId: memberId, reason }
    console.log('deleteRoleMember, routeId', routeId);
    console.log('deleteRoleMember, body', body);
    const axiosReturn = await axios.delete(`${import.meta.env.VITE_IDM_URL}/idm/translate/roles/${routeId}/assignments`, { data: body })
    console.log('deleteRoleMember, return from API:', axiosReturn);

    //const { data } = axiosReturn;
    //if (data.status !== 'ok') return { result: [] }
    //return data;
}