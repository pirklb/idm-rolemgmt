import axios from "axios"

export const getRoleMembers = async (routeId) => {
    const axiosReturn = await axios.get(`${import.meta.env.VITE_IDM_URL}/idm/translate/roles/${routeId}/assignments`)
    console.log('getRoleMember, return from API:', axiosReturn);
    const { data } = axiosReturn;
    if (data.status !== 'ok') return { result: [] }
    return data;
}