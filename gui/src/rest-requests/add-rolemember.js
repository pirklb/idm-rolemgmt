import axios from "axios"

export const addRoleMember = async ({ roleId, memberId, reason, effectiveDate = '', expiryDate = '' }) => {
    if (!roleId || !memberId || !reason) {
        console.log('addRoleMember, at least one parameter is missing');
        return;
    }
    const routeId = encodeURIComponent(roleId);
    const body = { memberId, reason, effectiveDate, expiryDate }
    console.log('addRoleMember, routeId', routeId);
    console.log('addRoleMember, body', body);
    const axiosReturn = await axios.post(`${import.meta.env.VITE_IDM_URL}/idm/translate/roles/${routeId}/assignments`, body)
    console.log('addRoleMember, return from API:', axiosReturn);

    //const { data } = axiosReturn;
    //if (data.status !== 'ok') return { result: [] }
    //return data;
}